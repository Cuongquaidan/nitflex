import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import FooterInPageMovies from "../layouts/FooterInPageMovies";
import useAxiosGetParams from "../hooks/useAxiosGetParams";
import ReactPlayer from "react-player";
import Rate from "rc-rate";
import {
    Timestamp,
    collection,
    doc,
    limit,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uid } from "uid";
import { ButtonRed } from "../components/buttons";
import AuthContext from "../contexts/AuthContext";

const MovieDetailsPage = () => {
    const location = useLocation();
    const [stars, setStars] = useState(0.0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [listReview, setListReview] = useState([]);
    const slug = location.pathname.substring(
        0,
        location.pathname.indexOf("/tap") + 1
    );
    const tapLocation = location.pathname.substring(
        location.pathname.indexOf("/tap") + 5
    );
    const slugNameOfMovie = slug.substring(
        slug.indexOf("phim/") + 5,
        slug.length - 1
    );
    console.log("Slug name of movie:", slugNameOfMovie);
    const navigate = useNavigate();
    const data = useAxiosGetParams(`https://phimapi.com${slug}`, false);
    const [tap, setTap] = useState(parseInt(tapLocation) - 1);
    const phim = data?.episodes?.[0]?.server_data?.[tap]?.link_embed;
    const url = phim?.substring(phim?.indexOf("=") + 1, phim?.length);
    console.log("Video URL:", url);

    useEffect(() => {
        if (data) {
            setLoading(false); // Dữ liệu đã được tải
        }
    }, [data]);

    useEffect(() => {
        // Cập nhật URL khi tap thay đổi
        navigate(`${slug}tap-${tap + 1}`);
    }, [tap, slug, navigate]);

    function handleNext() {
        setTap((prevTap) =>
            Math.min(prevTap + 1, data.episodes[0].server_data.length - 1)
        );
    }

    function handlePre() {
        setTap((prevTap) => Math.max(prevTap - 1, 0));
    }

    function handleSetTap(index) {
        setTap(index);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uniqueId = uid(12);
            await setDoc(
                doc(db, "reviewMovie", `${data.movie.slug}${uniqueId}`),
                {
                    slug: data.movie.slug,
                    rate: stars,
                    comment: comment,
                    name: user.displayName || user.email,
                    img:
                        user.photoURL ||
                        "https://toigingiuvedep.vn/wp-content/uploads/2021/04/hinh-nen-may-tinh-de-thuong-dep-nhat.jpg",
                    AddAt: Timestamp.fromDate(new Date()),
                }
            );
            toast.success("Đánh giá đã được gửi thành công!");
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Có lỗi xảy ra khi gửi đánh giá.");
        }
    };

    useEffect(() => {
        console.log("Setting up Firestore query...");
        const q = query(
            collection(db, "reviewMovie"),
            where("slug", "==", slugNameOfMovie)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listReviewFromData = [];
            querySnapshot.forEach((doc) => {
                console.log("Fetched review:", doc.data());
                listReviewFromData.push({ id: doc.id, ...doc.data() });
            });
            setListReview(listReviewFromData);
            console.log("Updated list of reviews:", listReviewFromData);
        });

        return () => unsubscribe();
    }, [slugNameOfMovie]);

    console.log("List of reviews:", listReview);

    const user = useContext(AuthContext);
    return user ? (
        <div className="min-h-screen bg-gray-900">
            <Navbar
                imgUrl={user.photoURL || ""}
                userName={user.displayName || user.email}
            />
            <ToastContainer />
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-2xl text-white">Đang tải dữ liệu...</p>
                </div>
            ) : (
                <div className="lg:p-[150px] p-5 mx-auto pt-20">
                    <div>
                        <h2 className="text-3xl">{data.movie.name}</h2>
                    </div>
                    <div className="w-[100%] py-10">
                        {phim ? (
                            <ReactPlayer
                                url={url}
                                controls
                                width="100%"
                                height="auto"
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <p className="text-white">Video không khả dụng</p>
                        )}
                    </div>
                    <div className="flex justify-center gap-10">
                        <button
                            onClick={handlePre}
                            className="md:w-[300px] w-[150px] md:p-4 p-2 cursor-pointer text-white bg-pink-700 md:text-4xl text-xl font-medium block rounded-lg"
                        >
                            Tập trước
                        </button>
                        <button
                            onClick={handleNext}
                            className="md:w-[300px] w-[150px] md:p-4 p-2 cursor-pointer text-white bg-pink-700 md:text-4xl text-xl font-medium block rounded-lg"
                        >
                            Tập sau
                        </button>
                    </div>
                    <div className="flex gap-4 mt-20 max-w-[100%] flex-wrap mx-auto">
                        {data.episodes[0].server_data.map((item, index) => (
                            <div
                                className={`p-3 border-gray-400 border rounded-lg min-w-[40px] text-center cursor-pointer ${
                                    index === tap
                                        ? "bg-pink-700"
                                        : "bg-gray-800"
                                }`}
                                key={index}
                                onClick={() => {
                                    handleSetTap(index);
                                }}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <div className="min-h-[200px] bg-gray-800 border rounded-lg border-white mt-10 p-10 flex flex-col gap-10">
                        {listReview.length > 0 ? (
                            listReview.map((item, index) => (
                                <div key={index}>
                                    <div className="flex gap-16 p-2 border-b border-gray-500">
                                        <div className="flex flex-col items-center">
                                            <img src={item.img} alt="" />
                                            <p>{item.name}</p>
                                        </div>
                                        <div>
                                            <Rate
                                                value={item.rate}
                                                defaultValue={item.rate}
                                                disabled={true}
                                                className="flex"
                                                onHoverChange={() => {}}
                                            ></Rate>
                                            <p>{item.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white">Không có đánh giá nào</p>
                        )}
                    </div>
                    <form
                        className="p-4 mt-10 text-xl bg-gray-800 border rounded-lg"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <h3>Đánh giá</h3>
                            <Rate
                                count={5}
                                value={stars}
                                onChange={setStars}
                                style={{
                                    margin: "16px 0 0 0",
                                    display: "flex",
                                    fontSize: "30px",
                                    color: "#ffd700",
                                }}
                            />
                        </div>

                        <div>
                            <h3 className="mt-4">Nhận xét</h3>
                            <div>
                                <textarea
                                    name="comment"
                                    id="comment"
                                    className="w-full p-2 mt-2 text-white bg-gray-700 border border-gray-500 rounded-md"
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="p-3 mt-4 text-xl text-white bg-pink-700 rounded-md"
                        >
                            Gửi đánh giá
                        </button>
                    </form>
                </div>
            )}
        </div>
    ) : (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl text-white">
                    Vui lòng đăng nhập để xem chi tiết phim và đánh giá.
                </p>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
