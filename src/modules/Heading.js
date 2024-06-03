import React from "react";

const Heading = ({ children, classNameSub, ...props }) => {
    return (
        <div className="flex items-center gap-4 transition-all cursor-pointer group">
            <h2 className={`text-3xl ${classNameSub}`}>{children}</h2>
            <p className="flex items-center pt-3 text-base text-green-500 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-2">
                Xem tất cả{" "}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </p>
        </div>
    );
};

export default Heading;
