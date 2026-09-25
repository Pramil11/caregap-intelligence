import {
    MapContainer,
    TileLayer,
    GeoJSON
} from "react-leaflet";


import {
    useEffect,
    useState
} from "react";


import api from "../api/client";



function USCountyMap(){


    const [counties,setCounties] = useState(null);


    const [risk,setRisk] = useState({});



    useEffect(()=>{


        fetch(
          "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json"
        )
        .then(res=>res.json())
        .then(data=>{

            setCounties(data);

        });



        api.get("/county-risk")
        .then(res=>{


            const mapped={};


            res.data.forEach(item=>{


                mapped[item.fips]=item.score;


            });


            setRisk(mapped);



        });



    },[]);






    function getColor(score){


        if(score===undefined)
            return "#e5e7eb";


        if(score >=0.55)
            return "#dc2626";


        if(score >=0.35)
            return "#facc15";


        return "#22c55e";


    }





    function style(feature){


        const fips =
        feature.properties.GEO_ID
        .replace("0500000US","");



        return {


            fillColor:getColor(
                risk[fips]
            ),


            weight:0.3,


            color:"#ffffff",


            fillOpacity:0.8


        };


    }






    return (

        <div className="map-container">


        <MapContainer


            center={[
                39.8283,
                -98.5795
            ]}


            zoom={4}


            minZoom={4}


            maxZoom={7}


            style={{
                height:"600px",
                width:"100%"
            }}


        >



        <TileLayer

        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        />



        {
            counties &&
            <GeoJSON

            data={counties}

            style={style}

            />

        }



        </MapContainer>



        </div>


    );


}



export default USCountyMap;