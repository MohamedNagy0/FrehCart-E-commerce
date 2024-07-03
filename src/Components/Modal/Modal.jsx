import { useContext } from "react";
import { ProductContext } from "../../Context/Product.context";

export default function Modal(props) {
    const { setShowLoginModal } = useContext(ProductContext);

    document.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            setShowLoginModal(false);
            document.querySelector("body").classList.remove("overflow-hidden");
        }
    });

    return (
        <>
            {props.showModel && (
                <div
                    onClick={(e) => {
                        if (e.target == document.querySelector(".modal")) {
                            setShowLoginModal(false);
                            document
                                .querySelector("body")
                                .classList.remove("overflow-hidden");
                        }
                    }}
                    className="modal flex justify-center items-center bg-black fixed top-0 right-0 left-0 bottom-0 bg-opacity-35 z-50"
                >
                    <div className="bg-white rounded-3xl p-10 w-full max-w-[400px] ">
                        <header className="flex justify-between items-center">
                            <h2 className="font-extrabold text-xl">
                                <i className="fa-brands fa-opencart text-primary mr-2"></i>
                                <span>FreshCart</span>
                            </h2>
                            <i
                                onClick={() => {
                                    setShowLoginModal(false);
                                    document
                                        .querySelector("body")
                                        .classList.remove("overflow-hidden");
                                }}
                                className="fa-solid fa-xmark cursor-pointer"
                            ></i>
                        </header>
                        <div>{props.children}</div>
                    </div>
                </div>
            )}
        </>
    );
}
