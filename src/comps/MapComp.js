import React, { useState, useEffect } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const Icon = L.icon({
    iconUrl: "http://open-notify.org//Open-Notify-API/map/ISSIcon.png",
    iconSize: [50, 30],
    iconAnchor: [25, 15],
    popupAnchor: [0, -30],
});
const Dot = L.icon({
    iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png",
    iconSize: [5, 5],
    iconAnchor: [5, 5],
    popupAnchor: [0, -30],
});

const MapComp = () => {
    const [previousLocation, setPreviousLocation] = useState([]);
    const [issData, setissData] = useState();
    const [location, setLocation] = useState({
        zoom: 4,
    });
    const [markers, setMarkers] = useState();
    const [popup, setPopup] = useState();

    useEffect(() => {
        const getData = async function () {
            try {
                const response = await fetch(
                    "https://api.wheretheiss.at/v1/satellites/25544"
                );
                const issPos = await response.json();
                setissData(issPos);
            } catch (err) {
                console.log("Opps", err);
            }
        };

        setInterval(function () {
            getData();
        }, 2500);
    }, []);
    useEffect(() => {
        const checkInput = () => {
            if (issData) {
                setMarkers({
                    lat: issData.latitude,
                    lng: issData.longitude,
                });
                setLocation({
                    location: {
                        lat: issData.latitude,
                        lng: issData.longitude,
                    },
                });
                setPopup({
                    altitude: issData.altitude.toFixed(2),
                    speed: issData.velocity.toFixed(0),
                    visibility: issData.visibility,
                });
            }
        };
        const previousLoc = function () {
            if (issData) {
                let currentLoc = {
                    lat: issData.latitude,
                    lng: issData.longitude,
                    id: issData.timestamp,
                };
                setPreviousLocation([...previousLocation, currentLoc]);
            }
        };
        checkInput();
        previousLoc();
        return () => {
            checkInput();
        };
    }, [issData]);

    return (
        <Map className='map-wrapper' center={markers} zoom={location.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {markers && (
                <Marker className='marker' position={markers} icon={Icon}>
                    <Popup>
                        {popup && (
                            <div>
                                <p>
                                    The ISS Craft is {popup.altitude}{" "}
                                    Killometers above us, flying at a speed of{" "}
                                    {popup.speed} Km/h. The ISS Space Station is
                                    currently in {popup.visibility}.
                                </p>
                            </div>
                        )}
                    </Popup>
                </Marker>
            )}
            {previousLocation &&
                previousLocation.map((position, index) => (
                    <Marker position={position} key={index} icon={Dot}></Marker>
                ))}
        </Map>
    );
};

export default MapComp;
