import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import MovieGenres from "../modules/MovieGenres";
import useAxiosGetParams from "../hooks/useAxiosGetParams";

const PhimLePage = () => {
    let [limit, setLimit] = useState(20);
    let [page, setPage] = useState(1);
    let phimLe = useAxiosGetParams(
        `https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}&limit=${limit}`,
        true
    );

    return (
        <div className="p-5 ">
            {phimLe && (
                <MovieGenres
                    data={phimLe}
                    heading={"Phim lẻ"}
                    setLimit={setLimit}
                    setPage={setPage}
                    page={page}
                    limit={limit}
                ></MovieGenres>
            )}
        </div>
    );
};

export default PhimLePage;
