import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../modules/MovieList";
import MovieItem from "../modules/MovieItem";

const HomePage = () => {
    const [phimMoi, setPhimMoi] = useState(null);
    const [anime, setAnime] = useState(null);
    const [USA, setUSA] = useState(null);
    const [Korea, setKorea] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1"
                );
                setPhimMoi(response.data.items);
                const responseAnime = await axios.get(
                    "https://phimapi.com/v1/api/tim-kiem?keyword=Anime"
                );
                setAnime(responseAnime.data.data.items);
                const responseUSA = await axios.get(
                    "https://phimapi.com/v1/api/tim-kiem?keyword=USA"
                );
                setUSA(responseUSA.data.data.items);
                const responseKorea = await axios.get(
                    "https://phimapi.com/v1/api/tim-kiem?keyword=Korea"
                );
                setKorea(responseKorea.data.data.items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    console.log(Korea);

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
