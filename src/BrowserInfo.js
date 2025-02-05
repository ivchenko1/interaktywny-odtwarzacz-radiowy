import React, { useState, useEffect } from 'react';

const BrowserInfo = () => {
  const [location, setLocation] = useState(null);
  const [browserInfo, setBrowserInfo] = useState({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
  });

  useEffect(() => {
    // Funkcja do uzyskania lokalizacji użytkownika
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Geolocation error: ', error);
            setLocation({ error: 'Nie udało się uzyskać lokalizacji' });
          }
        );
      } else {
        setLocation({ error: 'Geolokalizacja nie jest obsługiwana w tej przeglądarce' });
      }
    };

    getLocation();
  }, []);

  return (
    <div className="browser-info">
      <h3>Informacje o przeglądarce</h3>
      <p><strong>Platforma:</strong> {browserInfo.platform}</p>
      <p><strong>Język:</strong> {browserInfo.language}</p>
      <p><strong>Agenta użytkownika:</strong> {browserInfo.userAgent}</p>

      <h3>Lokalizacja użytkownika</h3>
      {location ? (
        location.error ? (
          <p>{location.error}</p>
        ) : (
          <>
            <p><strong>Szerokość geograficzna:</strong> {location.latitude}</p>
            <p><strong>Długość geograficzna:</strong> {location.longitude}</p>
          </>
        )
      ) : (
        <p>Ładowanie lokalizacji...</p>
      )}
    </div>
  );
};

export default BrowserInfo;
