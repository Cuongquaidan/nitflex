import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
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
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uid } from "uid";

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
    const navigate = useNavigate();
    const data = useAxiosGetParams(`https://phimapi.com${slug}`, false);
    const [tap, setTap] = useState(parseInt(tapLocation) - 1);
    const phim = data?.episodes?.[0]?.server_data?.[tap]?.link_embed;
    const url = phim?.substring(phim?.indexOf("=") + 1, phim?.length);
    console.log(url);

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

    const user = auth.currentUser;

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
        const q = query(
            collection(db, "reviewMovie"),
            orderBy("AddAt", "desc"),
            limit(10)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listReviewFromData = [];
            querySnapshot.forEach((doc) => {
                listReviewFromData.push({ id: doc.id, ...doc.data() });
            });
            setListReview(listReviewFromData);
        });

        return () => unsubscribe();
    }, []);

    return (
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
                <div className="p-[150px] mx-auto">
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
                            className="w-[300px] p-4 cursor-pointer text-white bg-pink-700 text-4xl font-medium block rounded-lg"
                        >
                            Tập trước
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-[300px] p-4 cursor-pointer text-white bg-pink-700 text-4xl font-medium block rounded-lg"
                        >
                            Tập sau
                        </button>
                    </div>
                    <div className="flex gap-4 mt-20 max-w-[100%]">
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
                        {listReview.map((item, index) => (
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
                        ))}
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
                                    className="w-full mt-4 min-h-[200px] p-4 bg-zinc-800"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                ></textarea>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="block p-2 mt-4 ml-auto border border-white rounded-2xl w-[100px] bg-blue-900"
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            )}
            <FooterInPageMovies />
        </div>
    );
};

export default MovieDetailsPage;
