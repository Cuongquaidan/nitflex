import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";

const data = [
    {
        name: "Trang chủ",
        slug: "",
    },
    {
        name: "Phim lẻ",
        slug: "phim-le",
    },
    {
        name: "Phim bộ",
        slug: "phim-bo",
    },
    {
        name: "TV shows",
        slug: "tv-shows",
    },
    {
        name: "Hoạt hình",
        slug: "hoat-hinh",
    },
];

const Navbar = ({ imgUrl = "", userName = "", ...props }) => {
    const [isSearch, setIsSearch] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [valueSearch, setValueSearch] = useState("");
    const location = useLocation();
    const key = location.pathname.substring(
        location.pathname.indexOf("/genres") + "/genres".length + 1
    );
    const key2 = location.pathname;
    const [indexActive, setIndexActive] = useState(0);
    const [showAction, setShowAction] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        data.forEach((item, index) => {
            if (item.slug === key) {
                setIndexActive(index);
            } else if (key2 === "danh-sach-yeu-thich") {
                setIndexActive(data.length);
            }
        });
    }, [location.pathname, key]);
    const navStyle = {
        transition: "background-color 0.3s ease",
        backgroundColor: isScrolled ? "black" : "transparent",
    };
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            window.location.href = "/genres/" + valueSearch;
        }
    };

    return (
        <nav
            style={navStyle}
            className="fixed flex items-center justify-between z-[99] w-full px-16 py-4 text-xl min-h-20 max-w-[100%]"
        >
            <div className="relative xl:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10"
                    onClick={() => {
                        setIsShowMenu(!isShowMenu);
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                </svg>
                {isShowMenu && (
                    <div className="absolute top-[50px] left-[0] min-w-[200px] max-w-[100%] bg-black p-5  rounded-lg border border-white">
                        <ul className="flex flex-col w-full gap-3 text-gray-300">
                            {data.map((item, index) => (
                                <li
                                    className={`cursor-pointer min-w-[100px] border-b border-white ${
                                        index === indexActive
                                            ? "text-gray-100 font-semibold"
                                            : ""
                                    }`}
                                    key={index}
                                    onClick={() => setIndexActive(index)}
                                >
                                    <NavLink
                                        to={
                                            item.slug !== ""
                                                ? "/genres/" + item.slug
                                                : "/home"
                                        }
                                    >
                                        {" "}
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                            <li
                                className={`cursor-pointer ${
                                    data.length === indexActive
                                        ? "text-gray-100 font-semibold"
                                        : ""
                                }`}
                                onClick={() => setIndexActive(data.length)}
                            >
                                <NavLink to="/danh-sach-yeu-thich">
                                    Danh sách yêu thích
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="hidden gap-4 xl:flex nav-left">
                <NavLink
                    to="/home"
                    className="text-[40px] font-bold text-red-600"
                >
                    NITFLEX
                </NavLink>
                <ul className="flex gap-3 text-gray-300">
                    {data.map((item, index) => (
                        <li
                            className={`cursor-pointer ${
                                index === indexActive
                                    ? "text-gray-100 font-semibold"
                                    : ""
                            }`}
                            key={index}
                            onClick={() => setIndexActive(index)}
                        >
                            <NavLink
                                to={
                                    item.slug !== ""
                                        ? "/genres/" + item.slug
                                        : "/home"
                                }
                            >
                                {" "}
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                    <li
                        className={`cursor-pointer ${
                            data.length === indexActive
                                ? "text-gray-100 font-semibold"
                                : ""
                        }`}
                        onClick={() => setIndexActive(data.length)}
                    >
                        <NavLink to="/danh-sach-yeu-thich">
                            Danh sách yêu thích
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-6 nav-right ">
                {isSearch && (
                    <div>
                        <input
                            type="text"
                            className="p-2 text-black outline-none w-[400px] searchinput"
                            onChange={(e) => {
                                setValueSearch(e.target.value);
                            }}
                            value={valueSearch}
                            onKeyDown={(e) => {
                                handleSearch(e);
                            }}
                        />
                        <Tooltip anchorSelect=".searchinput">
                            Enter để tìm
                        </Tooltip>
                    </div>
                )}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                        setIsSearch(!isSearch);
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                </svg>
                <div
                    className="relative flex items-center gap-4 transition-all "
                    onMouseEnter={() => setShowAction(true)}
                    onMouseLeave={() => setShowAction(false)}
                >
                    <img
                        src={imgUrl}
                        alt=""
                        className="w-10 h-10 bg-white rounded cursor-pointer"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`w-6 h-6 cursor-pointer ${
                            showAction ? "rotate-180" : ""
                        }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                    <div
                        className={`absolute bottom-[-160px] p-4 h-[150px] left-[-210px] bg-gray-800 outline outline-[0.5px] w-[250px] rounded-md outline-[gray] transition-all text-gray-50 ${
                            showAction
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                        }`}
                    >
                        <div className="flex items-center gap-3 p-1 border-b border-b-gray-50">
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
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                            Tài khoản
                        </div>
                        <div
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {userName}
                        </div>
                        <div
                            className="flex items-center gap-3 p-1 cursor-pointer"
                            onClick={() => {
                                signOut(auth);
                                window.location.href = "/sign-in";
                            }}
                        >
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
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                            Đăng xuất
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
