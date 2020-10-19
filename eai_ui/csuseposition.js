import { useState, useEffect } from "react";

const defaultSettings = {
  Active: true,
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: 0
};

export const usePosition = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords, timestamp }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp
    });
  };

  const onError = error => {
    setError(error.message);
  };

  useEffect(() => {

    if(settings.Active){


      const geo = navigator.geolocation;
      if (!geo) {
        setError("Geolocation is not supported");
        return;
      }

      let watcher = null;
      if (watch) {
        watcher = geo.watchPosition(onChange, onError, settings);
      } else {
        watcher = geo.getCurrentPosition(onChange, onError, settings);
      }

      return () => watcher && geo.clearWatch(watcher);

    } else { return () => 0}

    }, [settings]);

    return { ...position, error };





};
