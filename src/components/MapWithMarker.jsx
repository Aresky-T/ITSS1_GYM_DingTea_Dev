import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

const Map = withScriptjs(withGoogleMap(({address}) => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 0, lng: 0 }}
    >
        <Marker position={{lat: 0, lng: 0}}/>
    </GoogleMap>
)))

const MapWithMarker = ({address}) => {
    return <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_API_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        address={address}
    />
}

export default MapWithMarker;