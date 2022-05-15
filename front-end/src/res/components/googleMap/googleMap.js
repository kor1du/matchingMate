import React from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

const GoogleMap = (props) => {
  const mapStyles = {
    width: "100%",
    height: "100%",
    paddingTop: "50px",
  };

  const center = {
    lat: 36.145,
    lng: 128.393,
  };

  return (
    <>
      <Map google={props.google} zoom={17} style={mapStyles} initialCenter={center}>
        <Marker name="36.145 128.393" />
        <InfoWindow></InfoWindow>
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBYVvZNp_Hmlx6WHe61Z1LLc4FV3SMlR40",
})(GoogleMap);
