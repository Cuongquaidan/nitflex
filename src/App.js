import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import StartPage from "./pages/StartPage";
import CreatePassword from "./pages/CreatePassword";
import PlanformPage from "./pages/PlanformPage";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage></StartPage>}></Route>
                <Route
                    path="/sign-up/createPassword"
                    element={<CreatePassword></CreatePassword>}
                ></Route>
                <Route
                    path="/sign-up/planform"
                    element={<PlanformPage></PlanformPage>}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
