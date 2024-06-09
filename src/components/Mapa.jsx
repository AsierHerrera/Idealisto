import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import apikey from "../utils/apikey.js"

const Mapa = ({ latitud, longitud }) => {
  const position = { lat: latitud, lng: longitud };
  
  return (
    <APIProvider apiKey={apikey}>
        <Map
        style={{width: '500px', height: '500px'}}
        defaultCenter={ position }
        defaultZoom={8}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId='cd20914939b5878f'
        />
        <AdvancedMarker

            position={position}>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
  </APIProvider>
 );
}
export default Mapa;
