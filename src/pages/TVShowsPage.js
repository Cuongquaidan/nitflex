import React, { useState } from "react";
import useAxiosGetParams from "../hooks/useAxiosGetParams";
import MovieGenres from "../modules/MovieGenres";

const TVShowsPage = () => {
    let [limit, setLimit] = useState(20);
    let [page, setPage] = useState(1);
    let tVShows = useAxiosGetParams(
        `https://phimapi.com/v1/api/danh-sach/tv-shows?page=${page}&limit=${limit}`,
        true
    );

    return (
        <div className="p-5 ">
            {tVShows && (
                <MovieGenres
                    data={tVShows}
                    heading={"TV shows"}
                    setLimit={setLimit}
                    setPage={setPage}
                    page={page}
                    limit={limit}
                ></MovieGenres>
            )}
        </div>
    );
};

export default TVShowsPage;
