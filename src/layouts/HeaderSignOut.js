import React, { useRef } from "react";

const HeaderSignOut = () => {
    // const btnRef = useRef();
    // const handleMouseEnter = () => {
    //     btnRef.current.style = "text-decoration:underline";
    // };
    // const handleMouseLeave = () => {
    //     btnRef.current.style = "text-decoration:none";
    // };
    return (
        <header className="flex items-center mx-auto justify-between w-full max-w-[1800px]">
            <div>
                <p className="text-[60px] font-bold text-red-600">NITFLEX</p>
            </div>
            <button
                className="text-gray-800 text-[20px] font-semibold hover:underline"
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                // ref={btnRef}
            >
                Sign Out
            </button>
        </header>
    );
};

export default HeaderSignOut;
