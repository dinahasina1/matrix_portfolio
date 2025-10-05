import React, { useState } from 'react';
import './App.css';
import Loading from './components/Loading';
import LanguageSelector from './components/LanguageSelector';
import Terminal from './components/Terminal';
import MatrixBackground from './components/MatrixBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowLanguageSelector(true);
  };

  const handleLanguageSelected = (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };

  return (
    <div className="App">
      <MatrixBackground />
      {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
      {showLanguageSelector && (
        <LanguageSelector onLanguageSelected={handleLanguageSelected} />
      )}
      {!isLoading && !showLanguageSelector && (
        <Terminal language={selectedLanguage} />
      )}
    </div>
  );
}

export default App;