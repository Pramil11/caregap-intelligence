import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StateExplorer from "./pages/StateExplorer";


function App(){

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />


                <Route
                    path="/state/:stateName"
                    element={<StateExplorer />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;