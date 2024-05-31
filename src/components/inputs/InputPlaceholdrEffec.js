import React, { useEffect, useRef } from "react";

const InputPlaceholdrEffec = ({
    width,
    paddingNum,
    placeHolder,
    textSizeNum,
    regex,
    errorNoti,
    classNameSub = "",
    value = "",
    onChange = () => {},
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
            label.style.transform = "scale(0.6)";
            label.style.top = "1px";
            label.style.left = "0px";
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
            className="relative rounded-xl"
            style={{
                width,
                padding: `${paddingNum}px`,
                fontSize: `${textSizeNum}px`,
                height: `${paddingNum * 2 + textSizeNum + 10}px`,
            }}
        >
            <input
                ref={inputRef}
                value={value}
                onChange={onChange}
                style={{
                    width,
                    padding: `${paddingNum}px`,
                    fontSize: `${textSizeNum}px`,
                    height: `${paddingNum * 2 + textSizeNum + 10}px`,
                }}
                {...props}
                id={placeHolder}
                name={placeHolder}
                className={
                    "absolute top-0 left-0 border-[0.5px] pb-[0!important] h-[] rounded-xl  outline-white outline-1 " +
                    ` ${classNameSub}`
                }
            />
            <label
                ref={labelRef}
                htmlFor={placeHolder}
                className="absolute text-base text-left text-gray-400"
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
                className="absolute bottom-[-30px] left-[5px] text-base text-red-600 pl-2"
                ref={errorRef}
            ></p>
        </div>
    );
};

export default InputPlaceholdrEffec;
