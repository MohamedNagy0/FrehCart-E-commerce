import { Formik, useFormik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
    const { ForgotPassword } = useContext(userContext);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: ForgotPassword,
    });

    return (
        <>
            <Helmet>
                <title>ForgotPassword</title>
                <meta
                    name="description"
                    content="Welcome to our ForgotPassword page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <section className="flex flex-col justify-center items-center gap-8 mt-12">
                <header className="flex flex-col gap-4 text-center">
                    <h2 className="font-extrabold text-primary text-2xl">
                        Forgot your password?
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Your password will be reset by email.
                    </p>
                </header>
                <form onSubmit={formik.handleSubmit}>
                    <label
                        className="text-left text-xs font-bold text-gray-600"
                        htmlFor="email"
                    >
                        Enter your email address
                    </label>
                    <div className="mt-1 mb-5">
                        <input
                            autoComplete="off"
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <footer className="text-center">
                        <button
                            type="submit"
                            className="btn-primary w-full py-1"
                        >
                            Next
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
