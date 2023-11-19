// import React, {useEffect, version} from "react";
// import { Loader } from '@googlemaps/js-api-loader';

// export function Map(lat:any, lng:any) {
//   const mapRef = React.useRef(null);
//   useEffect(() => {
//     const initMap = async () => {
//       const loader = new Loader({
//         apiKey: process.env.GMAPS_API_KEY as string, // Make sure this is correctly set in your environment
//         version: 'weekly'
//       })

//       await loader.load();

//       const position = {
//         lat: lat,
//         lng: lng
//       };

//       if (mapRef.current) {
//         const mapOptions = {
//           center: position,
//           zoom: 10
//         };

//         const map = new google.maps.Map(mapRef.current, mapOptions);
//         new google.maps.Marker({
//           map: map,
//           position: position
//         });
//       }
//     }

//     initMap()
//   }, [])

//     return (
//       <div style={{height: '500px'}} ref={mapRef} />
//     )
    
// }





import React from 'react';
import GoogleMapReact from 'google-map-react';

interface MapProps {
  lat: number;
  lng: number;
}

const AnyReactComponent: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => <div style={{ height: '10px', width: '10px', backgroundColor: 'red', borderRadius: '50%' }}></div>;

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GMAPS_API_KEY as string }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={lat}
          lng={lng}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
