import toast from "react-hot-toast";
import axios from "axios";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { userContext } from "../../../Context/User.context";
import ImportUserImage from "./ImportUserImage/ImportUserImage";

export default function PersonalDetails() {
    const { usersProfileData, token, getUserProfileData } =
        useContext(userContext);

    function clearInputs() {
        formik.values.name = "";
        formik.values.email = "";
        formik.values.phone = "";
    }

    function changeTouchedValue() {
        formik.touched.name = false;
        formik.touched.email = false;
        formik.touched.phone = false;
    }

    async function PersonalDetailsSubmit(values) {
        let toastId;
        try {
            const options = {
                method: "PUT",
                url: "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
                data: {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                },
                headers: {
                    token,
                },
            };

            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);
            console.log(data);

            toast.dismiss(toastId);
            if (data.message == "success") {
                getUserProfileData();
                toast(
                    <span className="text-darkPrimary ">
                        Information's Changed Successfully
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
            console.log(error);
            toast.dismiss(toastId);
            toast.error(error.response.data.errors.msg);
        }
    }

    const formValidation = Yup.object({
        name: Yup.string()
            .required("name is required")
            .min(3, "name must be more then 3 characters")
            .max(25, "name must be less then 25 characters"),
        email: Yup.string()
            .required("email is required")
            .email("email is invalid"),
        phone: Yup.string()
            .required("phone is required")
            .matches(/^01[0125][0-9]{8}$/, "phone is invalid"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validationSchema: formValidation,
        onSubmit: PersonalDetailsSubmit,
    });

    return (
        <>
            <Helmet>
                <title>Personal Details</title>
                <meta
                    name="description"
                    content="Welcome to our Personal Details page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>

            <div className="flex max-sm:flex-col max-sm:items-center max-sm:gap-3 gap-20 items-start justify-center">
                <ImportUserImage />
                <div className="max-w-md flex-grow  max-sm:w-full  mt-10 p-6 bg-white rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Personal Details
                    </h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>

                            <p className="mb-3 shadow bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                {usersProfileData?.name}
                            </p>
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
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <p className="mb-3 shadow bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                {usersProfileData?.email}
                            </p>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your new email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <p className="text-red-600 font-bold text-xs ml-2 -mt-3 mb-2">
                                *{formik.errors.email}
                            </p>
                        )}

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="phone"
                            >
                                Phone
                            </label>

                            <p className="mb-3 shadow bg-slate-200 appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                {usersProfileData?.phone}
                            </p>
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

                        <div className="mt-2 flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-primary hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
