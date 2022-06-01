import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";


const GoogleMap = (props) => {

  const { lat, lng } = props;

  console.log("위도경도 잘 받나 ? 지도에서 ? ", lat, lng)

  const mapStyles = {
    width: '750px',
    height: '750px',
  };

  const center = {
    lat,
    lng
  };

  return (
    <>
      <Map
        google={props.google}
        zoom={17}
        style={mapStyles}
        initialCenter={center}
      >
        <Marker name={`${lat} ${lng}`} />
        <InfoWindow>
        </InfoWindow>
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYVvZNp_Hmlx6WHe61Z1LLc4FV3SMlR40'
})(GoogleMap);