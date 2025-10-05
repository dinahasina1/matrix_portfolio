import React, { useState, useEffect } from 'react';
import './Loading.css';
import dinahasinaImage from '../assets/dinahasina-bg.png';

const Loading = ({ onLoadingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [progress, setProgress] = useState(0);
  

  useEffect(() => {
    const loadingSteps = [
      { text: "Initializing Dinahasina Portfolio OS...", duration: 1000 },
      { text: "Loading Matrix core...", duration: 800 },
      { text: "Mounting filesystems...", duration: 700 },
      { text: "Starting networking services...", duration: 600 },
      { text: "Loading user profile...", duration: 500 },
      { text: "Initializing terminal interface...", duration: 400 },
      { text: "System ready. Welcome to the Matrix.", duration: 600 }
    ];
    
    let timeouts = [];
    let intervals = [];
    
    // Handle keyboard shortcuts
    const handleKeyPress = (e) => {
      if (e.key === 's' || e.key === 'S') {
        timeouts.forEach(clearTimeout);
        intervals.forEach(clearInterval);
        onLoadingComplete();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Simple sequential loading with guaranteed completion
    let currentStepIndex = 0;
    
    const runNextStep = () => {
      if (currentStepIndex >= loadingSteps.length) {
        onLoadingComplete();
        return;
      }
      
      const step = loadingSteps[currentStepIndex];
      
      setCurrentStep(currentStepIndex);
      
      // Typewriter effect
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex <= step.text.length) {
          setLoadingText(step.text.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 30);
      intervals.push(typeInterval);

      // Update progress
      const progressPercent = ((currentStepIndex + 1) / loadingSteps.length) * 100;
      setProgress(progressPercent);

      // Move to next step after duration
      const timeout = setTimeout(() => {
        currentStepIndex++;
        runNextStep();
      }, step.duration);
      timeouts.push(timeout);
    };
    
    // Start the loading sequence
    runNextStep();

    // Safety timeout - force completion after 8 seconds
    const safetyTimeout = setTimeout(() => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      onLoadingComplete();
    }, 8000);
    timeouts.push(safetyTimeout);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []); // Empty dependency array to run only once

  return (
    <div className="loading-screen">
      <div className="grub-container">
        <div className="grub-header">
          <div className="grub-logo-container">
            <img 
              src={dinahasinaImage} 
              alt="Dinahasina Ralaivao" 
              className="grub-logo"
            />
          </div>
          <div className="grub-title">GNU GRUB version 2.06</div>
          <div className="grub-subtitle">Dinahasina Portfolio OS v1.0.0</div>
        </div>
        
        <div className="grub-menu">
          <div className="grub-menu-item active">
            <span className="grub-pointer">►</span>
            <span className="grub-text">Dinahasina Portfolio OS (on /dev/sda1)</span>
          </div>
          <div className="grub-menu-item">
            <span className="grub-pointer"> </span>
            <span className="grub-text">Advanced options for Dinahasina Portfolio OS</span>
          </div>
        </div>

        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>

        <div className="loading-status">
          <div className="status-text">{loadingText}<span className="cursor-blink">|</span></div>
          <div className="status-dots">
            {[...Array(3)].map((_, i) => (
              <span 
                key={i} 
                className={`dot ${currentStep >= i ? 'active' : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></span>
            ))}
          </div>
        </div>

        <div className="grub-footer">
          <div className="grub-help">Use ↑ and ↓ arrow keys to select which entry is highlighted.</div>
          <div className="grub-help">Press Enter to boot the selected OS, 'e' to edit the commands</div>
          <div className="grub-help">Debug: Press 's' to skip loading</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
