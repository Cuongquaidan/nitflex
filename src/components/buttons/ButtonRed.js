import React from "react";

const ButtonRed = ({
    width,
    classNameSub,
    textSize,
    padding,
    children,
    handleClick = () => {},
    ...props
}) => {
    return (
        <button
            className={
                "flex justify-center flex-shrink font-semibold text-white bg-red-600 rounded-lg " +
                `${classNameSub}`
            }
            style={{
                width,
                fontSize: textSize,
                padding,
                height: "minContent",
                maxWidth: "80vw",
            }}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonRed;
