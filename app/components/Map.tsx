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
