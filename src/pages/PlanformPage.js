import React, { useEffect, useState } from "react";
import HeaderSignOut from "../layouts/HeaderSignOut";
import Footer from "../layouts/Footer";
import ButtonRed from "../components/buttons/ButtonRed";
import {
    Timestamp,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";

const PlanformPage = () => {
    const data = [
        {
            name: "Premium",
            des: "4K + HDR",
            MonthlyPrice: "260,000 đ",
            Quality: "Best",
            Resolution: "4K (Ultra HD) + HDR",
            audio: "Included",
            devices: "TV, computer, mobile phone,tablet",
            atTheSame: 4,
            download: 1,
            isMostPopular: true,
        },
        {
            name: "Standard",
            des: "1080p",
            MonthlyPrice: "220,000 đ",
            Quality: "Great",
            Resolution: "1080p(Full HD)",
            audio: null,
            devices: "TV, computer, mobile phone,tablet",
            atTheSame: 2,
            download: 2,
            isMostPopular: false,
        },
        {
            name: "Basic",
            des: "720p",
            MonthlyPrice: "108,000 đ",
            Quality: "Good",
            Resolution: "720p(HD)",
            audio: null,
            devices: "TV, computer, mobile phone,tablet",
            atTheSame: 1,
            download: 1,
            isMostPopular: false,
        },
        {
            name: "Mobile",
            des: "480p",
            MonthlyPrice: "70,000 đ",
            Quality: "Fair",
            Resolution: "720p(HD)",
            audio: null,
            devices: "Mobile phone,tablet",
            atTheSame: 1,
            download: 1,
            isMostPopular: false,
        },
    ];
    const [nameSelect, setNameSelect] = useState("");
    const [priceSelect, setPriceSelect] = useState(0);
    const [selectIndex, setSelectIndex] = useState(null);
    const [urlQR, setUrlQR] = useState("");
    const user = auth.currentUser;

    const handleClickItem = (index) => {
        setSelectIndex(index);
    };
    const handleCheckBanking = () => {
        const currentTime = Timestamp.now();
        const twentyMinutesAgo = new Timestamp(
            currentTime.seconds - 20 * 60,
            currentTime.nanoseconds
        );
        const q = query(
            collection(db, "transactions"),
            where("when", ">=", twentyMinutesAgo)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const trans = [];
            querySnapshot.forEach((doc) => {
                trans.push({ id: doc.id, ...doc.data() });
            });
            return trans;
        });
        console.log(unsubscribe);
    };
    const MY_BANK = {
        BANK_ID: "MB",
        ACCOUNT_NO: "0001533571012",
        TEMPLATE: "print",
    };
    useEffect(() => {
        if (selectIndex !== null) {
            setNameSelect(data[selectIndex]?.name);
            setPriceSelect(data[selectIndex]?.MonthlyPrice);
            setUrlQR(
                `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${
                    MY_BANK.ACCOUNT_NO
                }-${MY_BANK.TEMPLATE}.png?amount=${
                    data[selectIndex]?.MonthlyPrice
                }&addInfo=${user?.uid + "-" + data[selectIndex]?.name}`
            );
        }
    }, [selectIndex]);
    return (
        <div>
            <HeaderSignOut></HeaderSignOut>
            <div className="w-[1240px] text-gray-950 mx-auto">
                <h3 className="text-3xl font-semibold">
                    Choose the plan that's right for you
                </h3>
                <div className="flex justify-between w-full mt-6">
                    {data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`w-[24%] border-gray-600 rounded-lg border min-h-24  ${
                                    index === selectIndex
                                        ? "shadow-md shadow-pink-600"
                                        : ""
                                }`}
                                onClick={() => handleClickItem(index)}
                            >
                                {item.isMostPopular ? (
                                    <div
                                        className={`h-6 text-center text-white rounded-t-lg transition-all ${
                                            index === selectIndex
                                                ? "bg-pink-600"
                                                : "bg-slate-700"
                                        }`}
                                    >
                                        Most popular
                                    </div>
                                ) : (
                                    <div className="h-6"></div>
                                )}
                                <div className="p-3">
                                    <div
                                        style={{
                                            backgroundColor: "#4158D0",
                                            backgroundImage:
                                                "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
                                        }}
                                        className="relative flex flex-col gap-0 p-4 text-xl font-semibold text-white rounded-lg"
                                    >
                                        <p>{item.name}</p>
                                        <p>{item.des}</p>
                                        {index === selectIndex && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="absolute w-6 h-6 bottom-3 right-3"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="border-b-[2px] mt-6 pb-3">
                                        <p className="text-sm font-semibold text-gray-600">
                                            Monthly price
                                        </p>
                                        <p className="text-gray-950">
                                            {item.MonthlyPrice}
                                        </p>
                                    </div>

                                    <div className="border-b-[2px]  mt-6 pb-3">
                                        <p className="text-sm font-semibold text-gray-600">
                                            Video and sound quality
                                        </p>
                                        <p className="text-gray-950">
                                            {item.Quality}
                                        </p>
                                    </div>
                                    <div className="border-b-[2px]  mt-6 pb-3">
                                        <p className="text-sm font-semibold text-gray-600">
                                            Resolution
                                        </p>
                                        <p className="text-gray-950">
                                            {item.Resolution}
                                        </p>
                                    </div>
                                    {item.audio && (
                                        <div className="border-b-[2px]  mt-6 pb-3">
                                            <p className="text-sm font-semibold text-gray-600">
                                                Spatial audio(immersive sound)
                                            </p>
                                            <p className="text-gray-950">
                                                {item.audio}
                                            </p>
                                        </div>
                                    )}
                                    <div className="border-b-[2px]  mt-6 pb-3">
                                        <p className="text-sm font-semibold text-gray-600">
                                            Supported devices
                                        </p>
                                        <p className="text-gray-950">
                                            {item.Resolution}
                                        </p>
                                    </div>
                                    <div className="border-b-[2px]  mt-6 pb-3">
                                        <p className="text-sm font-semibold text-gray-600">
                                            Devices your household can watch at
                                            the same time
                                        </p>
                                        <p className="text-gray-950">
                                            {item.atTheSame}
                                        </p>
                                    </div>
                                    <div className="border-b-[2px]  mt-6 pb-3">
                                        <p className="text-sm font-semibold text-gray-600">
                                            Download devices
                                        </p>
                                        <p className="text-gray-950">
                                            {item.download}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    {selectIndex !== null && (
                        <div className="max-w-screen-sm mx-auto mt-40">
                            <img src={urlQR} alt="bank" />
                        </div>
                    )}
                </div>
                <ButtonRed
                    classNameSub={"w-[400px] p-3 mt-10 mx-auto text-[20px]"}
                    handleClick={handleCheckBanking}
                >
                    Hoàn thành
                </ButtonRed>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default PlanformPage;
