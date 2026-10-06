import { useEffect, useState } from "react";

import api from "../api/client";

import StatCard from "../components/StatCard";
import TopCounties from "../components/TopCounties";
import USMap from "../components/USMap";

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


    useEffect(() => {


        // =========================
        // Dashboard Statistics
        // =========================

        api.get("/stats")
            .then((response) => {

                setStats(response.data);

            })
            .catch((error) => {

                console.error(
                    "Stats error:",
                    error
                );

            });



        // =========================
        // Risk Distribution
        // =========================

        api.get("/risk-distribution")
            .then((response) => {

                setRiskData([

                    {
                        name: "Low",
                        counties: response.data.low
                    },

                    {
                        name: "Medium",
                        counties: response.data.medium
                    },

                    {
                        name: "High",
                        counties: response.data.high
                    }

                ]);

            })
            .catch((error) => {

                console.error(
                    "Risk distribution error:",
                    error
                );

            });



        // =========================
        // State Risk
        // =========================

        api.get("/state-risk")
            .then((response) => {

                setStateRisk(response.data);

            })
            .catch((error) => {

                console.error(
                    "State risk error:",
                    error
                );

            });


    }, []);



    if (!stats){

        return (

            <main className="dashboard-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading CareGap Intelligence...
                </p>

            </main>

        );

    }



    return (

        <main className="dashboard">


            {/* =========================
                HEADER
            ========================== */}

            <section className="hero">


                <div className="hero-badge">
                    NATIONAL HEALTHCARE ANALYTICS
                </div>


                <h1>
                    CareGap Intelligence
                </h1>


                <p>
                    Healthcare access, vulnerability, and health
                    burden across 3,144 US counties.
                </p>


                <p className="hero-description">

                    Explore where healthcare gaps are greatest,
                    compare states, and investigate individual
                    counties using a composite CareGap Score.

                </p>


            </section>



            {/* =========================
                KPI CARDS
            ========================== */}

            <section className="stats-container">


                <StatCard
                    title="Counties Analyzed"
                    value={
                        stats.total_counties.toLocaleString()
                    }
                />


                <StatCard
                    title="States Covered"
                    value="50"
                />


                <StatCard
                    title="High Risk Counties"
                    value={
                        stats.high_risk_count
                    }
                />


                <StatCard
                    title="Average CareGap Score"
                    value={
                        stats.average_caregap_score.toFixed(3)
                    }
                />


            </section>



            {/* =========================
                MAP
            ========================== */}

            <section className="map-section">


                <div className="section-heading">

                    <div>

                        <h2>
                            United States CareGap Map
                        </h2>

                        <p>
                            Average CareGap Score by state
                        </p>

                    </div>


                    <div className="map-instruction">

                        Hover over a state to explore

                    </div>

                </div>


                <USMap />


            </section>



            {/* =========================
                CHARTS
            ========================== */}

            <section className="charts-grid">


                {/* Risk Distribution */}

                <div className="chart-card">


                    <div className="chart-heading">

                        <div>

                            <h2>
                                County Risk Distribution
                            </h2>

                            <p>
                                Number of counties by risk category
                            </p>

                        </div>

                    </div>


                    <ResponsiveContainer
                        width="100%"
                        height={330}
                    >

                        <BarChart
                            data={riskData}
                            margin={{
                                top: 25,
                                right: 20,
                                left: 0,
                                bottom: 10
                            }}
                        >

                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill:"#64748b"
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <YAxis
                                tick={{
                                    fill:"#64748b"
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <Tooltip
                                cursor={{
                                    fill:"#f1f5f9"
                                }}
                                contentStyle={{
                                    background:"#ffffff",
                                    border:"1px solid #e2e8f0",
                                    borderRadius:"10px",
                                    boxShadow:
                                        "0 10px 25px rgba(15,23,42,.10)"
                                }}
                            />


                            <Bar
                                dataKey="counties"
                                fill="#2563eb"
                                radius={[8,8,0,0]}
                            >

                                <LabelList
                                    dataKey="counties"
                                    position="top"
                                    fill="#475569"
                                />

                            </Bar>


                        </BarChart>

                    </ResponsiveContainer>


                </div>



                {/* State Risk */}

                <div className="chart-card">


                    <div className="chart-heading">

                        <div>

                            <h2>
                                Highest Average State Risk
                            </h2>

                            <p>
                                States with the highest average CareGap Score
                            </p>

                        </div>

                    </div>


                    <ResponsiveContainer
                        width="100%"
                        height={420}
                    >

                        <BarChart
                            data={stateRisk
                                .slice(0,10)
                            }
                            layout="vertical"
                            margin={{
                                top: 10,
                                right: 50,
                                left: 10,
                                bottom: 10
                            }}
                        >


                            <XAxis
                                type="number"
                                domain={[0,1]}
                                tick={{
                                    fill:"#64748b"
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <YAxis
                                dataKey="state"
                                type="category"
                                width={105}
                                tick={{
                                    fill:"#475569",
                                    fontSize:13
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <Tooltip
                                contentStyle={{
                                    background:"#ffffff",
                                    border:"1px solid #e2e8f0",
                                    borderRadius:"10px",
                                    boxShadow:
                                        "0 10px 25px rgba(15,23,42,.10)"
                                }}
                            />


                            <Bar
                                dataKey="score"
                                fill="#ef4444"
                                radius={[0,8,8,0]}
                            >

                                <LabelList
                                    dataKey="score"
                                    position="right"
                                    fill="#475569"
                                    formatter={(value) =>
                                        Number(value).toFixed(3)
                                    }
                                />

                            </Bar>


                        </BarChart>

                    </ResponsiveContainer>


                </div>


            </section>



            {/* =========================
                TOP COUNTIES
            ========================== */}

            <section className="top-counties-section">


                <div className="section-heading">

                    <div>

                        <h2>
                            Highest CareGap Counties
                        </h2>

                        <p>
                            Counties with the largest estimated healthcare gaps
                        </p>

                    </div>

                </div>


                <TopCounties />


            </section>



            {/* =========================
                METHODOLOGY NOTE
            ========================== */}

            <section className="methodology-card">


                <div className="methodology-icon">
                </div>


                <div>

                    <h3>
                        How to interpret the CareGap Score
                    </h3>


                    <p>

                        A higher CareGap Score indicates a larger
                        estimated healthcare gap in this analysis.
                        The score combines socioeconomic conditions,
                        health burden, social vulnerability, and
                        healthcare access indicators.

                    </p>


                </div>


            </section>


        </main>

    );

}


export default Dashboard;