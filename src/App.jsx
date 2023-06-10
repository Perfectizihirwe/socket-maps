import { useState, useCallback, useEffect } from 'react'
import './App.css'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated";

const containerStyle = {
  width: '80vh',
  height: '500px'
};

function App() {
  console.log("hello")
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAEqR7j2a37UGpyYvCZujhXKCrnzwvBAKk"
  })

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  console.log(coords)

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: coords.latitude, lng: coords.longitude }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker icon={"https://i.ibb.co/WtTnL2k/image-1.png"} position={{ lat: coords.latitude, lng: coords.longitude }} />
    </GoogleMap>
  ) : <></>
}

export default App
