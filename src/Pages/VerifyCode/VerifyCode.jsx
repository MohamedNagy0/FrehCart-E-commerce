import axios from "axios";
import { Formik, useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyCode() {
    let navigate = useNavigate();

    function clearInputs() {
        formik.values.resetCode = "";
    }

    async function formSubmit(values) {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                data: values,
            };
            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);
            console.log(data);
            if (data.status == "Success") {
                toast.dismiss(toastId);
                toast(data.status, {
                    duration: 2000,
                    position: "top-center",
                    icon: (
                        <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                            <i className="fa-solid fa-check text-white"></i>
                        </span>
                    ),
                });

                navigate("/auth/resetPassword");
            }
        } catch (error) {
            clearInputs();
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
        }
    }
    const formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: formSubmit,
    });

    return (
        <>
            <Helmet>
                <title>VerifyCode</title>
                <meta
                    name="description"
                    content="Welcome to our VerifyCode page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <section>
                <header className="text-center space-y-2">
                    <i className="fa-regular fa-envelope text-primary text-3xl"></i>
                    <h2 className="text-2xl font-bold">Check your email</h2>
                    <p className="text-xs">Reset code sent to your email</p>
                </header>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-5 mb-5 text-center">
                        <input
                            type="text"
                            name="resetCode"
                            className="form-control placeholder:text-xs"
                            placeholder="Enter Reset Code"
                            value={formik.values.resetCode}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <footer className="text-center">
                        <div className="w-full">
                            <button type="submit" className="btn-primary py-1">
                                Next
                            </button>
                        </div>

                        <Link
                            className="text-xs text-primary font-bold inline-block mt-4 hover:underline"
                            to="/auth/forgotPassword"
                        >
                            Back Forgot your password
                        </Link>
                    </footer>
                </form>
            </section>
        </>
    );
}
