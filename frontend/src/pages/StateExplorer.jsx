import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StateCountyMap from "../components/StateCountyMap";
import api from "../api/client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList
} from "recharts";


function StateExplorer(){

    const { stateName } = useParams();

    const [summary, setSummary] = useState(null);

    const [counties, setCounties] = useState([]);

    const [error, setError] = useState(null);



    useEffect(() => {

        Promise.all([

            api.get(
                `/state/${encodeURIComponent(stateName)}`
            ),

            api.get(
                `/state/${encodeURIComponent(stateName)}/counties`
            )

        ])

        .then(([summaryResponse, countiesResponse]) => {

            setSummary(
                summaryResponse.data
            );

            setCounties(
                countiesResponse.data
            );

        })

        .catch((error) => {

            console.log(error);

            setError(
                "Unable to load state data."
            );

        });

    }, [stateName]);



    /*
        Loading state

        summary is null while the API
        request is being completed.
    */

    if(!summary && !error){

        return (

            <div className="dashboard">

                <h2>
                    Loading state analysis...
                </h2>

            </div>

        );

    }



    /*
        Error state
    */

    if(error){

        return (

            <div className="dashboard">

                <h2>
                    {error}
                </h2>

                <Link to="/">
                    ← Return to National Dashboard
                </Link>

            </div>

        );

    }



    /*
        Top 10 counties for chart
    */

    const chartData = counties

        .slice(0, 10)

        .map((county) => ({

            name: county.county_name
                .replace(
                    `, ${summary.state}`,
                    ""
                ),

            score: county.caregap_score

        }));



    return (

        <div className="dashboard">


            {/* =========================
                State Header
            ========================== */}

            <section className="state-header">


                <Link
                    to="/"
                    className="back-link"
                >
                    ← National Dashboard
                </Link>



                <h1>
                    {summary.state}
                </h1>


                <p>
                    State Healthcare Gap Analysis
                </p>


            </section>





            {/* =========================
                Summary Cards
            ========================== */}

            <section className="stats-container">


                <div className="stat-card">

                    <h3>
                        Counties
                    </h3>

                    <p>
                        {summary.total_counties}
                    </p>

                </div>



                <div className="stat-card">

                    <h3>
                        Average CareGap Score
                    </h3>

                    <p>
                        {
                            summary
                                .average_caregap_score
                                .toFixed(3)
                        }
                    </p>

                </div>



                <div className="stat-card">

                    <h3>
                        High Risk Counties
                    </h3>

                    <p>
                        {summary.high_risk_counties}
                    </p>

                </div>



                <div className="stat-card">

                    <h3>
                        Population
                    </h3>

                    <p>
                        {
                            summary.population
                                .toLocaleString()
                        }
                    </p>

                </div>


            </section>



            <section className="map-section">

                <h2>
                    {summary.state} County CareGap Map
                </h2>

                <p className="chart-subtitle">

                    Explore CareGap scores across counties
                    in {summary.state}.

                </p>

                <StateCountyMap
                    stateName={summary.state}
                />

            </section>

            {/* =========================
                Highest Risk County
            ========================== */}

            <section className="highlight-card">


                <div>

                    <span>
                        Highest CareGap County
                    </span>


                    <h2>
                        {summary.highest_risk_county}
                    </h2>

                </div>



                <div className="highlight-score">

                    <span>
                        CareGap Score
                    </span>


                    <strong>
                        {
                            summary.highest_risk_score
                                .toFixed(3)
                        }
                    </strong>

                </div>


            </section>





            {/* =========================
                Top County Chart
            ========================== */}

            <section className="chart-card">


                <h2>
                    Top 10 Counties by CareGap Score
                </h2>


                <p className="chart-subtitle">

                    Counties with the highest estimated
                    healthcare gaps in {summary.state}.

                </p>



                <ResponsiveContainer
                    width="100%"
                    height={450}
                >


                    <BarChart

                        data={chartData}

                        layout="vertical"

                        margin={{
                            top: 10,
                            right: 60,
                            left: 20,
                            bottom: 10
                        }}

                    >


                        <XAxis
                            type="number"
                            domain={[0, 1]}
                        />


                        <YAxis
                            type="category"
                            dataKey="name"
                            width={150}
                        />


                        <Tooltip />


                        <Bar

                            dataKey="score"

                            fill="#2563eb"

                            radius={[
                                0,
                                8,
                                8,
                                0
                            ]}

                        >

                            <LabelList

                                dataKey="score"

                                position="right"

                                formatter={
                                    (value) =>
                                        Number(value)
                                            .toFixed(3)
                                }

                            />

                        </Bar>


                    </BarChart>


                </ResponsiveContainer>


            </section>





            {/* =========================
                All Counties
            ========================== */}

            <section className="table-container">


                <h2>
                    All Counties in {summary.state}
                </h2>



                <div className="table-wrapper">


                    <table>


                        <thead>

                            <tr>

                                <th>
                                    Rank
                                </th>

                                <th>
                                    County
                                </th>

                                <th>
                                    CareGap Score
                                </th>

                                <th>
                                    Population
                                </th>

                                <th>
                                    Poverty
                                </th>

                                <th>
                                    Health Burden
                                </th>

                                <th>
                                    Healthcare Access
                                </th>

                            </tr>

                        </thead>



                        <tbody>


                            {
                                counties.map(
                                    (county, index) => (

                                        <tr
                                            key={
                                                county.county_fips
                                            }
                                        >

                                            <td>
                                                {index + 1}
                                            </td>


                                            <td>
                                                {county.county_name}
                                            </td>


                                            <td>

                                                <strong>

                                                    {
                                                        county
                                                            .caregap_score
                                                            .toFixed(3)
                                                    }

                                                </strong>

                                            </td>


                                            <td>

                                                {
                                                    county.population
                                                        ?.toLocaleString()
                                                }

                                            </td>


                                            <td>

                                                {
                                                    county.poverty_rate
                                                }%

                                            </td>


                                            <td>

                                                {
                                                    county
                                                        .health_burden_score
                                                        ?.toFixed(3)
                                                }

                                            </td>


                                            <td>

                                                {
                                                    county
                                                        .healthcare_access_score
                                                        ?.toFixed(3)
                                                }

                                            </td>


                                        </tr>

                                    )
                                )
                            }


                        </tbody>


                    </table>


                </div>


            </section>


        </div>

    );

}


export default StateExplorer;