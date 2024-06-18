import React from "react";
import { NavLink } from "react-router-dom";

const ButtonLogin = ({
    children = "",
    to = "",
    bgColor = "",
    classNameSub = "",
    handleClick = () => {},
    ...props
}) => {
    return (
        <button
            className={"block min-w-24  rounded-xl p-2  " + " " + classNameSub}
            onClick={handleClick}
        >
            <NavLink to={to} className="flex items-center justify-between">
                {children}
            </NavLink>
        </button>
    );
};

export default ButtonLogin;
