import React from 'react';
import RadioPlayer from './RadioPlayer';
import BrowserInfo from './BrowserInfo';
import CookieConsent from './CookieConsent'; 
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Radio Internetowe</h1>
      </header>
      <main className="main-content">
        <RadioPlayer />
        <BrowserInfo />
      </main>
      <footer className="footer">
        <p>&copy; 2025 Radio Internetowe. Wszelkie prawa zastrzeżone.</p>
      </footer>

      {/* Powiadomienie o cookie */}
      <CookieConsent />
    </div>
  );
}

export default App;
