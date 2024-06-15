import React from "react";
import MovieHomeDirec from "../modules/MovieHomeDirec";

const DanhSachYeuThichPage = () => {
    const danhSach = JSON.parse(localStorage.getItem("listFavorite")) || [];
    console.log(danhSach);
    return (
        <div>
            <MovieHomeDirec
                data={danhSach}
                heading="Danh sách yêu thích"
            ></MovieHomeDirec>
        </div>
    );
};

export default DanhSachYeuThichPage;
