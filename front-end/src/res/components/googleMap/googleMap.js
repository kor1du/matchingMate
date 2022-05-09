import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";


const GoogleMap = (props) => {

  const mapStyles = {
    width: '750px',
    height: '750px',
  };

  const center = {
    lat: 36.124,
    lng: 128.3402
  };

  return (
    <>
      <Map
        google={props.google}
        zoom={17}
        style={mapStyles}
        initialCenter={center}
      >
        <Marker name="36.124 128.3402" />
        <InfoWindow>
        </InfoWindow>
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYVvZNp_Hmlx6WHe61Z1LLc4FV3SMlR40'
})(GoogleMap);