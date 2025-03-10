import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import background from "../images/sunrise-1590214_1280.jpg";
import FooterInPageMovies from "./FooterInPageMovies";
import { Outlet, useLocation } from "react-router";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import ReactPlayer from "react-player";
import { NavLink } from "react-router-dom";
import { auth, db } from "../firebase/firebase-config2";
import { ButtonRed } from "../components/buttons";
import AuthContext from "../contexts/AuthContext";
const LayoutPage = () => {
    let location = useLocation();

    const [phim, setPhim] = useState(null);
    const key = location.pathname.substring(
        location.pathname.indexOf("/genres") + "/genres".length + 1
    );
    const phimMoi = useAxios(
        `https://phimapi.com/v1/api/danh-sach/tv-shows`,
        true
    );
    const phimGenres =
        useAxios(
            `https://phimapi.com/v1/api/danh-sach/${
                ["phim-le", "phim-bo", "tv-shows", "hoat-hinh"].includes(key)
                    ? key
                    : "phim-le"
            }`,
            true
        ) || null;

    useEffect(() => {
        if (location.pathname.includes("/genres")) {
            const randomIndex =
                phimGenres && phimGenres.length > 0
                    ? Math.floor(Math.random() * phimGenres.length)
                    : 0;
            const phimRD =
                phimGenres && phimGenres.length > 0
                    ? phimGenres[randomIndex]
                    : null;
            setPhim(phimRD);
        } else {
            const randomIndex =
                phimMoi && phimMoi.length > 0
                    ? Math.floor(Math.random() * phimMoi.length)
                    : 0;
            const phimRD =
                phimMoi && phimMoi.length > 0 ? phimMoi[randomIndex] : null;
            setPhim(phimRD);
        }
    }, [phimGenres, phimMoi, location.pathname, key]);

    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://phimapi.com/phim/${phim?.slug}`
                );
                setData(response.data.movie);
            } catch (error) {
                console.log(error);
            }
        };
        if (phim) {
            fetchData();
        }
    }, [phim]);
    const currentUser = useContext(AuthContext);
    console.log(currentUser);
    return currentUser ? (
        <div className="bg-gray-900">
            <Navbar
                userName={currentUser.displayName || currentUser.email}
                imgUrl={
                    currentUser.photoURL ||
                    "https://toigingiuvedep.vn/wp-content/uploads/2021/04/hinh-nen-may-tinh-de-thuong-dep-nhat.jpg"
                }
            ></Navbar>
            <header
                className="relative w-full md:min-h-screen min-h-[50vh]"
                style={{
                    backgroundImage: `url(${
                        phim
                            ? phim.thumb_url.includes(
                                  "https://img.phimapi.com/"
                              )
                                ? phim.thumb_url
                                : `https://img.phimapi.com/${phim.thumb_url}`
                            : background
                    })`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="z-10 w-full min-h-[100%] bg-black bg-opacity-50 ">
                    <div
                        className="absolute top-[30%] md:left-[100px] left-5 z-[1] text-white backdrop-blur p-4 xl:text-[60px] md:text-[30px] text-[20px] font-bold max-w-[40%]"
                        style={{ textShadow: "0 0 5px black" }}
                    >
                        <h2>{phim ? phim.name : "Không có"}</h2>
                        <p className="hidden text-xl md:block">
                            {data
                                ? data.content
                                : "Lorem ipsum dolor sit, amet consectetur mot hai ba bon"}
                        </p>
                        <div className="flex gap-5 mt-5">
                            <NavLink to={`phim/${phim?.slug}/tap-1`}>
                                <button className="flex items-center gap-3 px-6 py-3 text-3xl text-black bg-white rounded-lg btn">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-10 h-10"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Phát
                                </button>
                            </NavLink>
                            <button
                                className="items-center hidden px-4 py-2 text-3xl border border-gray-600 rounded-lg xl:flex btn"
                                style={{
                                    background:
                                        "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%)",
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                                Thông tin khác
                            </button>
                        </div>
                    </div>
                </div>
                {/* {data?.trailer_url && (
                    <div className="absolute left-0 z-0 mt-5 top-10 ">
                        <ReactPlayer
                            url={data.trailer_url}
                            controls
                            width="99vw"
                            style={{
                                minHeight: "100%",
                                objectFit: "cover",
                            }}
                            loop={true}
                            playing={true}
                            muted={true}
                        />
                    </div>
                )} */}
            </header>
            <div className="relative">
                <Outlet />
            </div>
            <FooterInPageMovies />
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center min-h-screen gap-10 bg-black">
            <p className="text-4xl font-medium">Vui lòng đăng nhập</p>
            <ButtonRed
                padding={"20px"}
                width={"300px"}
                height={"100px"}
                textSize={"40px"}
                onClick={() => {}}
            >
                <NavLink to="/sign-in">Sign in</NavLink>
            </ButtonRed>
        </div>
    );
};

export default LayoutPage;
