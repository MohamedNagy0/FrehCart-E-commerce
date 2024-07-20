import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import userFakeImage from "../assets/images/user.png";

export const userContext = createContext(null);

export default function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [usersProfileData, setUsersProfileData] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [loadingUserImage, setLoadingUserImage] = useState(false);
    const ImageInputRef = useRef(null);
    let jwtObject = {};

    if (token) {
        jwtObject = jwtDecode(token);
    }

    async function getUserProfileData() {
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/users/${jwtObject.id}`
            );
            setUsersProfileData(data.data);
        } catch (error) {}
    }

    const handelImageInputClick = () => {
        ImageInputRef.current.click();
    };

    const uploadImage = async (files) => {
        const formData = new FormData();
        formData.append("file", files);
        formData.append("upload_preset", "ab2w3e89");

        try {
            setLoadingUserImage(true);
            const { data } = await axios.post(
                "https://api.cloudinary.com/v1_1/dlyzecljk/image/upload",
                formData
            );
            setLoadingUserImage(false);

            setUserImage(data.url);
            localStorage.setItem("userImage", data.url);
            console.log(data.url);
        } catch (error) {
            console.log(error);
        }
    };

    function logOut() {
        let toastId;
        toastId = toast.loading("Logging out...");
        localStorage.removeItem("token");
        setTimeout(() => {
            toast.dismiss(toastId);
            window.location.href = "http://localhost:5177/";
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
                    jwtObject,
                    getUserProfileData,
                    usersProfileData,
                    ImageInputRef,
                    handelImageInputClick,
                    userFakeImage,
                    uploadImage,
                    userImage,
                    loadingUserImage,
                }}
            >
                {children}
            </userContext.Provider>
        </>
    );
}
