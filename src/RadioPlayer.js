import React, { useState, useRef, useEffect } from "react";

const stations = [
  { name: "Antyradio", url: "http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx" },
  { name: "RMF FM", url: "http://31.192.216.7/rmf_fm" },
  { name: "Radio ZET", url: "http://n-4-6.dcs.redcdn.pl/sc/o2/Eurozet/live/audio.livx" },
];

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentStation, setCurrentStation] = useState(stations[0].url);
  const [volume, setVolume] = useState(0.5); // Начальная громкость 50%
  const audioRef = useRef(new Audio(stations[0].url));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Прежде чем начать воспроизведение, вызываем load()
    audioRef.current.load();  // Загружаем новый источник
    audioRef.current.src = currentStation;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentStation]); // Теперь при смене станции загружаем новый поток

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="radio-player">
      <h2>Odtwarzacz Radiowy</h2>
      
      <label>
        Wybierz stację:
        <select value={currentStation} onChange={(e) => setCurrentStation(e.target.value)}>
          {stations.map((station, index) => (
            <option key={index} value={station.url}>
              {station.name}
            </option>
          ))}
        </select>
      </label>

      <button onClick={togglePlayPause}>
        {isPlaying ? "Pauza" : "Odtwórz"}
      </button>

      <label>
        Głośność:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </label>

      <div className="date-time">
        <p>Data: {currentDateTime.toLocaleDateString()}</p>
        <p>Godzina: {currentDateTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default RadioPlayer;
