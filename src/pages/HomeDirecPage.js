import React from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router";
import MovieHomeDirec from "../modules/MovieHomeDirec";

const HomeDirecPage = ({ ...props }) => {
    const { slug } = useParams();
    console.log(slug);
    let phims = useAxios(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${slug}`,
        true
    );
    console.log(slug, phims);

    // Chuyển slug thành chữ in hoa
    const heading = slug.toUpperCase();

    return (
        <div className="p-5 ">
            {phims && (
                <MovieHomeDirec data={phims} heading={heading}></MovieHomeDirec>
            )}
        </div>
    );
};

export default HomeDirecPage;
