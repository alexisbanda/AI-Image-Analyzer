require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const genai = require('@google/genai');

const app = express();
const port = 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Configuración de Gemini AI ---
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set");
}
// Inicializa el cliente de Gemini AI con la clave de la API.
const genAI = new genai.GoogleGenAI(API_KEY);

// --- Configuración de Multer ---
// Configura multer para almacenar las imágenes subidas en la memoria del servidor.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Prompt para la IA ---
// Define las instrucciones que se enviarán al modelo de IA junto con la imagen.
const PROMPT = `Analyze this image and identify the main objects, concepts, and entities present. For each item you identify, provide a descriptive label and an estimated confidence score from 0 to 1. Return ONLY the result as a JSON array of objects, where each object has 'label' and 'confidence' keys. Do not include any explanation or text, just the JSON array.`;

// --- Endpoint de la API ---
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  try {
    // Prepara la imagen y el prompt para ser enviados a la API de Gemini.
    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype,
      },
    };
    const textPart = { text: PROMPT };

    // Llama al modelo de Gemini a través del servicio 'models'.
    const result = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ parts: [imagePart, textPart] }]
    });

    // La propiedad 'text' contiene la respuesta de la IA como una cadena de texto.
    const rawText = result.text.trim();

    let analysisResult;
    try {
      // Limpia la respuesta de la IA para eliminar los bloques de código Markdown (```json ... ```)
      // que a veces son devueltos por el modelo.
      const cleanedText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      analysisResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Error parsing JSON from Gemini:', rawText);
      return res.status(500).json({ error: 'Invalid response from Gemini.', raw: rawText });
    }

    // Ordena los resultados por confianza de mayor a menor.
    analysisResult.sort((a, b) => b.confidence - a.confidence);

    res.json(analysisResult);

  } catch (error) {
    console.error("Error analyzing image with Gemini API:", error);
    res.status(500).json({ error: 'Failed to analyze image.', details: error.message });
  }
});

// --- Inicio del Servidor ---
// Inicia el servidor solo si no se está ejecutando en un entorno de prueba.
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
  });
}

// Exporta la app para que pueda ser utilizada por los tests de Supertest.
module.exports = app;
