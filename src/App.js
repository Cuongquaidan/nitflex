import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import StartPage from "./pages/StartPage";
import CreatePassword from "./pages/CreatePassword";
import PlanformPage from "./pages/PlanformPage";
import LayoutPage from "./layouts/LayoutPage";
import HomePage from "./pages/HomePage";
import PhimLePage from "./pages/PhimLePage";
import PhimBoPage from "./pages/PhimBoPage";
import TVShowsPage from "./pages/TVShowsPage";
import HoatHinhPage from "./pages/HoatHinhPage";
import HomeDirecPage from "./pages/HomeDirecPage";
import PhimMoiPage from "./pages/PhimMoiPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import DanhSachYeuThichPage from "./pages/DanhSachYeuThichPage";
import SignInPage from "./pages/SignInPage";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/sign-in"
                    element={<SignInPage></SignInPage>}
                ></Route>
                <Route
                    path="/start-page"
                    element={<StartPage></StartPage>}
                ></Route>
                <Route
                    path="/sign-up/createPassword"
                    element={<CreatePassword></CreatePassword>}
                ></Route>
                <Route
                    path="/planform"
                    element={<PlanformPage></PlanformPage>}
                ></Route>
                <Route path="/" element={<LayoutPage></LayoutPage>}>
                    <Route path="/home" element={<HomePage></HomePage>}></Route>
                    <Route
                        path="/genres/phim-le"
                        element={<PhimLePage></PhimLePage>}
                    ></Route>
                    <Route
                        path="/genres/phim-bo"
                        element={<PhimBoPage></PhimBoPage>}
                    ></Route>
                    <Route
                        path="/genres/tv-shows"
                        element={<TVShowsPage></TVShowsPage>}
                    ></Route>
                    <Route
                        path="/genres/hoat-hinh"
                        element={<HoatHinhPage></HoatHinhPage>}
                    ></Route>
                    <Route
                        path="/genres/phim-moi"
                        element={<PhimMoiPage></PhimMoiPage>}
                    ></Route>
                    <Route
                        path="/genres/:slug"
                        element={<HomeDirecPage></HomeDirecPage>}
                    ></Route>
                    <Route
                        path="/danh-sach-yeu-thich"
                        element={<DanhSachYeuThichPage></DanhSachYeuThichPage>}
                    ></Route>
                </Route>
                <Route
                    path="/phim/:slug/:tap"
                    element={<MovieDetailsPage></MovieDetailsPage>}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
