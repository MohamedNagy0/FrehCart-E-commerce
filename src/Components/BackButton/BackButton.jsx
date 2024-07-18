import React from "react";

export default function BackButton() {
    return (
        <>
            <button
                onClick={() => {
                    history.back();
                }}
                to="/"
                className="back-icon flex-shrink-0 self-start cursor-pointer size-[35px] rounded-full bg-primary flex justify-center items-center duration-300 hover:-translate-x-1 hover:scale-105"
            >
                <i className="fa-solid fa-arrow-left text-white"></i>
            </button>
        </>
    );
}
