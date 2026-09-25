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

            [24.396308,-124.848974],

            [49.384358,-66.885444]

        ];



        map.fitBounds(
            usaBounds,
            {
                padding:[20,20]
            }
        );


        map.setMaxBounds(
            usaBounds
        );



    },[map]);


    return null;

}






function getStateColor(score){

    if(score === undefined || score === null){

        return "#94a3b8"; // gray = no data

    }


    if(score >= 0.45){

        return "#ef4444"; // high risk

    }


    if(score >= 0.30){

        return "#facc15"; // medium risk

    }

    if(score <= 0.30){
        return "#22c55e"; // low risk
    }
}








function getStyle(feature,stateRisk){


    const stateName =
        feature.properties.name;



    const state =
        stateRisk.find(
            item =>
            item.state === stateName
        );



    const score =
        state ? state.score : 0;



    return {


        fillColor:
            getStateColor(score),


        weight:1,


        color:"#ffffff",


        fillOpacity:0.65


    };


}









function onEachState(feature,layer,stateRisk){



    const stateName =
        feature.properties.name;



    const state =
        stateRisk.find(
            item =>
            item.state === stateName
        );



    const score =
        state
        ?
        state.score.toFixed(3)
        :
        "No Data";





    layer.bindPopup(

        `
        <div>

        <h3>
        ${stateName}
        </h3>


        <p>
        CareGap Score:
        <b>${score}</b>
        </p>


        </div>
        `

    );





    layer.on({

        mouseover:(e)=>{


            e.target.setStyle({

                weight:3,

                fillOpacity:0.85

            });


        },


        mouseout:(e)=>{


            e.target.setStyle(

                getStyle(
                    feature,
                    stateRisk
                )

            );


        }


    });



}









function USMap(){


    const [
        stateRisk,
        setStateRisk
    ] = useState([]);





    useEffect(()=>{


        api.get("/state-risk")

        .then(res=>{


            console.log(
                "MAP STATE DATA:",
                res.data
            );


            setStateRisk(
                res.data
            );


        })


        .catch(err=>{


            console.log(err);


        });



    },[]);






    return (


        <div className="us-map">



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

                [24,-125],

                [50,-65]

            ]}



            maxBoundsViscosity={1}



            style={{

                height:"550px",

                width:"100%",

                borderRadius:"15px"

            }}



        >




            <FitUSA />





            <TileLayer


                url=
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png"


                attribution=
                "&copy; OpenStreetMap contributors"


            />






            {
                stateRisk.length > 0 &&

                <GeoJSON


                    data={states}


                    style={
                        (feature)=>
                        getStyle(
                            feature,
                            stateRisk
                        )
                    }



                    onEachFeature={
                        (feature,layer)=>
                        onEachState(
                            feature,
                            layer,
                            stateRisk
                        )
                    }


                />


            }




        </MapContainer>



        </div>


    );


}




export default USMap;