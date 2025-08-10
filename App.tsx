
import React, { useState, useCallback } from 'react';
import { generateLogo } from './services/geminiService';

// --- Helper Components (defined outside App to prevent re-creation on re-renders) ---

interface LogoGeneratorFormProps {
  onGenerate: (businessIdea: string, logoStyle: string) => void;
  isLoading: boolean;
}

const LogoGeneratorForm: React.FC<LogoGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [businessIdea, setBusinessIdea] = useState('');
  const [logoStyle, setLogoStyle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessIdea.trim() && logoStyle.trim()) {
      onGenerate(businessIdea, logoStyle);
    }
  };

  const canSubmit = businessIdea.trim() !== '' && logoStyle.trim() !== '' && !isLoading;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
      <div>
        <label htmlFor="business-idea" className="block text-sm font-medium text-gray-300 mb-2">
          Enter your business name or idea:
        </label>
        <input
          id="business-idea"
          type="text"
          value={businessIdea}
          onChange={(e) => setBusinessIdea(e.target.value)}
          placeholder="e.g., Quantum Leap"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div>
        <label htmlFor="logo-style" className="block text-sm font-medium text-gray-300 mb-2">
          Describe the desired logo style:
        </label>
        <input
          id="logo-style"
          type="text"
          value={logoStyle}
          onChange={(e) => setLogoStyle(e.target.value)}
          placeholder="e.g., minimalist, vintage, futuristic, neon"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Logo'
        )}
      </button>
    </form>
  );
};

interface LogoDisplayProps {
    imageUrl: string | null;
    isLoading: boolean;
    error: string | null;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ imageUrl, isLoading, error }) => {
    return (
        <div className="w-full max-w-lg h-96 mt-8 flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg overflow-hidden">
            {isLoading && (
                <div className="flex flex-col items-center text-gray-400">
                    <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg">Creating your masterpiece...</p>
                </div>
            )}
            {error && !isLoading && (
                <div className="text-center text-red-400 px-4">
                    <p className="font-semibold">An Error Occurred</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            )}
            {!isLoading && !error && imageUrl && (
                <img src={imageUrl} alt="Generated Logo" className="object-contain w-full h-full p-4" />
            )}
            {!isLoading && !error && !imageUrl && (
                <p className="text-gray-500 text-center px-4">Your generated logo will appear here</p>
            )}
        </div>
    );
};

// --- Main App Component ---

function App() {
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLogo = useCallback(async (businessIdea: string, logoStyle: string) => {
    setIsLoading(true);
    setError(null);
    setLogoImageUrl(null);

    try {
      const imageUrl = await generateLogo(businessIdea, logoStyle);
      setLogoImageUrl(imageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans text-white">
        <div className="w-full max-w-lg text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI Logo Generator
            </h1>
            <p className="mt-4 text-lg text-gray-400">
                Bring your business vision to life with a unique, AI-generated logo.
            </p>
        </div>
        
        <LogoGeneratorForm onGenerate={handleGenerateLogo} isLoading={isLoading} />
        
        <LogoDisplay imageUrl={logoImageUrl} isLoading={isLoading} error={error} />
    </div>
  );
}

export default App;
