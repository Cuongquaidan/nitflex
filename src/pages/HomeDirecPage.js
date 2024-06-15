import React from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router";
import MovieHomeDirec from "../modules/MovieHomeDirec";
import { NavLink } from "react-router-dom";

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
        <div className="p-10">
            {phims && phims.length > 0 ? (
                <MovieHomeDirec data={phims} heading={heading}></MovieHomeDirec>
            ) : (
                <div className="mt-20 text-5xl text-center">
                    <p>Không tìm thấy!!!!!!</p>
                    <NavLink
                        to="/home"
                        style={{
                            fontSize: "16px",
                            textDecoration: "underline",
                            background: "pink",
                            padding: "10px",
                            borderRadius: "10px",
                            backgroundColor: "rgb(190,24,93)",
                        }}
                    >
                        Về trang chủ
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default HomeDirecPage;
