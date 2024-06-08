import React, { useEffect, useState } from "react";
import useAxiosGetParams from "../hooks/useAxiosGetParams";
import MovieGenres from "../modules/MovieGenres";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const HoatHinhPage = () => {
    let [limit, setLimit] = useState(20);
    let [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    let hoatHinh = useAxiosGetParams(
        `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}&limit=${limit}`,
        true
    );
    useEffect(() => {
        if (hoatHinh) {
            setIsLoading(false);
        }
    }, [hoatHinh]);
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
