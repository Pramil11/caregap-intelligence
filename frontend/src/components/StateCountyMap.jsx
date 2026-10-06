import {
    MapContainer,
    TileLayer,
    GeoJSON,
    useMap
} from "react-leaflet";

import {
    useEffect,
    useState
} from "react";

import L from "leaflet";

import api from "../api/client";


const COUNTY_GEOJSON_URL =
    "https://raw.githubusercontent.com/" +
    "plotly/datasets/master/" +
    "geojson-counties-fips.json";



/* =========================
   Risk Classification
========================= */

function getCountyColor(score){

    if(
        score === undefined ||
        score === null
    ){
        return "#cbd5e1";
    }


    if(score >= 0.40){
        return "#ef4444";
    }


    if(score >= 0.30){
        return "#facc15";
    }


    return "#22c55e";
}



function getRiskLevel(score){

    if(
        score === undefined ||
        score === null
    ){
        return "No Data";
    }


    if(score >= 0.40){
        return "High";
    }


    if(score >= 0.30){
        return "Medium";
    }


    return "Low";
}



/* =========================
   Fit and Lock State Map
========================= */

function FitStateMap({
    geoJson
}){

    const map = useMap();


    useEffect(()=>{

        if(
            !geoJson ||
            !geoJson.features ||
            geoJson.features.length === 0
        ){
            return;
        }


        const layer =
            L.geoJSON(geoJson);


        const bounds =
            layer.getBounds();


        if(!bounds.isValid()){
            return;
        }


        /*
            Fit the map exactly to
            the selected state's counties.
        */

        map.fitBounds(
            bounds,
            {
                padding: [25,25]
            }
        );


        /*
            Give the user a small amount
            of space around the state.
        */

        const lockedBounds =
            bounds.pad(0.08);


        /*
            Prevent dragging outside
            the selected state.
        */

        map.setMaxBounds(
            lockedBounds
        );

        /*
            Remember the zoom level that
            displays the entire state.

            The user cannot zoom OUT
            farther than this.
        */

        const stateZoom =
            map.getZoom();


        map.setMinZoom(
            stateZoom
        );


    }, [geoJson, map]);


    return null;

}



/* =========================
   State County Map
========================= */

function StateCountyMap({
    stateName
}){

    const [
        geoData,
        setGeoData
    ] = useState(null);


    const [
        counties,
        setCounties
    ] = useState([]);


    const [
        error,
        setError
    ] = useState(null);



    useEffect(()=>{

        Promise.all([

            fetch(
                COUNTY_GEOJSON_URL
            )
            .then(response=>{

                if(!response.ok){

                    throw new Error(
                        "Unable to load county boundaries."
                    );

                }

                return response.json();

            }),


            api.get(
                `/state/${encodeURIComponent(
                    stateName
                )}/counties`
            )

        ])

        .then(
            ([
                geoJsonResponse,
                countyResponse
            ])=>{

                setGeoData(
                    geoJsonResponse
                );

                setCounties(
                    countyResponse.data
                );

            }
        )

        .catch(error=>{

            console.log(
                "STATE COUNTY MAP ERROR:",
                error
            );

            setError(
                "Unable to load county map."
            );

        });

    }, [stateName]);



    if(error){

        return (

            <div className="state-map-loading">

                {error}

            </div>

        );

    }



    if(!geoData){

        return (

            <div className="state-map-loading">

                Loading county map...

            </div>

        );

    }



    /* =========================
       County Lookup
    ========================== */

    const countyLookup = {};


    counties.forEach(county=>{

        const fips =
            String(
                county.county_fips
            ).padStart(5,"0");


        countyLookup[fips] =
            county;

    });



    /* =========================
       Filter Counties
    ========================== */

    const filteredFeatures =
        geoData.features.filter(
            feature=>{

                const geoId =
                    feature
                        .properties
                        ?.GEO_ID
                        ?.replace(
                            "0500000US",
                            ""
                        );


                return Boolean(
                    countyLookup[geoId]
                );

            }
        );


    const filteredGeoJson = {

        type: "FeatureCollection",

        features: filteredFeatures

    };



    /* =========================
       Find County
    ========================== */

    function getCountyFromFeature(
        feature
    ){

        const fips =
            feature
                .properties
                ?.GEO_ID
                ?.replace(
                    "0500000US",
                    ""
                );


        return countyLookup[fips];

    }



    /* =========================
       County Style
    ========================== */

    function styleCounty(
        feature
    ){

        const county =
            getCountyFromFeature(
                feature
            );


        return {

            fillColor:
                getCountyColor(
                    county?.caregap_score
                ),

            weight: 1,

            color: "#ffffff",

            opacity: 1,

            fillOpacity: 0.78

        };

    }



    /* =========================
       County Popup
    ========================== */

    function onEachCounty(
        feature,
        layer
    ){

        const county =
            getCountyFromFeature(
                feature
            );


        const countyName =
            county?.county_name
            ||
            feature
                .properties
                ?.NAME
            ||
            "County";


        const score =
            county
            ? county.caregap_score
            : null;


        const risk =
            getRiskLevel(
                score
            );


        const formattedScore =
            score !== null
            ? score.toFixed(3)
            : "No Data";



        layer.bindPopup(`

            <div class="state-popup">

                <h3>
                    ${countyName}
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
                            .replace(
                                " ",
                                "-"
                            )}"
                    >
                        ${risk}
                    </strong>

                </div>

            </div>

        `);



        layer.on({

            mouseover: (event)=>{

                event.target.setStyle({

                    weight: 2.5,

                    color: "#0f172a",

                    fillOpacity: 0.92

                });


                event.target.bringToFront();

            },


            mouseout: (event)=>{

                event.target.setStyle(

                    styleCounty(
                        feature
                    )

                );

            }

        });

    }



    return (

        <div className="state-county-map">


            <MapContainer

                center={[
                    39.8283,
                    -98.5795
                ]}

                zoom={5}

                minZoom={4}

                maxZoom={10}

                scrollWheelZoom={true}

                doubleClickZoom={false}

                maxBoundsViscosity={1}

                style={{

                    height: "500px",

                    width: "100%",

                    borderRadius: "15px"

                }}

            >


                <TileLayer

                    url={
                        "https://tile.openstreetmap.org/" +
                        "{z}/{x}/{y}.png"
                    }

                    attribution={
                        "&copy; OpenStreetMap contributors"
                    }

                />


                <FitStateMap
                    geoJson={
                        filteredGeoJson
                    }
                />


                <GeoJSON

                    data={
                        filteredGeoJson
                    }

                    style={
                        styleCounty
                    }

                    onEachFeature={
                        onEachCounty
                    }

                />


            </MapContainer>



            <div className="county-map-legend">

                <strong>
                    CareGap Risk
                </strong>


                <span>

                    <i className="legend-high"></i>

                    High ≥ 0.40

                </span>


                <span>

                    <i className="legend-medium"></i>

                    Medium 0.30-0.39

                </span>


                <span>

                    <i className="legend-low"></i>

                    Low &lt; 0.30

                </span>


                <span>

                    <i className="legend-no-data"></i>

                    No Data

                </span>

            </div>


        </div>

    );

}



export default StateCountyMap;