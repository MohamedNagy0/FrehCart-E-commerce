import onlinePaymentImg from "../../assets/images/online1.png";
import cashPaymentImg from "../../assets/images/cash1.png";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import { Navigate, useNavigate } from "react-router-dom";
import formatMoney from "../../Helpers/helpers";
import { Helmet } from "react-helmet";

export default function CheckOut({ totalPrice }) {
    const navigate = useNavigate();
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const { token } = useContext(userContext);

    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [details, setDetails] = useState("");

    const [cityTouch, setCityTouch] = useState(false);
    const [phoneTouch, setPhoneTouch] = useState(false);
    const [detailsTouch, setDetailsTouch] = useState(false);

    const [errors, setErrors] = useState({});

    async function createCashOrder() {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartProducts.data._id}`,
                data: {
                    shippingAddress: {
                        details,
                        phone,
                        city,
                    },
                },
                headers: { token },
            };

            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);

            toast.dismiss(toastId);

            toast("Order Created Successfully", {
                duration: 2000,
                position: "top-center",
                icon: (
                    <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                        <i className="fa-solid fa-check text-white"></i>
                    </span>
                ),
            });
            setCartProducts([]);
            navigate("/allorders");
        } catch (error) {}
    }

    async function createOnlineOrder() {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartProducts.data._id}?url=/allorders`,
                data: {
                    shippingAddress: {
                        details,
                        phone,
                        city,
                    },
                },

                headers: { token },
            };

            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);
            toast.dismiss(toastId);
            if (data.status == "success") {
                window.location.href = data.session.url;
            }
        } catch (error) {}
    }

    function formValidation() {
        if (city == "") {
            errors.city = "City is required";
        } else if (city.length < 3) {
            errors.city = "City must more then 3 characters";
        } else if (city.length > 11) {
            errors.city = "City must less then 11 characters";
        } else {
            errors.city = "";
        }

        if (phone == "") {
            errors.phone = "phone is required";
        } else if (!/^01[0125][0-9]{8}$/.test(phone)) {
            errors.phone = "Phone is invalid";
        } else {
            errors.phone = "";
        }

        if (details == "") {
            errors.details = "Details is required";
        } else if (details.length < 3) {
            errors.details = "Details must more then 3 characters";
        } else if (details.length > 50) {
            errors.details = "Details must less then 50 characters";
        } else {
            errors.details = "";
        }
    }

    return (
        <>
            <div className="container  max-w-[535px] mt-12">
                <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
                <h2 className="text-center my-2 font-bold text-lg Outfit">
                    Check Out
                </h2>
                <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

                <form
                    id="checkOut"
                    className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
                >
                    <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

                    <div className="flex  gap-4 items-center">
                        <span className="font-bold">SubTotal :</span>
                        <span className="text-primary font-semibold">
                            {formatMoney(totalPrice)}
                        </span>
                    </div>
                    <div>
                        <input
                            className="form-control w-full placeholder:text-sm"
                            autoComplete="off"
                            type="text"
                            placeholder="Enter Your City Name"
                            name="shippingAddress.city"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                            onInput={() => {
                                formValidation();
                                setCityTouch(true);
                            }}
                        />
                    </div>

                    {errors.city && cityTouch && (
                        <p className="text-red-600 font-bold text-sm -my-3">
                            *{errors.city}
                        </p>
                    )}

                    <div>
                        <input
                            className="form-control w-full placeholder:text-sm"
                            autoComplete="off"
                            type="tel"
                            placeholder="Enter Your Phone"
                            name="shippingAddress.phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            onInput={() => {
                                formValidation();
                                setPhoneTouch(true);
                            }}
                        />
                    </div>
                    {errors.phone && phoneTouch && (
                        <p className="text-red-600 font-bold text-sm -my-3 ">
                            *{errors.phone}
                        </p>
                    )}
                    <div>
                        <textarea
                            className="w-full min-h-20 form-control placeholder:text-sm"
                            placeholder="Details"
                            name="shippingAddress.details"
                            value={details}
                            onChange={(e) => {
                                setDetails(e.target.value);
                            }}
                            onInput={() => {
                                formValidation();
                                setDetailsTouch(true);
                            }}
                        />
                    </div>
                    {errors.details && detailsTouch && (
                        <p className="text-red-600 font-bold text-sm -my-3 ">
                            *{errors.details}
                        </p>
                    )}

                    <div className=" flex max-md:flex-col  gap-4 justify-between items-center">
                        <button
                            onClick={() => {
                                setDetailsTouch(true);
                                setPhoneTouch(true);
                                setCityTouch(true);
                                formValidation();
                                if (
                                    errors.details == "" &&
                                    errors.city == "" &&
                                    errors.phone == ""
                                ) {
                                    createCashOrder();
                                }
                            }}
                            type="button"
                            className="btn-primary w-full flex py-1 text-nowrap items-center justify-center gap-2"
                        >
                            <img
                                className="size-10"
                                src={cashPaymentImg}
                                alt="Cash Payment Img"
                            />
                            <span> Cash Order</span>
                        </button>
                        <button
                            onClick={() => {
                                setDetailsTouch(true);
                                setPhoneTouch(true);
                                setCityTouch(true);
                                formValidation();
                                if (
                                    errors.details == "" &&
                                    errors.city == "" &&
                                    errors.phone == ""
                                ) {
                                    createOnlineOrder();
                                }
                            }}
                            type="button"
                            className="btn-primary flex py-1 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-primary bg-white text-darkPrimary w-full"
                        >
                            <img
                                className="size-10 object-cover"
                                src={onlinePaymentImg}
                                alt="Online Payment Img"
                            />
                            <span>Online Order</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
