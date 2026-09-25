import { useEffect, useState } from "react";
import api from "../api/client";


function TopCounties(){

    const [counties,setCounties] = useState([]);


    useEffect(()=>{

        api.get("/top-counties")
        .then((response)=>{
            setCounties(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });

    },[]);



    return (

        <div className="table-container">

            <h2>
                Highest CareGap Counties
            </h2>


            <table>

                <thead>

                    <tr>
                        <th>Rank</th>
                        <th>County</th>
                        <th>State</th>
                        <th>Score</th>
                    </tr>

                </thead>


                <tbody>

                    {
                        counties.map((county)=>(

                            <tr key={county.county_fips}>

                                <td>
                                    {county.caregap_rank_final}
                                </td>


                                <td>
                                    {county.county_name}
                                </td>


                                <td>
                                    {county.state_name}
                                </td>


                                <td>
                                    {county.caregap_score_final.toFixed(3)}
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>


        </div>

    );

}


export default TopCounties;