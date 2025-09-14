import { AnalysisResult } from '../types';

// Define la URL base del endpoint del backend.
const API_URL = 'http://localhost:8080/api/analyze';

/**
 * Envía la imagen al backend para su análisis.
 * @param imageFile - El archivo de imagen (File) a analizar.
 * @returns Una promesa que se resuelve con un array de resultados del análisis.
 * @throws Un error si la llamada a la API falla o devuelve un estado no exitoso.
 */
export const analyzeImageContent = async (imageFile: File): Promise<AnalysisResult[]> => {
  // Crea un objeto FormData para encapsular el archivo de imagen.
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    // Si la respuesta del servidor no es exitosa (ej. status 500),
    // intenta leer el error del cuerpo y lanza una excepción.
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server responded with status: ${response.status}`);
    }

    // Si la respuesta es exitosa, la convierte a JSON y la devuelve.
    return await response.json();

  } catch (err) {
    // Relanza el error para que el componente que llama pueda manejarlo.
    if (err instanceof Error) {
        throw new Error(`Failed to connect to the analysis service: ${err.message}`);
    }
    throw new Error("An unknown network error occurred.");
  }
}