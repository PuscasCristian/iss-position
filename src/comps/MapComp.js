import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComp = () => {
    const [issLocation, setissLocation] = useState({});
    const defaultPosition = [51.50, 0.09];
    return (
        <Map className="map-wrapper" center={defaultPosition} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
}

export default MapComp
