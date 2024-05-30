import { React } from "react";
import backgroundStartedpage from "../images/backgroundStartedpage.jpg";
import { ButtonRed } from "../components/buttons";
import { InputPlaceholdrEffec } from "../components/inputs";
const StartPage = () => {
    const regexEmail =
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const errorEmail = "Email invalid";
    return (
        <div
            className="w-full min-h-screen "
            style={{ backgroundImage: `url(${backgroundStartedpage})` }}
        >
            <div
                className="h-full min-h-screen"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,1) 100%)",
                }}
            >
                <div className="w-[1280px] mx-auto ">
                    <header className="flex items-center justify-between">
                        <div>
                            <p className="text-[60px] font-bold text-red-600">
                                NITFLEX
                            </p>
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
                    <div className="mt-[200px] text-center">
                        <p className="text-[60px] font-bold">
                            Unlimited movies, TV shows, and more
                        </p>
                        <p className="mt-[20px] text-2xl">
                            Watch anywhere. Cancel anytime
                        </p>
                        <p className="mt-[20px] text-xl">
                            Ready to watch? Enter your email to create or
                            restart your membership
                        </p>
                        <div className="mt-[60px] flex items-center justify-center gap-3">
                            <div>
                                <InputPlaceholdrEffec
                                    paddingNum={10}
                                    width={"500px"}
                                    placeHolder={"Email Address"}
                                    textSizeNum={20}
                                    regex={regexEmail}
                                    errorNoti={errorEmail}
                                ></InputPlaceholdrEffec>
                            </div>
                            <ButtonRed
                                padding={"10px"}
                                width={"200px"}
                                textSize={"20px"}
                            >
                                Get Started
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </ButtonRed>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
