import React, { useContext } from "react";
import { userContext } from "../../../../Context/User.context";

export default function ImportUserImage() {
    const {
        ImageInputRef,
        handelImageChange,
        handelImageInputClick,
        userFakeImage,
        fileType,
    } = useContext(userContext);
    return (
        <>
            <section
                onClick={handelImageInputClick}
                className="flex flex-col items-center gap-2 mt-10"
            >
                <div className="size-52 border rounded-full ">
                    {localStorage.getItem("userImage") ? (
                        <img
                            className="w-full h-full object-contain rounded-full"
                            src={`${localStorage.getItem("userImage")}`}
                            alt=""
                        />
                    ) : (
                        <img
                            className="w-full rounded-full"
                            src={userFakeImage}
                            alt=""
                        />
                    )}
                    <input
                        accept="image/*"
                        ref={ImageInputRef}
                        className="hidden"
                        type="file"
                        placeholder="Upload Photo"
                        onChange={(e) => {
                            handelImageChange(e);
                        }}
                    />
                </div>
                <button
                    type="button"
                    className="btn-primary bg-white border-[1px] border-primary hover:text-white text-primary duration-300"
                >
                    Change Photo
                </button>
            </section>
        </>
    );
}
