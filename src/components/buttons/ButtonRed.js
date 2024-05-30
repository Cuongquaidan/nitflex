import React from "react";

const ButtonRed = ({
    width,

    textSize,
    onClick,
    padding,
    children,
    ...props
}) => {
    return (
        <button
            className="flex justify-center font-semibold text-white bg-red-600 rounded-lg"
            style={{
                width,
                fontSize: textSize,
                padding,
                height: "minContent",
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonRed;
