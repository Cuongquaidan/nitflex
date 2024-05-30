import React, { useEffect, useRef } from "react";

const InputPlaceholdrEffec = ({
    width,
    paddingNum,
    placeHolder,
    textSizeNum,
    regex,
    errorNoti,
    ...props
}) => {
    const inputRef = useRef(null);
    const labelRef = useRef(null);
    const errorRef = useRef();

    useEffect(() => {
        const input = inputRef.current;
        const label = labelRef.current;
        const p = errorRef.current;
        const handleInputClick = () => {
            label.style.transform = "scale(0.5)";
            label.style.top = "1px";
            label.style.left = "-12px";
        };

        const handleInputBlur = () => {
            const inputValue = input.value.trim();
            if (!inputValue) {
                label.style.transform = "scale(1)";
                label.style.top = paddingNum ? `${paddingNum}px` : "0px";
                label.style.left = paddingNum ? `${paddingNum}px` : "0px";
            }
        };
        const checkRegex = () => {
            const inputValue = input.value.trim();
            if (inputValue && regex.test(inputValue)) {
                p.textContent = "";
                input.style.border = "0.5px solid gray";
            } else {
                p.textContent = errorNoti;
                input.style.border = "2px solid red";
            }
        };

        if (input && label) {
            input.addEventListener("click", handleInputClick);
            input.addEventListener("blur", handleInputBlur);
            input.addEventListener("blur", checkRegex);

            // Cleanup event listeners when the component unmounts
            return () => {
                input.removeEventListener("click", handleInputClick);
                input.removeEventListener("blur", handleInputBlur);
                input.removeEventListener("blur", checkRegex);
            };
        }
    }, [paddingNum, errorNoti, regex]);

    return (
        <div
            className="relative"
            style={{
                width,
                padding: `${paddingNum}px`,
                fontSize: `${textSizeNum}px`,
                height: `${paddingNum * 2 + textSizeNum + 10}px`,
                background:
                    "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%)",
            }}
        >
            <input
                ref={inputRef}
                style={{
                    width,
                    padding: `${paddingNum}px`,
                    fontSize: `${textSizeNum}px`,
                    height: `${paddingNum * 2 + textSizeNum + 10}px`,
                    background:
                        "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%)",
                }}
                {...props}
                id={placeHolder}
                name={placeHolder}
                className="absolute top-0 left-0 border-[0.5px] pb-[0!important] h-[] rounded  outline-white outline-1"
            />
            <label
                ref={labelRef}
                htmlFor={placeHolder}
                className="absolute text-base text-gray-400"
                style={{
                    top: paddingNum ? `${paddingNum}px` : 0,
                    left: paddingNum ? `${paddingNum}px` : 0,
                    fontSize: `${textSizeNum}px`,
                    userSelect: "none",
                    textAlign: "left",
                    transition: "all 0.5s linear",
                    whiteSpace: "nowrap",
                }}
            >
                {placeHolder}
            </label>
            <p
                className="absolute bottom-[-40px] left-[10px] text-xl text-red-600"
                ref={errorRef}
            ></p>
        </div>
    );
};

export default InputPlaceholdrEffec;
