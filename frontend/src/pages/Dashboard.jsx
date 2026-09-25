import { useEffect, useState } from "react";

import api from "../api/client";

import StatCard from "../components/StatCard";
import TopCounties from "../components/TopCounties";
import USMap from "../components/USMap"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList
} from "recharts";


function Dashboard(){

    const [stats, setStats] = useState(null);
    const [riskData, setRiskData] = useState([]);
    const [stateRisk, setStateRisk] = useState([]);



    useEffect(()=>{


        // =========================
        // Dashboard Statistics
        // =========================

        api.get("/stats")
        .then((response)=>{

            setStats(response.data);

        })
        .catch((error)=>{

            console.log(error);

        });



        // =========================
        // Risk Distribution
        // =========================

        api.get("/risk-distribution")
        .then((response)=>{


            setRiskData([

                {
                    name:"Low",
                    counties:response.data.low
                },

                {
                    name:"Medium",
                    counties:response.data.medium
                },

                {
                    name:"High",
                    counties:response.data.high
                }

            ]);


        })
        .catch((error)=>{

            console.log(error);

        });




        // =========================
        // State Risk
        // =========================

        api.get("/state-risk")
        .then((response)=>{


            console.log(
                "STATE RISK:",
                response.data
            );


            setStateRisk(response.data);


        })
        .catch((error)=>{

            console.log(error);

        });



    },[]);






    return (

        <div className="dashboard">


            <section className="hero">

                <h1>
                    CareGap Intelligence
                </h1>

                <p>
                    Healthcare Access & Vulnerability Analytics Across US Counties
                </p>


            </section>





            {

            stats ?


            <>

            {/* =========================
                Summary Cards
            ========================== */}

            <section className="stats-container">


                <StatCard

                    title="Total Counties"

                    value={
                        stats.total_counties
                    }

                />



                <StatCard

                    title="Average CareGap Score"

                    value={
                        stats.average_caregap_score
                        .toFixed(3)
                    }

                />



                <StatCard

                    title="High Risk Counties"

                    value={
                        stats.high_risk_count
                    }

                />


                <StatCard

                    title="States Covered"

                    value="50"

                />


            </section>






            {/* =========================
                Future USA MAP
            ========================== */}


            <section className="map-section">


                <h2>
                    United States CareGap Map
                </h2>


                <section className="map-section">


                <USMap />

                </section>


            </section>








            {/* =========================
                Top Counties
            ========================== */}



            <section>

                <TopCounties />

            </section>







            {/* =========================
                Risk Distribution
            ========================== */}


            <section className="chart-card">


                <h2>
                    County Risk Distribution
                </h2>



                <ResponsiveContainer

                    width="100%"

                    height={350}

                >


                    <BarChart

                        data={riskData}

                    >



                        <XAxis

                            dataKey="name"

                        />



                        <YAxis />



                        <Tooltip

                            contentStyle={{

                                backgroundColor:"#1e293b",

                                border:"none",

                                borderRadius:"10px",

                                color:"#fff"

                            }}

                        />



                        <Bar

                            dataKey="counties"

                            fill="#38bdf8"

                            radius={[8,8,0,0]}

                        >


                            <LabelList

                                dataKey="counties"

                                position="top"

                            />


                        </Bar>



                    </BarChart>


                </ResponsiveContainer>


            </section>









            {/* =========================
                State Risk
            ========================== */}



            <section className="chart-card">


                <h2>
                    State CareGap Risk
                </h2>




                <ResponsiveContainer

                    width="100%"

                    height={1250}

                >


                    <BarChart

                        data={stateRisk}

                        layout="vertical"

                    >



                        <XAxis

                            type="number"

                            domain={[0,1]}

                        />



                        <YAxis

                            dataKey="state"

                            type="category"

                            width={120}

                        />



                        <Tooltip />



                        <Bar

                            dataKey="score"

                            fill="#38bdf8"

                            radius={[0,8,8,0]}

                        >


                            <LabelList

                                dataKey="score"

                                position="right"

                                formatter={
                                    (value)=>
                                    value.toFixed(3)
                                }

                            />


                        </Bar>




                    </BarChart>


                </ResponsiveContainer>


            </section>





            </>



            :


            <h2>
                Loading...
            </h2>


            }



        </div>

    );

}


export default Dashboard;