import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../node_modules/leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

const Icon = L.icon({
    iconUrl: 'http://open-notify.org//Open-Notify-API/map/ISSIcon.png',
    iconSize: [50, 30],
    iconAnchor: [25,15],
    popupAnchor: [0,-30]
});

const MapComp = () => {

    const [issData, setissData] = useState();
    const [location, setLocation ] = useState({
        location: {
            lat: 1.774,
            lng: 2.703,
        },
        zoom: 4
    });
    const [markers, setMarkers] = useState();
    const [count, setCount] = useState(0)
    setTimeout(() => {
      setCount(count + 1);
    }, 1000 );
    
    const getData = async function() {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const issPos = await response.json()
        setissData(issPos)
      } catch(err) {
        console.log('Opps', err);
      }
    }
    useEffect(() => {
      if(issData) {
        setMarkers({
          lat: issData.iss_position.latitude,
          lng: issData.iss_position.longitude,
        })
        setLocation({
          location: {
            lat: issData.iss_position.latitude,
            lng: issData.iss_position.longitude,
        }})
      }
    },[issData])

    useEffect(() => {
      getData();
      console.log(issData);
      return () => {
        getData()
      }
    }, [count])
    return (
        <Map className="map-wrapper" center={location.location} zoom={location.zoom} >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           { markers && 
           <motion.div>

                <Marker className="marker" position={markers} icon={Icon}>
                <Popup> 
                    <h4>My name is Flasch</h4>
                </Popup>
            </Marker>
          </motion.div>

           }
                
                       

        </Map>
    )
}

export default MapComp
