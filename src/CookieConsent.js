import React, { useState } from 'react';

const CookieConsent = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  const handleAcceptCookies = () => {
    setShowCookieBanner(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  // Sprawdzamy, czy użytkownik już zaakceptował cookies
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    return null;
  }

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          Ta strona używa plików cookie do poprawy jakości użytkowania. Więcej informacji
          w <a href="/polityka-cookie" target="_blank" rel="noopener noreferrer">polityce cookie</a>.
        </p>
        <button onClick={handleAcceptCookies}>Akceptuję</button>
      </div>
    </div>
  );
};

export default CookieConsent;
