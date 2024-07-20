import toast from "react-hot-toast";
import axios from "axios";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { useContext, useEffect } from "react";
import { userContext } from "../../../Context/User.context";
import useChangePasswordType from "../../../Hooks/useChangePasswordType";

export default function PasswordAndSecurity() {
    const { getUserProfileData, token, setToken } = useContext(userContext);
    let { changePasswordType, setChangePasswordType } = useChangePasswordType();
    function clearInputs() {
        formik.values.currentPassword = "";
        formik.values.password = "";
        formik.values.rePassword = "";
    }

    function changeTouchedValue() {
        formik.touched.currentPassword = false;
        formik.touched.password = false;
        formik.touched.rePassword = false;
    }

    async function PasswordAndSecuritySubmit(values) {
        let toastId;

        try {
            const options = {
                method: "PUT",
                url: "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
                data: {
                    currentPassword: values.currentPassword,
                    password: values.password,
                    rePassword: values.rePassword,
                },
                headers: {
                    token,
                },
            };
            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);
            toast.dismiss(toastId);

            if (data.message == "success") {
                localStorage.setItem("token", data.token);
                setToken(localStorage.getItem("token"));

                toast(
                    <span className="text-darkPrimary ">
                        Password Changed Successfully
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
            toast.error(error.response.data.errors.msg);
            toast.dismiss(toastId);
        }
    }

    const userPasswordChangValidation = Yup.object({
        currentPassword: Yup.string().required("Current Password is required"),
        password: Yup.string()
            .required("password is required")
            .min(6, "password must be more then 6 characters")
            .max(8, "password must be less then 8 characters"),
        rePassword: Yup.string()
            .required("Confirm is required")
            .oneOf([Yup.ref("password")], "Confirm Password is invalid"),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        validationSchema: userPasswordChangValidation,
        onSubmit: PasswordAndSecuritySubmit,
    });

    useEffect(() => {
        getUserProfileData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Change Password</title>
                <meta
                    name="description"
                    content="Welcome to our Change Password page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Password & Security
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="currentPassword"
                        >
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type={`${
                                    changePasswordType ? "text" : "password"
                                }`}
                                id="currentPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />

                            {changePasswordType ? (
                                <i
                                    onClick={() => {
                                        setChangePasswordType(
                                            !changePasswordType
                                        );
                                    }}
                                    className="fa-regular text-slate-400 cursor-pointer fa-eye absolute top-1/2 -translate-y-1/2 right-[15px] text-xs"
                                ></i>
                            ) : (
                                <i
                                    onClick={() => {
                                        setChangePasswordType(
                                            !changePasswordType
                                        );
                                    }}
                                    className="fa-regular text-slate-400 cursor-pointer fa-eye-slash absolute top-1/2 -translate-y-1/2 right-[15px] text-xs"
                                ></i>
                            )}
                        </div>
                    </div>
                    {formik.errors.currentPassword &&
                        formik.touched.currentPassword && (
                            <p className="text-red-600 font-bold text-xs ml-2 -mt-3 mb-2">
                                *{formik.errors.currentPassword}
                            </p>
                        )}

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="new-password"
                        >
                            New Password
                        </label>
                        <input
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={`${changePasswordType ? "text" : "password"}`}
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {formik.errors.password && formik.touched.password && (
                        <p className="text-red-600 font-bold text-xs ml-2 -mt-3 mb-2">
                            *{formik.errors.password}
                        </p>
                    )}

                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="rePassword"
                        >
                            Confirm New Password
                        </label>
                        <input
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={`${changePasswordType ? "text" : "password"}`}
                            id="rePassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword && (
                        <p className="text-red-600 font-bold text-xs ml-2 -mt-4 mb-2">
                            *{formik.errors.rePassword}
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
        </>
    );
}
