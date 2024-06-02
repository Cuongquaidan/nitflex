import React from "react";
import Navbar from "../layouts/Navbar";
import background from "../images/sunrise-1590214_1280.jpg";
const HomePage = () => {
    return (
        <div className="min-h-[2000px] bg-gray-800">
            <Navbar></Navbar>
            <header
                className="w-full min-h-screen "
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="relative z-10 w-full min-h-screen">
                    <div
                        className="absolute top-[30%] left-[100px] z-[1] text-white text-[60px] font-bold max-w-[40%]"
                        style={{ textShadow: "0 0 5px black" }}
                    >
                        <h2>Something good yeah!!</h2>
                        <p className="text-xl">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Ab itaque eos, doloribus inventore vero
                            tenetur nam? Omnis, unde veritatis! Quod nemo nam
                            autem iure similique beatae dicta ducimus unde
                            nostrum.
                        </p>
                        <div className="flex gap-5 mt-5">
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
                            <button
                                className="flex items-center px-4 py-2 text-3xl border border-gray-600 rounded-lg btn"
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
            </header>
        </div>
    );
};

export default HomePage;