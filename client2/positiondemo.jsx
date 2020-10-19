import React from "react";
import PropTypes from "prop-types";
import { usePosition } from "../client2/usePosition";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

let App;

export default (App = props => {
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(true);

  const options = {
    zoomControlOptions: {
      position: 0 // ,
      // ...otherOptions
    }
  };

  function MyMap() {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "clavegoogle" // ,
      // ...otherOptions
    });

    const renderMap = () => {
      // wrapping to a function is useful in case you want to access `window.google`
      // to eg. setup options or create latLng object, it won't be available otherwise
      // feel free to render directly if you don't need that

      return (
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            height: "550px",
            width: "380px"
          }}
          zoom={16}
          center={{
            lat: latitude,
            lng: longitude
          }}
        >
          <Marker
            position={{
              lat: latitude,
              lng: longitude
            }}
            icon={"http://maps.google.com/mapfiles/kml/shapes/truck.png"}
          />
        </GoogleMap>
      );
    };

    if (loadError) {
      return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? renderMap() : "";
  }

  return (
    <div>
      {/* <code>
        latitude: {latitude}
        <br />
        longitude: {longitude}
        <br />
        timestamp: {timestamp}
        <br />
        accuracy: {accuracy && `${accuracy}m`}
        <br />
        error: {error}
      </code> */}

      <MyMap />
    </div>
  );
});
