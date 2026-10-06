import {
    MapContainer,
    TileLayer,
    useMap,
    GeoJSON
} from "react-leaflet";

import {
    useEffect,
    useState
} from "react";

import api from "../api/client";

import states from "../data/us-states.json";



function FitUSA(){

    const map = useMap();

    useEffect(()=>{

        const usaBounds = [
            [24.396308, -124.848974],
            [49.384358, -66.885444]
        ];

        map.fitBounds(
            usaBounds,
            {
                padding: [20, 20]
            }
        );

        map.setMaxBounds(
            usaBounds
        );

    }, [map]);

    return null;
}



function getRiskLevel(score){

    if(score === undefined || score === null){
        return "No Data";
    }

    if(score >= 0.45){
        return "High";
    }

    if(score >= 0.30){
        return "Medium";
    }

    return "Low";
}



function getStateColor(score){

    if(score === undefined || score === null){
        return "#cbd5e1";
    }

    if(score >= 0.45){
        return "#ef4444";
    }

    if(score >= 0.30){
        return "#facc15";
    }

    return "#22c55e";
}



function findStateData(
    stateName,
    stateRisk
){

    return stateRisk.find(

        item =>

            item.state
                ?.trim()
                .toLowerCase()

            ===

            stateName
                ?.trim()
                .toLowerCase()

    );

}



function getStyle(
    feature,
    stateRisk
){

    const stateName =
        feature.properties.name;

    const state =
        findStateData(
            stateName,
            stateRisk
        );

    const score =
        state
        ? state.score
        : null;

    return {

        fillColor:
            getStateColor(score),

        weight: 1,

        color: "#ffffff",

        opacity: 1,

        fillOpacity: 0.75

    };

}



function onEachState(
    feature,
    layer,
    stateRisk
){

    const stateName =
        feature.properties.name;

    const state =
        findStateData(
            stateName,
            stateRisk
        );

    const score =
        state
        ? state.score
        : null;

    const risk =
        getRiskLevel(score);


    const formattedScore =
        score !== null
        ? score.toFixed(3)
        : "No Data";


    layer.bindPopup(`

        <div class="state-popup">

            <h3>
                ${stateName}
            </h3>

            <div class="popup-score">

                <span>
                    CareGap Score
                </span>

                <strong>
                    ${formattedScore}
                </strong>

            </div>

            <div class="popup-risk">

                <span>
                    Risk Level
                </span>

                <strong
                    class="risk-${risk
                        .toLowerCase()
                        .replace(" ", "-")}"
                >
                    ${risk}
                </strong>

            </div>

        </div>

    `);


    layer.on({

        mouseover: (event) => {

            event.target.setStyle({

                weight: 2.5,

                color: "#0f172a",

                fillOpacity: 0.9

            });

            event.target.bringToFront();

        },


        mouseout: (event) => {

            event.target.setStyle(

                getStyle(
                    feature,
                    stateRisk
                )

            );

        }

    });

}



function MapLegend(){

    return (

        <div className="map-legend">

            <h4>
                CareGap Risk
            </h4>


            <div className="legend-item">

                <span
                    className="legend-color high"
                ></span>

                <span>
                    High
                </span>

            </div>


            <div className="legend-item">

                <span
                    className="legend-color medium"
                ></span>

                <span>
                    Medium
                </span>

            </div>


            <div className="legend-item">

                <span
                    className="legend-color low"
                ></span>

                <span>
                    Low
                </span>

            </div>


            <div className="legend-item">

                <span
                    className="legend-color no-data"
                ></span>

                <span>
                    No Data
                </span>

            </div>

        </div>

    );

}



function USMap(){

    const [
        stateRisk,
        setStateRisk
    ] = useState([]);


    useEffect(()=>{

        api.get("/state-risk")

        .then((response)=>{

            console.log(
                "MAP STATE DATA:",
                response.data
            );

            setStateRisk(
                response.data
            );

        })

        .catch((error)=>{

            console.log(
                "MAP ERROR:",
                error
            );

        });

    }, []);


    return (

        <div className="us-map-wrapper">


            <MapContainer

                center={[
                    39.8283,
                    -98.5795
                ]}

                zoom={4}

                minZoom={4}

                maxZoom={7}

                scrollWheelZoom={true}

                maxBounds={[

                    [24, -125],

                    [50, -65]

                ]}

                maxBoundsViscosity={1}

                style={{

                    height: "550px",

                    width: "100%",

                    borderRadius: "15px"

                }}

            >

                <FitUSA />


                <TileLayer

                    url={
                        "https://tile.openstreetmap.org/" +
                        "{z}/{x}/{y}.png"
                    }

                    attribution={
                        "&copy; OpenStreetMap contributors"
                    }

                />


                {
                    stateRisk.length > 0 &&

                    <GeoJSON

                        data={states}

                        style={

                            (feature) =>

                                getStyle(
                                    feature,
                                    stateRisk
                                )

                        }

                        onEachFeature={

                            (feature, layer) =>

                                onEachState(
                                    feature,
                                    layer,
                                    stateRisk
                                )

                        }

                    />

                }


            </MapContainer>


            <MapLegend />


        </div>

    );

}



export default USMap;