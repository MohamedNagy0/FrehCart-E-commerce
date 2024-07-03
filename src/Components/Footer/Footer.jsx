import amazonLogo from "../../assets/images/amazon-pay.png";
import expressLogo from "../../assets/images/American-Express-Color.png";
import mastercardLogo from "../../assets/images/mastercard.webp";
import paypalLogo from "../../assets/images/paypal.png";
import appleLogo from "../../assets/images/get-apple-store.png";
import playLogo from "../../assets/images/get-google-play.png";

export default function Footer() {
    return (
        <>
            <footer className="bg-light py-10 px-5 absolute bottom-0 left-0 right-0">
                <div className="container">
                    <header>
                        <h2 className="text-2xl font-bold">
                            Get the FreshCart App
                        </h2>
                        <p className="my-2 text-gray-500">
                            We will send you a link, open it on your phone to
                            download the app
                        </p>
                    </header>

                    <div className="flex max-xs:flex-col items-center gap-2 sm:gap-6">
                        <input
                            type="email"
                            placeholder="Email..."
                            className="form-control flex-grow max-xs:w-full"
                        />
                        <button className="btn-primary py-[5px] max-xs:w-full">
                            Share app link
                        </button>
                    </div>

                    <div className="flex max-sm:flex-wrap  justify-between items-center mt-8 border-y py-4 border-slate-200">
                        <div className="paymentTools flex gap-4 items-center">
                            <h2 className="text-nowrap">Payment Partners</h2>
                            <a href="">
                                <img
                                    className="w-16"
                                    src={amazonLogo}
                                    alt="amazon Logo"
                                />
                            </a>
                            <a href="/">
                                <img
                                    className="w-16"
                                    src={expressLogo}
                                    alt="{express Logo"
                                />
                            </a>
                            <a href="/">
                                <img
                                    className="w-16"
                                    src={mastercardLogo}
                                    alt="mastercard Logo"
                                />
                            </a>
                            <a href="/">
                                <img
                                    className="w-16"
                                    src={paypalLogo}
                                    alt="paypal Logo"
                                />
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-nowrap">
                                Get deliveries with FreshCart
                            </h2>
                            <a href="">
                                <img
                                    className="w-24"
                                    src={appleLogo}
                                    alt="apple Logo"
                                />
                            </a>
                            <a href="">
                                <img
                                    className="w-28"
                                    src={playLogo}
                                    alt="Google play Logo"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
