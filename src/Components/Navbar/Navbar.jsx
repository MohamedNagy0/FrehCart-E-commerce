import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";
import { WishListContext } from "../../Context/WishList.context";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [showProfileUser, setShowProfileUser] = useState(false);
    const {
        token,
        logOut,
        usersProfileData,
        getUserProfileData,
        userFakeImage,
        getUserAddress,
    } = useContext(userContext);
    const { getAllProductsCart, cartProducts, cartAnimation, userOrders } =
        useContext(CartContext);
    const { getProductsToWishList, wishListProducts } =
        useContext(WishListContext);

    useEffect(() => {
        if (token) {
            getAllProductsCart();
            getUserProfileData();
            getUserAddress();
        }
    }, []);

    useEffect(() => {
        if (token) {
            getAllProductsCart();
            getProductsToWishList();
        }
    }, [token]);

    return (
        <>
            <nav
                className={`${styles.nav} bg-light p-4 fixed left-0 top-0 right-0 z-50`}
            >
                <div className="container">
                    <div className="row flex  gap-4 items-center max-md-850:flex-wrap">
                        <h1 className="text-2xl font-bold text-nowrap">
                            <Link
                                onClick={() => {
                                    setOpen(false);
                                }}
                                to="/"
                            >
                                <i className="fa-brands fa-opencart text-primary mr-2"></i>
                                <span>FreshCart</span>
                            </Link>
                        </h1>

                        {token ? (
                            <div className="ml-auto md-850:order-3 flex justify-center gap-3 items-center">
                                <Link
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    to="/wishList"
                                    className={`cursor-pointer`}
                                >
                                    {wishListProducts ? (
                                        <i
                                            className={`${
                                                wishListProducts.count == 0 ||
                                                wishListProducts == null
                                                    ? "fa-regular"
                                                    : "fa-solid"
                                            } fa-heart text-xl hover:animate-shake hover:text-primary duration-300`}
                                        ></i>
                                    ) : (
                                        <i className="fa-regular fa-heart text-xl hover:animate-shake hover:text-primary duration-300"></i>
                                    )}
                                </Link>
                                <Link
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    to="/cart"
                                    className={`${cartAnimation} hover:text-slate-700 duration-300 relative cursor-pointer`}
                                >
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                    {cartProducts ? (
                                        <span className="bg-primary font-extrabold  text-sm p-[10px] size-1 rounded-full text-white flex justify-center items-center absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                                            {cartProducts == null
                                                ? 0
                                                : cartProducts.numOfCartItems ||
                                                  0}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}

                        <span
                            className={`md-850:hidden ${
                                !token ? "ml-auto" : ""
                            } `}
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <i className="fa-solid  duration-150 fa-bars cursor-pointer  text-lg"></i>
                        </span>

                        {token ? (
                            <div
                                className="profileUl cursor-pointer order-0 md-850:order-6 shrink-0 flex items-center justify-center"
                                onClick={() => {
                                    setShowProfileUser(!showProfileUser);
                                }}
                            >
                                <div className="inline-block relative text-darkPrimary font-bold cursor-pointer">
                                    <span className="flex items-center gap-1">
                                        <div className="size-8 border-2 border-green-600 rounded-full">
                                            {localStorage.getItem(
                                                "userImage"
                                            ) ? (
                                                <img
                                                    className="size-full object-contain rounded-full"
                                                    src={localStorage.getItem(
                                                        "userImage"
                                                    )}
                                                    alt="User Profile Image"
                                                />
                                            ) : (
                                                <img
                                                    className="size-full object-contain rounded-full"
                                                    src={userFakeImage}
                                                    alt="User Fake Image"
                                                />
                                            )}
                                        </div>
                                    </span>

                                    {showProfileUser ? (
                                        <ul className="absolute top-[35px] right-full -me-4 bg-white w-[280px] shadow-2xl p-3  flex flex-col justify-center items-start rounded-2xl">
                                            <li className="cursor-default pb-0 px-1 flex w-full items-center gap-2 text-sm after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-[90%] after:bg-slate-200 after:h-[2px] relative">
                                                <div className="size-12 border rounded-full">
                                                    {localStorage.getItem(
                                                        "userImage"
                                                    ) ? (
                                                        <img
                                                            className="size-full object-contain rounded-full"
                                                            src={localStorage.getItem(
                                                                "userImage"
                                                            )}
                                                            alt="User Profile Image"
                                                        />
                                                    ) : (
                                                        <img
                                                            className="size-full object-contain rounded-full"
                                                            src={userFakeImage}
                                                            alt="User Fake Image"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex flex-col justify-start">
                                                    <span>
                                                        {usersProfileData?.name}
                                                    </span>
                                                    <span className="text-slate-400 font-normal">
                                                        {
                                                            usersProfileData?.email
                                                        }
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="px-3 mt-3 hover:bg-slate-100 rounded-xl py-1 duration-200 w-full flex">
                                                <div className="flex justify-center gap-2 ">
                                                    <span>
                                                        <i className="fa-solid fa-gear text-sm"></i>
                                                    </span>
                                                    <Link to="profile">
                                                        Profile Setting
                                                    </Link>
                                                </div>
                                            </li>
                                            <li
                                                onClick={logOut}
                                                className="px-3 flex items-center gap-2 w-full  hover:bg-slate-100 rounded-xl py-1"
                                            >
                                                <i
                                                    className="fa-solid rotate-180 fa-arrow-right-from-bracket text-red-500 text-sm"
                                                    title="Log out"
                                                ></i>
                                                <span>Log out</span>
                                            </li>
                                        </ul>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        <ul
                            className={`${
                                open ? "flex" : "hidden"
                            }  max-md-850:w-full max-md-850:flex-col md-850:flex gap-4 nav-links items-center mr-auto text-gray-500`}
                        >
                            <li
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <NavLink className="hover:text-primary" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <NavLink
                                    className="hover:text-primary"
                                    to="products"
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <NavLink
                                    className="hover:text-primary"
                                    to="categories"
                                >
                                    Categories
                                </NavLink>
                            </li>
                            <li
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <NavLink
                                    className="hover:text-primary"
                                    to="brands"
                                >
                                    Brands
                                </NavLink>
                            </li>

                            {token ? (
                                <li
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <NavLink
                                        className="hover:text-primary"
                                        to="allorders"
                                    >
                                        Orders
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                        </ul>

                        <ul
                            className={` ${
                                open ? "flex" : "hidden"
                            } max-md-850:w-full order-4  md-850:flex justify-center gap-3 items-center`}
                        >
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.facebook.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-facebook text-[#0866ff] "></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-instagram text-[#ff115b]"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.twitter.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-x-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.linkedin.com"
                                >
                                    <i className="fa-brands hover:-translate-y-1 duration-300 fa-linkedin text-[#0a66c2]"></i>
                                </a>
                            </li>
                        </ul>

                        <ul
                            className={` ${
                                open ? "flex" : "hidden"
                            }  gap-4 max-md-850:w-full order-5 md-850:flex justify-center items-center  text-gray-500`}
                        >
                            {!token ? (
                                <>
                                    <li>
                                        <NavLink to="/auth/login">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="text-nowrap"
                                            to="/auth/register"
                                        >
                                            Sign up
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
