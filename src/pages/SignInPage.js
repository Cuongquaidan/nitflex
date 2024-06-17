import React, { Fragment, useState } from "react";
import Header from "../layouts/Header";
import { InputPlaceholdrEffec } from "../components/inputs";
import { ButtonRed } from "../components/buttons";
import Footer from "../layouts/Footer";
import ButtonLogin from "../components/buttons/ButtonLogin";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const regexEmail =
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const errorEmail = "Email invalid";
    const regexPassword = /^.{6,60}$/;
    const errorPassword = "Password should be between 6 and 60 characters";
    return (
        <Fragment>
            <Header to="/sign-up/createPassword">Sign up</Header>
            <div className="pt-10 border-t-2 text-gray-950">
                <form className="w-[400px] mx-auto ">
                    <h3 className="text-[40px] font-semibold">Login</h3>
                    <p className="my-4 text-xl text-gray-500">
                        If you don't have an account, you can register with the
                        "Sign up" button in the top right corner
                    </p>
                    <InputPlaceholdrEffec
                        paddingNum={10}
                        width={"400px"}
                        placeHolder={"Email"}
                        textSizeNum={20}
                        regex={regexEmail}
                        errorNoti={errorEmail}
                        classNameSub={" bg-[#eee!important] outline-black"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></InputPlaceholdrEffec>

                    <ButtonRed
                        classNameSub={" mt-16 text-[20px] "}
                        padding={20}
                        width={"100%"}
                        type="button"
                    >
                        NEXT
                    </ButtonRed>
                    <ButtonLogin classNameSub="bg-green-500 text-2xl mt-5 w-full text-white">
                        {" "}
                        Login with Google
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                            className="w-10 h-10 p-1 "
                        >
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                        </svg>
                    </ButtonLogin>

                    <ButtonLogin classNameSub="bg-yellow-500 text-2xl mt-5 w-full text-white">
                        Login with Email{" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-10 h-10 p-1 "
                        >
                            <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                        </svg>
                    </ButtonLogin>

                    <ButtonLogin classNameSub="bg-blue-500 text-2xl mt-5 w-full text-white">
                        Login with Facebook
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-10 h-10 p-1 "
                        >
                            <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                        </svg>
                    </ButtonLogin>
                </form>
                <Footer></Footer>
            </div>
        </Fragment>
    );
};

export default SignInPage;
