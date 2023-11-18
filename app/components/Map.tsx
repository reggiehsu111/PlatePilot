import React, {useEffect, version} from "react";
import { Loader } from '@googlemaps/js-api-loader';

export function Map() {
  const mapRef = React.useRef(null);
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.GMAPS_API_KEY as string, // Make sure this is correctly set in your environment
        version: 'weekly'
      })

      await loader.load();

      const position = {
        lat: 43.64,
        lng: -79.38
      };

      if (mapRef.current) {
        const mapOptions = {
          center: position,
          zoom: 10
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        new google.maps.Marker({
          map: map,
          position: position
        });
      }
    }

    initMap()
  }, [])

    return (
      <div style={{height: '500px'}} ref={mapRef} />
    )
    
}