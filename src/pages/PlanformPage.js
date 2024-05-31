import React from "react";
import HeaderSignOut from "../layouts/HeaderSignOut";
import Footer from "../layouts/Footer";
import ButtonRed from "../components/buttons/ButtonRed";
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
                                className="w-[24%] border-gray-600 rounded-lg border min-h-24"
                            >
                                {item.isMostPopular ? (
                                    <div className="h-6 text-center text-white rounded-t-lg bg-slate-700">
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
                                        className="flex flex-col gap-0 p-4 text-xl font-semibold text-white rounded-lg"
                                    >
                                        <p>{item.name}</p>
                                        <p>{item.des}</p>
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
                <ButtonRed
                    classNameSub={"w-[400px] p-3 mt-10 mx-auto text-[20px]"}
                >
                    Next
                </ButtonRed>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default PlanformPage;
