import React from "react";
import useAxios from "../hooks/useAxios";
import MovieHomeDirec from "../modules/MovieHomeDirec";

const PhimMoiPage = () => {
    let phims = useAxios(
        `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1`
    );
    return (
        <div className="p-5 ">
            {phims && (
                <MovieHomeDirec
                    data={phims}
                    heading={"Phim mới"}
                ></MovieHomeDirec>
            )}
        </div>
    );
};

export default PhimMoiPage;
