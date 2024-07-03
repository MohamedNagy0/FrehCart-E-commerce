import axios from "axios";
import { Formik } from "formik";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
export const userContext = createContext(null);

export default function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));

    function clearInputs() {
        Formik.values.email = "";
    }

    async function ForgotPassword(values) {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                data: values,
            };
            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);
            if (data.statusMsg == "success") {
                localStorage.setItem("userResetEmail", values.email);
                toast.dismiss(toastId);
                toast(data.message, {
                    duration: 2000,
                    position: "top-center",
                    icon: (
                        <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                            <i className="fa-solid fa-check text-white"></i>
                        </span>
                    ),
                });

                window.location.href = "http://localhost:5173/auth/verifyCode";
            }
        } catch (error) {
            clearInputs();
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
        }
    }

    function logOut() {
        let toastId;
        toastId = toast.loading("Logging out...");
        localStorage.removeItem("token");
        setTimeout(() => {
            toast.dismiss(toastId);
            window.location.href = "https://e-commerce-psi-ashen.vercel.app/";
            setToken(null);
            toast(<span className="text-darkPrimary ">Logged out</span>, {
                duration: 2000,
                position: "top-center",
                icon: (
                    <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                        <i className="fa-solid fa-check text-white"></i>
                    </span>
                ),
            });
        }, 1300);
    }

    return (
        <>
            <userContext.Provider
                value={{
                    token,
                    setToken,
                    logOut,
                    ForgotPassword,
                }}
            >
                {children}
            </userContext.Provider>
        </>
    );
}
