import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = (props) => {

  return(
    <GoogleMap 
    defaultZoom={17}
    defaultCenter={{lat: props.lat, lng: props.lng}}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
    </GoogleMap>
  );

};

export default withScriptjs(withGoogleMap(Map))

