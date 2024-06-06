import React from "react";
import MovieList from "../modules/MovieList";
import useAxios from "../hooks/useAxios";

const HomePage = () => {
    const phimMoi = useAxios(
        "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1"
    );
    const anime = useAxios(
        "https://phimapi.com/v1/api/tim-kiem?keyword=Anime",
        true
    );
    const USA = useAxios(
        "https://phimapi.com/v1/api/tim-kiem?keyword=USA",
        true
    );
    const Korea = useAxios(
        "https://phimapi.com/v1/api/tim-kiem?keyword=Korea",
        true
    );
    console.log(phimMoi);
    return (
        <div>
            {phimMoi && (
                <MovieList heading={"Phim mới"} data={phimMoi}></MovieList>
            )}
            {anime && <MovieList heading={"Anime"} data={anime}></MovieList>}
            {USA && <MovieList heading={"Phim Mỹ"} data={USA}></MovieList>}
            {Korea && (
                <MovieList heading={"Phim Hàn Xẻng"} data={Korea}></MovieList>
            )}
        </div>
    );
};

export default HomePage;
