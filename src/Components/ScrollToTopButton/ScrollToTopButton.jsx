import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [showBackToTopButton, setShowBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.documentElement.scrollTop >= 700) {
                setShowBackToTopButton(true);
            } else {
                setShowBackToTopButton(false);
            }
        });
    }, []);
    function ScrollToTop() {
        window.scrollTo(0, 0);
    }
    return (
        <>
            <button
                onClick={ScrollToTop}
                className={`${
                    showBackToTopButton ? "opacity-100" : "opacity-0"
                } hover:-translate-y-2 duration-300 size-1 p-5 bg-primary flex justify-center items-center fixed  bottom-[30px] right-[5px] rounded-full `}
            >
                <i className="fa-solid fa-arrow-up text-white"></i>
            </button>
        </>
    );
}
