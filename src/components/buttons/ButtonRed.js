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
                "flex justify-center font-semibold text-white bg-red-600 rounded-lg " +
                `${classNameSub}`
            }
            style={{
                width,
                fontSize: textSize,
                padding,
                height: "minContent",
            }}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonRed;
