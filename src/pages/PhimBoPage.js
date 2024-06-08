import React, { useEffect, useState } from "react";
import useAxiosGetParams from "../hooks/useAxiosGetParams";
import MovieGenres from "../modules/MovieGenres";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PhimBoPage = () => {
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const phimBo = useAxiosGetParams(
        `https://phimapi.com/v1/api/danh-sach/phim-bo?page=${page}&limit=${limit}`,
        true
    );

    useEffect(() => {
        if (phimBo) {
            setIsLoading(false); // Set loading to false when data is available
        }
    }, [phimBo]);
    return isLoading ? (
        <div>
            <Skeleton
                containerClassName="flex gap-10 h-[160px] w-full  mx-auto mt-10 "
                className="custom-skeleton"
                count={5}
            ></Skeleton>
            <Skeleton
                className="custom-skeleton"
                containerClassName="flex gap-10 h-[160px] w-full mx-auto mt-10 "
                count={5}
            ></Skeleton>
        </div>
    ) : (
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
