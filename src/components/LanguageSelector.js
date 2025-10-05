import React, { useState, useEffect } from 'react';
import './LanguageSelector.css';

const LanguageSelector = ({ onLanguageSelected }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show language selector after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    
    // Add a brief delay before transitioning
    setTimeout(() => {
      onLanguageSelected(language);
    }, 800);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="language-selector">
      <div className="language-container">
        <div className="language-header">
          <div className="language-title">🌐 Language Selection</div>
          <div className="language-subtitle">Choose your preferred language</div>
        </div>
        
        <div className="language-options">
          <div 
            className={`language-option ${selectedLanguage === 'en' ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect('en')}
          >
            <div className="language-flag">🇺🇸</div>
            <div className="language-name">English</div>
            <div className="language-desc">International</div>
          </div>
          
          <div 
            className={`language-option ${selectedLanguage === 'fr' ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect('fr')}
          >
            <div className="language-flag">🇫🇷</div>
            <div className="language-name">Français</div>
            <div className="language-desc">Native</div>
          </div>
        </div>
        
        <div className="language-footer">
          <div className="language-help">Click to select • Press ESC to continue with English</div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
