import React, { useContext } from "react";
import { userContext } from "../../../../Context/User.context";

export default function ImportUserImage() {
    const {
        ImageInputRef,
        handelImageInputClick,
        userFakeImage,
        uploadImage,
        loadingUserImage,
    } = useContext(userContext);
    return (
        <>
            <section
                onClick={handelImageInputClick}
                className="flex flex-col items-center gap-2 mt-10 cursor-pointer"
            >
                <div className="size-52 border rounded-full">
                    {loadingUserImage ? (
                        <div className="size-full flex justify-center items-center">
                            <i className="fa-solid fa-circle-notch fa-spin text-primary text-4xl"></i>
                        </div>
                    ) : localStorage.getItem("userImage") ? (
                        <img
                            className="size-full object-contain rounded-full"
                            src={localStorage.getItem("userImage")}
                            alt="User Profile Image"
                        />
                    ) : (
                        <img
                            className="size-full object-contain rounded-full"
                            src={userFakeImage}
                            alt="User Fake Image"
                        />
                    )}
                    {}

                    <input
                        accept="image/*"
                        ref={ImageInputRef}
                        className="hidden"
                        type="file"
                        placeholder="Upload Photo"
                        onChange={(e) => {
                            uploadImage(e.target.files[0]);
                        }}
                    />
                </div>
                <button
                    type="button"
                    className="btn-primary bg-white border-[1px] border-primary hover:text-white text-primary duration-300"
                >
                    Upload Photo
                </button>
            </section>
        </>
    );
}
