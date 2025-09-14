const request = require('supertest');
const app = require('./server');

// --- Simulación (Mock) del Módulo @google/genai ---
// Se simula el módulo para aislar nuestras pruebas de la API real de Gemini.
// Esto evita llamadas de red reales, haciendo las pruebas más rápidas y predecibles.
jest.mock('@google/genai', () => {
  const mockGenerateContent = jest.fn();
  const mockGoogleGenAI = jest.fn(() => ({
    models: {
      generateContent: mockGenerateContent,
    },
  }));
  return {
    GoogleGenAI: mockGoogleGenAI,
    __mockGenerateContent: mockGenerateContent, // Exportamos el mock para controlarlo en los tests.
  };
});

const { __mockGenerateContent } = require('@google/genai');

describe('POST /api/analyze', () => {
  beforeEach(() => {
    // Limpia el historial de llamadas del mock antes de cada prueba.
    __mockGenerateContent.mockClear();
  });

  it('should return 200 and analysis results for a successful request', async () => {
    const mockApiResponse = {
      text: '```json\n[{"label": "cat", "confidence": 0.9}, {"label": "animal", "confidence": 0.95}]\n```',
    };
    __mockGenerateContent.mockResolvedValue(mockApiResponse);

    const response = await request(app)
      .post('/api/analyze')
      .attach('image', Buffer.from('fake-image-data'), 'test-image.jpg');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { label: 'animal', confidence: 0.95 },
      { label: 'cat', confidence: 0.9 },
    ]);
  });

  it('should return 400 if no image is provided', async () => {
    const response = await request(app).post('/api/analyze');

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('No image file provided.');
  });

  it('should return 500 if the Gemini API call fails', async () => {
    __mockGenerateContent.mockRejectedValue(new Error('Gemini API Error'));

    const response = await request(app)
      .post('/api/analyze')
      .attach('image', Buffer.from('fake-image-data'), 'test-image.jpg');

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Failed to analyze image.');
  });

  it('should return 500 if the Gemini API returns invalid JSON', async () => {
    const mockApiResponse = { text: 'This is not a valid JSON.' };
    __mockGenerateContent.mockResolvedValue(mockApiResponse);

    const response = await request(app)
      .post('/api/analyze')
      .attach('image', Buffer.from('fake-image-data'), 'test-image.jpg');

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Invalid response from Gemini.');
  });
});

// Para que Jest pueda cerrar el servidor después de las pruebas, necesitamos exportar la app y el servidor.
// Modifica tu server.js para exportar la app al final: module.exports = app;
// Y envuelve app.listen en una condición para que no se ejecute durante las pruebas.