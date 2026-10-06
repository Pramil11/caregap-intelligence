import {
    BrowserRouter,
    Routes,
    Route,
    NavLink
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StateExplorer from "./pages/StateExplorer";
import UnderstandingCareGap from "./pages/UnderstandingCareGap";


function Navigation(){

    return (

        <nav className="site-nav">

            <div className="nav-inner">


                <NavLink
                    to="/"
                    className="brand"
                >

                    <span className="brand-mark">
                        CG
                    </span>

                    <span>
                        CareGap Intelligence
                    </span>

                </NavLink>



                <div className="nav-links">


                    <NavLink
                        to="/"
                        end
                        className="nav-link"
                    >
                        Dashboard
                    </NavLink>


                    <NavLink
                        to="/understanding-caregap"
                        className="nav-link"
                    >
                        Understanding CareGap
                    </NavLink>


                </div>


            </div>

        </nav>

    );

}



function App(){

    return (

        <BrowserRouter>

            <Navigation />


            <Routes>

                <Route
                    path="/"
                    element={
                        <Dashboard />
                    }
                />


                <Route
                    path="/state/:stateName"
                    element={
                        <StateExplorer />
                    }
                />


                <Route
                    path="/understanding-caregap"
                    element={
                        <UnderstandingCareGap />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;