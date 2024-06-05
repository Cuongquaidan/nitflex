import React from "react";
import Heading from "./Heading";
import MovieItem from "./MovieItem";

const MovieList = ({ heading, data, ...props }) => {
    return (
        <div className="w-full p-10 mt-5 overflow-x-hidden">
            <Heading>{heading}</Heading>
            <div className="relative flex gap-3 mt-5 z-[1]">
                <button className="absolute top-[0%] left-[-40px] z-10 h-full bg-[rgba(0,0,0,0.5)] ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-12 h-12 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>

                {data.map((item) => (
                    <MovieItem key={item._id} item={item}></MovieItem>
                ))}

                <button className=" absolute top-[0%] right-[-40px] z-10 bg-[rgba(0,0,0,0.5)] h-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-12 h-12"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MovieList;
