import toast from "react-hot-toast";
import axios from "axios";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { userContext } from "../../../Context/User.context";

export default function UserAddress() {
    const { token, userAddress, getUserAddress } = useContext(userContext);
    function clearInputs() {
        formik.values.name = "";
        formik.values.city = "";
        formik.values.phone = "";
        formik.values.details = "";
    }

    function changeTouchedValue() {
        formik.touched.name = false;
        formik.touched.phone = false;
        formik.touched.city = false;
        formik.touched.details = false;
    }

    async function addAddressSubmit(values) {
        let toastId;
        try {
            const options = {
                method: "POST",
                url: "https://ecommerce.routemisr.com/api/v1/addresses",
                data: {
                    name: values.name,
                    details: values.details,
                    phone: values.phone,
                    city: values.city,
                },
                headers: {
                    token,
                },
            };

            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);

            toast.dismiss(toastId);
            if (data.status == "success") {
                getUserAddress();
                toast(
                    <span className="text-darkPrimary ">
                        Address added Successfully
                    </span>,
                    {
                        duration: 2000,
                        position: "top-center",
                        icon: (
                            <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                                <i className="fa-solid fa-check text-white"></i>
                            </span>
                        ),
                    }
                );
            }
            clearInputs();
            changeTouchedValue();
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.response.data.errors.msg);
        }
    }

    const formValidation = Yup.object({
        name: Yup.string()
            .required("name is required")
            .min(3, "name must be more then 3 characters")
            .max(25, "name must be less then 25 characters"),
        city: Yup.string()
            .required("city is required")
            .min(3, "name must be more then 3 characters"),
        details: Yup.string()
            .required("details is required")
            .min(3, "name must be more then 3 characters"),
        phone: Yup.string()
            .required("phone is required")
            .matches(/^01[0125][0-9]{8}$/, "phone is invalid"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            details: "",
            phone: "",
            city: "",
        },
        validationSchema: formValidation,
        onSubmit: addAddressSubmit,
    });

    return (
        <>
            <Helmet>
                <title>User Address</title>
                <meta
                    name="description"
                    content="Welcome to our User Address page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <div className="max-w-md  mx-auto   mt-10 p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {userAddress?.length != 0
                        ? "Update Address"
                        : "Add Address"}{" "}
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        {userAddress?.length != 0 ? (
                            <p className="mb-3 shadow bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                {userAddress
                                    ? userAddress[userAddress.length - 1].name
                                    : ""}
                            </p>
                        ) : (
                            ""
                        )}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your new name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-600 font-bold text-xs ml-2 -mt-3 mb-2">
                            *{formik.errors.name}
                        </p>
                    )}

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="City"
                        >
                            City
                        </label>
                        {userAddress?.length != 0 ? (
                            <p className="mb-3 shadow bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                {userAddress
                                    ? userAddress[userAddress.length - 1].city
                                    : ""}
                            </p>
                        ) : (
                            ""
                        )}
                        <input
                            type="name"
                            id="city"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your new City"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {formik.errors.city && formik.touched.city && (
                        <p className="text-red-600 font-bold text-xs ml-2 -mt-3 mb-2">
                            *{formik.errors.city}
                        </p>
                    )}

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phone"
                        >
                            Phone
                        </label>
                        {userAddress?.length != 0 ? (
                            <p className="mb-3 shadow bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                {userAddress
                                    ? userAddress[userAddress.length - 1].phone
                                    : ""}
                            </p>
                        ) : (
                            ""
                        )}
                        <input
                            placeholder="Enter you new phone"
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {formik.errors.phone && formik.touched.phone && (
                        <p className="text-red-600 font-bold text-xs ml-2 -mt-3 mb-2">
                            *{formik.errors.phone}
                        </p>
                    )}

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="details"
                        >
                            Details
                        </label>
                        {userAddress?.length != 0 ? (
                            <p className="mb-3 shadow bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                {userAddress
                                    ? userAddress[userAddress.length - 1]
                                          .details
                                    : ""}
                            </p>
                        ) : (
                            ""
                        )}

                        <textarea
                            placeholder="Enter you new details"
                            type="tel"
                            id="details"
                            name="details"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>

                    {formik.errors.details && formik.touched.details && (
                        <p className="text-red-600 font-bold text-xs ml-2 -mt-3 mb-2">
                            *{formik.errors.details}
                        </p>
                    )}

                    <div className="mt-2 flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {userAddress?.length == 0
                                ? "Add Address"
                                : "Update Address"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
