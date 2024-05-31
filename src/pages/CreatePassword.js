import React, { Fragment } from "react";
import Header from "../layouts/Header";
import InputPlaceholdrEffec from "../components/inputs/InputPlaceholdrEffec";
import { ButtonRed } from "../components/buttons";
import Footer from "../layouts/Footer";

const CreatePassword = () => {
    const regexEmail =
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const errorEmail = "Email invalid";
    const regexPassword = /^.{6,60}$/;
    const errorPassword = "Password should be between 6 and 60 characters";
    return (
        <Fragment>
            <Header></Header>
            <div className="pt-10 border-t-2 text-gray-950">
                <form className="w-[400px] mx-auto">
                    <h3 className="text-[40px] font-semibold">
                        Create a password to start your membership
                    </h3>
                    <p className="my-4 text-xl text-gray-500">
                        Just a few more steps and you're done! <br /> We hate
                        paperwork, too.
                    </p>
                    <InputPlaceholdrEffec
                        paddingNum={10}
                        width={"400px"}
                        placeHolder={"Email"}
                        textSizeNum={20}
                        regex={regexEmail}
                        errorNoti={errorEmail}
                        classNameSub={" bg-[#eee!important] outline-black"}
                    ></InputPlaceholdrEffec>
                    <div className="mt-14"></div>
                    <InputPlaceholdrEffec
                        paddingNum={10}
                        width={"400px"}
                        placeHolder={"Password"}
                        textSizeNum={20}
                        regex={regexPassword}
                        errorNoti={errorPassword}
                        classNameSub={" bg-[#eee!important] outline-black"}
                        type="password"
                    ></InputPlaceholdrEffec>

                    <ButtonRed
                        classNameSub={" mt-16 text-[20px]"}
                        padding={20}
                        onClick={() => {}}
                        width={"100%"}
                    >
                        NEXT
                    </ButtonRed>
                </form>
                <Footer></Footer>
            </div>
        </Fragment>
    );
};

export default CreatePassword;
