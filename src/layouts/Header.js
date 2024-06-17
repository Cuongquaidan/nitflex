import React from "react";
import { ButtonRed } from "../components/buttons";
import { NavLink } from "react-router-dom";

const Header = ({ children = "Sign in", to = "/sign-in", ...props }) => {
    return (
        <header className="flex items-center mx-auto justify-between w-full max-w-[1800px]">
            <NavLink to="/" className="text-[60px] font-bold text-red-600">
                NITFLEX
            </NavLink>

            <ButtonRed
                padding={"4px"}
                width={"100px"}
                height={"30px"}
                textSize={"20px"}
                onClick={() => {}}
            >
                <NavLink to={to}>{children}</NavLink>
            </ButtonRed>
        </header>
    );
};

export default Header;
