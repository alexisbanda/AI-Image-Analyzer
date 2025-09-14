import React, { useState, useCallback } from 'react';
import { analyzeImageContent } from './services/geminiService';
import { AnalysisResult } from './types';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  // --- Estados del Componente ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Maneja la selección de un archivo, actualizando el estado
   * y generando una URL de previsualización.
   */
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResults([]);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  /**
   * Se ejecuta al hacer clic en "Analizar". Llama al servicio de la API,
   * gestiona los estados de carga y error, y actualiza los resultados.
   */
  const handleAnalyzeClick = useCallback(async () => {
    if (!selectedFile) {
      setError("Please select an image file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
        // Llama al servicio que se comunica con el backend.
        const analysisResults = await analyzeImageContent(selectedFile);
        setResults(analysisResults);

    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
    } finally {
        setIsLoading(false);
    }
  }, [selectedFile]);

  // --- Renderizado del Componente ---
  // Estructura la UI y pasa el estado y los manejadores a los componentes hijos.
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
          Gemini Image Analyzer
        </h1>
        <p className="mt-2 text-lg text-slate-400 max-w-2xl">
          Upload an image and let Google's Gemini AI reveal the contents with remarkable accuracy.
        </p>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda para la subida de imagen */}
          <div className="lg:col-span-1">
            <ImageUploader 
              onFileChange={handleFileChange}
              onAnalyzeClick={handleAnalyzeClick}
              previewUrl={previewUrl}
              isFileSelected={!!selectedFile}
              isLoading={isLoading}
            />
          </div>

          {/* Columna derecha para mostrar resultados, errores o el loader */}
          <div className="lg:col-span-1">
            <ErrorMessage message={error} />
            {isLoading ? (
              <Loader />
            ) : (
              <ResultsDisplay results={results} />
            )}
          </div>
        </div>
      </main>

      <footer className="text-center mt-12 text-slate-500">
        <p>Powered by React, Tailwind CSS, and the Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
