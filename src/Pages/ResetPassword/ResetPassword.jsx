import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
    const { setToken, token } = useContext(userContext);
    let navigate = useNavigate();

    async function formSubmit(values) {
        let toastId;

        try {
            const options = {
                method: "PUT",
                url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                data: {
                    email: localStorage.getItem("userResetEmail"),
                    newPassword: formik.values.newPassword,
                },
            };
            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);

            localStorage.setItem("token", data.token);
            setToken(localStorage.getItem("token"));
            toast.dismiss(toastId);

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

            navigate("/");
        } catch (error) {
            console.log(error);
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
        }
    }

    const formValidation = Yup.object({
        newPassword: Yup.string()
            .required("New Password is required")
            .min(6, "New Password must be 6 characters")
            .max(6, "New Password must be 6 characters"),
        rePassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("newPassword")], "Confirm Password is invalid"),
    });

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            rePassword: "",
        },

        validationSchema: formValidation,

        onSubmit: formSubmit,
    });

    return (
        <>
            <Helmet>
                <title>ResetPassword</title>
                <meta
                    name="description"
                    content="Welcome to our ResetPassword page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <section className="flex flex-col justify-center items-center gap-8 mt-12">
                <header className="flex flex-col gap-4 text-center">
                    <h2 className="font-extrabold text-primary text-2xl">
                        Create New password
                    </h2>
                    <p className="text-gray-500 text-sm">
                        This password should be different from the <br />
                        previous password.
                    </p>
                </header>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <input
                            className="form-control w-full placeholder:text-sm"
                            autoComplete="off"
                            type="password"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="New Password"
                        />
                    </div>
                    {formik.errors.newPassword &&
                        formik.touched.newPassword && (
                            <p className="text-red-600 font-bold text-sm my-2">
                                *{formik.errors.newPassword}
                            </p>
                        )}
                    <div className="mb-3">
                        <input
                            className="form-control w-full placeholder:text-sm"
                            autoComplete="off"
                            type="password"
                            name="rePassword"
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Confirm Password"
                        />
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword && (
                        <p className="text-red-600 font-bold text-sm my-2">
                            *{formik.errors.rePassword}
                        </p>
                    )}
                    <footer className="text-center">
                        <button
                            type="submit"
                            className="btn-primary w-full py-1"
                        >
                            Reset Password
                        </button>
                        <Link
                            className="text-xs text-primary font-bold inline-block mt-4 hover:underline"
                            to="/auth/login"
                        >
                            Back to log in
                        </Link>
                    </footer>
                </form>
            </section>
        </>
    );
}
