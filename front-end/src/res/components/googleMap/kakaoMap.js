import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = (props) => {
    
  const { lat, lng } = props;

  const mapStyles = {
    width: '750px',
    height: '720px',
  };

    return (
        <Map
          center={{ lat, lng }}
          style={mapStyles}
          level={3}
        >
          <MapMarker position={{ lat, lng}}>
            {/* <div style={{color:"#000"}}>운동 장소</div> */}
          </MapMarker>
        </Map>
      )
};

export default KakaoMap;