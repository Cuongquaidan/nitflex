import React from "react";
import Heading from "./Heading";
import MovieItem from "./MovieItem";

const MovieHomeDirec = ({ data, heading, ...props }) => {
    return (
        <div className="w-full p-10 mx-auto overflow-x-hidden">
            <Heading>{heading}</Heading>
            <div className=" grid gap-10 mt-5 z-[1] grid-cols-5 mx-auto">
                {data.map((item) => (
                    <MovieItem key={item._id} item={item}></MovieItem>
                ))}
            </div>
        </div>
    );
};

export default MovieHomeDirec;
