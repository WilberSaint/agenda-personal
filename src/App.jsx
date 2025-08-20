import React, { useState, useEffect } from 'react';
import './App.css';
import CategorySelector from './components/CategorySelector';
import QuickForm from './components/QuickForm';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setShowSuccess(false);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
    // Auto-close after 2 seconds
    setTimeout(() => {
      handleBack();
    }, 2000);
  };

  // PWA Install functionality
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      
      setDeferredPrompt(null);
    } else {
      // Fallback for iOS
      setShowInstallPrompt(false);
      alert('Para instalar en iPhone:\n1. Toca el botón "Compartir" en Safari\n2. Selecciona "Agregar a pantalla de inicio"');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-icon">⏰</div>
        <h1 className="header-title">Así funciona</h1>
        <p className="header-subtitle">Un solo toque desde tu pantalla</p>
        
        {showInstallPrompt && (
          <button className="install-button" onClick={handleInstallPWA}>
            📱 Instalar App
          </button>
        )}
      </header>

      <main className="main-content">
        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="success-title">¡Guardado!</h2>
            <p className="success-description">
              Se abrirá la app correspondiente en tu iPhone
            </p>
            <button className="done-button" onClick={handleBack}>
              Listo
            </button>
          </div>
        ) : selectedCategory ? (
          <QuickForm 
            category={selectedCategory} 
            onBack={handleBack}
            onSuccess={handleSuccess}
          />
        ) : (
          <CategorySelector onSelect={handleCategorySelect} />
        )}
      </main>
    </div>
  );
}

export default App;