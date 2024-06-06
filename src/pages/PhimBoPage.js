import React, { useState } from "react";
import useAxiosGetParams from "../hooks/useAxiosGetParams";
import MovieGenres from "../modules/MovieGenres";

const PhimBoPage = () => {
    let [limit, setLimit] = useState(20);
    let [page, setPage] = useState(1);
    let phimBo = useAxiosGetParams(
        `https://phimapi.com/v1/api/danh-sach/phim-bo?page=${page}&limit=${limit}`,
        true
    );

    return (
        <div className="p-5 ">
            {phimBo && (
                <MovieGenres
                    data={phimBo}
                    heading={"Phim bộ"}
                    setLimit={setLimit}
                    setPage={setPage}
                    page={page}
                    limit={limit}
                ></MovieGenres>
            )}
        </div>
    );
};

export default PhimBoPage;
