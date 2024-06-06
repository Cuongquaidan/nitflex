import React, { useState } from "react";
import useAxiosGetParams from "../hooks/useAxiosGetParams";
import MovieGenres from "../modules/MovieGenres";

const HoatHinhPage = () => {
    let [limit, setLimit] = useState(20);
    let [page, setPage] = useState(1);
    let hoatHinh = useAxiosGetParams(
        `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}&limit=${limit}`,
        true
    );

    return (
        <div className="p-5 ">
            {hoatHinh && (
                <MovieGenres
                    data={hoatHinh}
                    heading={"Hoạt hình"}
                    setLimit={setLimit}
                    setPage={setPage}
                    page={page}
                    limit={limit}
                ></MovieGenres>
            )}
        </div>
    );
};

export default HoatHinhPage;
