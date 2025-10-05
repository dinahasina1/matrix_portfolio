import React, { useEffect, useRef } from 'react';
import dinahasinaImage from '../assets/dinahasina-bg.png';

const ProfilePhoto = () => {
  const canvasRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const photo = photoRef.current;

    if (!canvas || !photo) return;


    // Add event listeners to check image loading
    const handleImageLoad = () => {
      console.log('ProfilePhoto: ✅ Image loaded successfully!', {
        src: photo.src,
        width: photo.naturalWidth,
        height: photo.naturalHeight
      });
    };

    const handleImageError = () => {
      console.log('ProfilePhoto: ❌ Image failed to load!', {
        src: photo.src
      });
    };

    photo.addEventListener('load', handleImageLoad);
    photo.addEventListener('error', handleImageError);


    // Set canvas size to match photo
    const updateCanvasSize = () => {
      canvas.width = photo.offsetWidth;
      canvas.height = photo.offsetHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Matrix characters for photo effect
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 8;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    // Drawing function
    const draw = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(13, 17, 23, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green matrix characters
      ctx.fillStyle = '#00FF00';
      ctx.font = fontSize + 'px monospace';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 150);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateCanvasSize);
      photo.removeEventListener('load', handleImageLoad);
      photo.removeEventListener('error', handleImageError);
    };
  }, []);

  return (
    <div className="profile-photo-container">
      <div className="photo-wrapper">
        <img 
          ref={photoRef}
          src={dinahasinaImage} 
          alt="Dinahasina Ralaivao" 
          className="profile-photo"
        />
        <canvas 
          ref={canvasRef} 
          className="photo-matrix-overlay"
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;
