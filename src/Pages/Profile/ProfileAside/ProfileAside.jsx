import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../../Context/User.context";

export default function ProfileAside({
    profileAsideMove,
    setProfileAsideMove,
}) {
    const { userAddress } = useContext(userContext);
    return (
        <>
            <aside
                className={`bg-white w-[200px] duration-700 animate-userAsideAnimation ${
                    profileAsideMove ? "translate-x-0" : "-translate-x-full"
                } border h-[300px] shadow-lg rounded-2xl px-5 pt-5  fixed top-[100px] left-0  z-50 `}
            >
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="personalDetails"
                            className="flex items-center gap-1"
                        >
                            <span>
                                <i className="fa-solid fa-user-pen"></i>
                            </span>
                            <span>Personal Details</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="passwordAndSecurity"
                            className="flex items-center gap-1"
                        >
                            <span>
                                <i className="fa-solid fa-lock"></i>
                            </span>{" "}
                            <span>Change Password</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="userAddress"
                            className="flex items-center gap-1"
                        >
                            <span>
                                <i className="fa-solid fa-address-card"></i>{" "}
                            </span>{" "}
                            <span>
                                {userAddress?.length != 0
                                    ? "Update Address"
                                    : "Add Address"}
                            </span>
                        </NavLink>
                    </li>
                </ul>

                <div
                    onClick={() => {
                        setProfileAsideMove(!profileAsideMove);
                    }}
                    className="size-1 absolute left-full border border-s-0 rounded-s-none cursor-pointer rounded-full top-1/2 -translate-y-1/2 bg-white p-5 flex justify-center items-center"
                >
                    <i
                        className={`fa-solid fa-angle-right text-xl text-primary ${
                            profileAsideMove ? "rotate-180" : ""
                        } duration-700`}
                    ></i>
                </div>
            </aside>
        </>
    );
}
