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
                    showBackToTopButton ? "opacity-50" : "opacity-0"
                } z-50 hover:-translate-y-2 duration-300 hover:opacity-100 size-1 p-5 rounded-full bg-primary flex justify-center items-center fixed  bottom-[30px] right-[5px] xl:right-[20px]`}
            >
                <i className="fa-solid fa-arrow-up text-white"></i>
            </button>
        </>
    );
}
