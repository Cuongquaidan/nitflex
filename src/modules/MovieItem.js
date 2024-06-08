import React, { useEffect, useRef, useState } from "react";

import background from "../images/sunrise-1590214_1280.jpg";
import axios from "axios";
import { Tooltip } from "react-tooltip";
const MovieItem = ({ item, ...props }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisLiked, setIsDisLiked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://phimapi.com/phim/${item?.slug}`
                );
                setData(response.data.movie);
            } catch (error) {
                console.log(error);
            }
        };
        if (item) {
            fetchData();
        }
    }, [item]);
    const movieItemWrapperRef = useRef();
    const movieItemRef = useRef();
    const movieItemDetailsRef = useRef();
    const likeRef = useRef();
    const dislikeRef = useRef();
    const favoriteRef = useRef();
    useEffect(() => {
        const favoriteClick = () => setIsFavorite((prev) => !prev);
        const likeClick = () => {
            setIsLiked((prev) => !prev);
            if (!isLiked) {
                setIsDisLiked(false);
            }
        };
        const dislikeClick = () => {
            setIsDisLiked((prev) => !prev);
            if (!isDisLiked) {
                setIsLiked(false);
            }
        };

        favoriteRef.current.addEventListener("click", favoriteClick);
        likeRef.current.addEventListener("click", likeClick);
        dislikeRef.current.addEventListener("click", dislikeClick);

        return () => {
            favoriteRef.current.removeEventListener("click", favoriteClick);
            likeRef.current.removeEventListener("click", likeClick);
            dislikeRef.current.removeEventListener("click", dislikeClick);
        };
    }, [isDisLiked, isFavorite, isLiked]);

    useEffect(() => {
        const infoItem = movieItemRef.current.getBoundingClientRect();
        function handleMouseEnter() {
            movieItemRef.current.style.display = "none";
            movieItemDetailsRef.current.style.display = "flex";
            const widthScreen = window.innerWidth;
            const { left, right, top, bottom, width, height } =
                movieItemDetailsRef?.current?.getBoundingClientRect();
            console.log(infoItem);
            movieItemDetailsRef.current.style.opacity = 1;
            movieItemDetailsRef.current.style.visibility = "visible";
            movieItemDetailsRef.current.style.top =
                -(height - infoItem?.height) / 2 + "px";
            if (left < 0) {
                movieItemDetailsRef.current.style.left = "-30px";
                movieItemDetailsRef.current.style.top =
                    -(height - infoItem.height) / 2 + "px";
            } else if (right > widthScreen) {
                movieItemDetailsRef.current.style.right = "10px";
                movieItemDetailsRef.current.style.top =
                    -(height - infoItem?.height) / 2 + "px";
            } else {
                movieItemDetailsRef.current.style.left =
                    -(width - infoItem.width) / 2 + "px";
                movieItemDetailsRef.current.style.top =
                    -(height - infoItem?.height) / 2 + "px";
            }
        }
        function handleMouseLeave() {
            movieItemRef.current.style.display = "block";
            movieItemDetailsRef.current.style.display = "none";
        }
        movieItemWrapperRef.current.addEventListener(
            "mouseenter",
            handleMouseEnter
        );
        movieItemWrapperRef.current.addEventListener(
            "mouseleave",
            handleMouseLeave
        );
    }, []);
    console.log(item);

    return (
        <div
            className="bg-black w-[290px]  flex-shrink-0 cursor-pointer movie-item transition-all"
            data-id={item._id}
        >
            <div
                className="w-[290px] h-[160px] relative"
                ref={movieItemWrapperRef}
            >
                <img
                    src={
                        item.thumb_url.includes("https://img.phimapi.com/")
                            ? item.thumb_url
                            : `https://img.phimapi.com/${item.thumb_url}`
                    }
                    alt="Chưa cập nhật"
                    className="w-[290px] h-[160px] object-cover absolute top-0 left-0 z-10"
                    style={{ display: "block" }}
                    ref={movieItemRef}
                />
                <div
                    className=" w-[400px] h-[400px] bg-black flex-col absolute z-50 opacity-0 invisible  "
                    style={{ display: "none" }}
                    ref={movieItemDetailsRef}
                >
                    <img
                        src={
                            item.thumb_url.includes("https://img.phimapi.com/")
                                ? item.thumb_url
                                : `https://img.phimapi.com/${item.thumb_url}`
                        }
                        alt="Chưa cập nhật"
                        className="w-[400px] h-[200px] object-cover flex-shrink"
                    />
                    <div className="flex items-center justify-between gap-2 p-4 bg-black">
                        <div className="flex gap-3">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-10 h-10 play"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <Tooltip anchorSelect=".play">Chơi nó</Tooltip>
                            </div>
                            <div className="flex gap-2" ref={favoriteRef}>
                                {!isFavorite ? (
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-10 h-10 favorite"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <Tooltip
                                            anchorSelect=".favorite"
                                            place="top"
                                        >
                                            Thêm vào danh sách yêu thích
                                        </Tooltip>
                                    </div>
                                ) : (
                                    <div>
                                        {" "}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-10 h-10 unfavorite"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <Tooltip
                                            anchorSelect=".unfavorite"
                                            place="top"
                                        >
                                            Đã thêm vào danh sách yêu thích
                                        </Tooltip>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <div ref={likeRef}>
                                    {!isLiked ? (
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-10 h-10 like"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                                />
                                            </svg>
                                            <Tooltip
                                                anchorSelect=".like"
                                                place="top"
                                            >
                                                Like it?
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-10 h-10 liked"
                                            >
                                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                            </svg>
                                            <Tooltip
                                                anchorSelect=".liked"
                                                place="top"
                                            >
                                                Liked!!!
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                                <div ref={dislikeRef}>
                                    {!isDisLiked ? (
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-10 h-10 dislike"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                                />
                                            </svg>
                                            <Tooltip
                                                anchorSelect=".dislike"
                                                place="top"
                                            >
                                                Dislike????
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-10 h-10 disliked"
                                            >
                                                <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                                            </svg>
                                            <Tooltip
                                                anchorSelect=".disliked"
                                                place="top"
                                            >
                                                Disliked
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-10 h-10 p-3 border border-white rounded-full"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="p-4">
                        <h2>{item.name}</h2>
                        <p>Trạng thái: {item.episode_current || "Chưa rõ"}</p>
                        <p>
                            Quantity:{" "}
                            {item.quantity ? item.quantity : "Trung bình"}
                        </p>
                        <p>Năm sản xuất: {item.year || "Không rõ"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;
