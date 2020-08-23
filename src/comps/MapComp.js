import React, { useState, useEffect } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import useGetData from "../hooks/useGetData";
import useGetAstros from "../hooks/useGetAstros";

const Icon = L.icon({
    iconUrl: "http://open-notify.org//Open-Notify-API/map/ISSIcon.png",
    iconSize: [50, 30],
    iconAnchor: [25, 15],
    popupAnchor: [0, -30],
});

const MapComp = () => {
    const { issData } = useGetData(); // custom hook get iss position
    const { astro } = useGetAstros(); // custom hook get astronauts data

    const [location, setLocation] = useState({
        location: {
            lat: 1.774,
            lng: 2.703,
        },
        zoom: 4,
    });
    const [markers, setMarkers] = useState();
    const [popup, setPopup] = useState();

    useEffect(() => {
        if (issData) {
            setMarkers({
                lat: issData.iss_position.latitude,
                lng: issData.iss_position.longitude,
            });
            setLocation({
                location: {
                    lat: issData.iss_position.latitude,
                    lng: issData.iss_position.longitude,
                },
            });
        }
    }, [issData]);
    useEffect(() => {
        if (astro) {
            setPopup({
                number: astro.number,
                people: astro.people.map((ppl) => ppl.name),
            });
        }
    }, [astro]);

    return (
        <Map className='map-wrapper' center={markers} zoom={location.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {markers && (
                <div>
                    <Marker className='marker' position={markers} icon={Icon}>
                        <Popup>
                            {popup && (
                                <div>
                                    <h4>
                                        There are currently {popup.number}{" "}
                                        people on ISS craft right now. <br />
                                    </h4>
                                    <ul>
                                        {popup.people.map((name) => (
                                            <li key={name.length}>{name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Popup>
                    </Marker>
                </div>
            )}
        </Map>
    );
};

export default MapComp;
