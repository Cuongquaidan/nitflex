import React from "react";
import { ButtonRed } from "../components/buttons";

const Header = () => {
    return (
        <header className="flex items-center mx-auto justify-between w-full max-w-[1800px]">
            <div>
                <p className="text-[60px] font-bold text-red-600">NITFLEX</p>
            </div>
            <ButtonRed
                padding={"4px"}
                width={"100px"}
                height={"30px"}
                textSize={"20px"}
                onClick={() => {}}
            >
                Sign In
            </ButtonRed>
        </header>
    );
};

export default Header;
