
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  results: AnalysisResult[];
}

const getConfidenceColor = (confidence: number): string => {
  if (confidence > 0.9) return 'bg-emerald-500';
  if (confidence > 0.75) return 'bg-sky-500';
  if (confidence > 0.5) return 'bg-amber-500';
  return 'bg-rose-500';
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results.length) {
    return (
      <div className="w-full text-center p-10 bg-slate-800/50 rounded-2xl border border-slate-700 text-slate-400">
        <p>Analysis results will be displayed here.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-sky-300">Analysis Results</h2>
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index} className="bg-slate-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg capitalize text-slate-200">{result.label}</span>
              <span className={`font-mono text-sm px-2 py-1 rounded ${getConfidenceColor(result.confidence)} text-white`}>
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div
                className={`${getConfidenceColor(result.confidence)} h-2.5 rounded-full transition-all duration-500`}
                style={{ width: `${result.confidence * 100}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsDisplay;
