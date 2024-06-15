import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import FooterInPageMovies from "../layouts/FooterInPageMovies";
import useAxiosGetParams from "../hooks/useAxiosGetParams";
import ReactPlayer from "react-player";
import Rate from "rc-rate";
const MovieDetailsPage = () => {
    const location = useLocation();
    const [stars, setStars] = useState(0.0);
    const slug = location.pathname.substring(
        0,
        location.pathname.indexOf("/tap") + 1
    );
    const tapLocation = location.pathname.substring(
        location.pathname.indexOf("/tap") + 5
    );
    const navigate = useNavigate();
    const data = useAxiosGetParams(`https://phimapi.com${slug}`, false);
    const [tap, setTap] = useState(parseInt(tapLocation) - 1);
    const phim = data?.episodes?.[0]?.server_data?.[tap]?.link_embed;
    const url = phim?.substring(phim?.indexOf("=") + 1, phim?.length);
    console.log(url);
    useEffect(() => {
        // Cập nhật URL khi tap thay đổi
        navigate(`${slug}tap-${tap + 1}`);
    }, [tap, slug, navigate]);

    function handleNext() {
        setTap((prevTap) =>
            Math.min(prevTap + 1, data.episodes[0].server_data.length - 1)
        );
    }

    function handlePre() {
        setTap((prevTap) => Math.max(prevTap - 1, 0));
    }

    function handleSetTap(index) {
        setTap(index);
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />

            {data && (
                <div className="p-[150px] mx-auto">
                    <div>
                        <h2 className="text-3xl">{data.movie.name}</h2>
                    </div>
                    <div className="w-[100%] py-10">
                        {phim ? (
                            <ReactPlayer
                                url={url}
                                controls
                                width="100%"
                                height="auto"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <p className="text-white">Video không khả dụng</p>
                        )}
                    </div>
                    <div className="flex justify-center gap-10">
                        <button
                            onClick={handlePre}
                            className="w-[300px] p-4 cursor-pointer text-white bg-pink-700 text-4xl font-medium block rounded-lg"
                        >
                            Tập trước
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-[300px] p-4 cursor-pointer text-white bg-pink-700 text-4xl font-medium block rounded-lg"
                        >
                            Tập sau
                        </button>
                    </div>
                    <div className="flex gap-4 mt-20 max-w-[100%]">
                        {data.episodes[0].server_data.map((item, index) => (
                            <div
                                className={`p-3 border-gray-400 border rounded-lg min-w-[40px] text-center cursor-pointer ${
                                    index === tap
                                        ? "bg-pink-700"
                                        : "bg-gray-800"
                                }`}
                                key={index}
                                onClick={() => {
                                    handleSetTap(index);
                                }}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <div className="min-h-[200px] bg-gray-800 border rounded-lg border-white mt-10"></div>
                    <form className="p-4 mt-10 text-xl bg-gray-800 border rounded-lg">
                        <div>
                            <h3>Đánh giá</h3>
                            <Rate
                                allowHalf={true}
                                count={5}
                                value={stars}
                                onChange={setStars}
                                style={{
                                    margin: "16px 0 0 0",
                                    display: "flex",
                                    fontSize: "30px",
                                    color: "#ffd700",
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="mt-4">Nhận xét</h3>
                            <div>
                                <textarea
                                    name="comment"
                                    id="comment"
                                    className="w-full mt-4 min-h-[200px] p-4 bg-zinc-800"
                                ></textarea>
                            </div>
                        </div>
                        <button className="block p-2 mt-4 ml-auto border border-white rounded-2xl w-[100px] bg-blue-900">
                            Gửi
                        </button>
                    </form>
                </div>
            )}
            <FooterInPageMovies />
        </div>
    );
};

export default MovieDetailsPage;
