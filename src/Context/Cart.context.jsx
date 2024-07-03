import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext("");

export default function CartProvider({ children }) {
    const { token } = useContext(userContext);
    const [cartProducts, setCartProducts] = useState(null);
    const [userOrders, setUserOrders] = useState(null);
    const [cartAnimation, setCartAnimation] = useState(false);

    async function addProductToCart({ productId }) {
        let toastId;
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId,
                },
            };

            toastId = toast.loading("Adding your product...", {
                position: "top-right",
                style: {
                    marginTop: "48px",
                },
            });

            setCartAnimation(false);

            let { data } = await axios.request(options);

            setCartAnimation("animate-cart");

            toast.dismiss(toastId);
            setCartProducts(data);
            toast(<span className="text-sm block">{data.message}</span>, {
                duration: 2000,
                position: "top-right",
                style: {
                    marginTop: "48px",
                },
                icon: (
                    <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                        <i className="fa-solid fa-check text-white"></i>
                    </span>
                ),
            });
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(
                error.response.status == 500
                    ? "Not Available Now"
                    : "Try later please",
                {
                    position: "top-right",
                    style: {
                        marginTop: "48px",
                    },
                }
            );
        }
    }

    async function getUserOrders() {
        let jwtObject = {};
        if (token) {
            jwtObject = jwtDecode(token);
        }
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${jwtObject.id}`,
                method: "GET",
            };
            const { data } = await axios.request(options);

            setUserOrders(data);
        } catch (error) {}
    }

    async function getAllProductsCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token,
                },
            };

            let { data } = await axios.request(options);
            getUserOrders();

            if (data.numOfCartItems === 0) {
                setCartProducts([]);
            } else {
                setCartProducts(data);
            }
        } catch (error) {
            if (error.response.data.message.includes("No cart")) {
                setCartProducts([]);
            }
        }
    }

    async function deleteSingleProduct(productId) {
        let toastId;

        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token,
                },
            };
            toastId = toast.loading("Deleting your product...", {
                position: "top-right",
                style: {
                    marginTop: "50px",
                },
            });
            setCartAnimation(false);

            let { data } = await axios.request(options);
            console.log(data);

            setCartAnimation("animate-cart");

            toast.dismiss(toastId);
            toast(
                <span className="text-sm">Product Removed successfully</span>,
                {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        marginTop: "50px",
                    },
                    icon: (
                        <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                            <i className="fa-solid fa-check text-white"></i>
                        </span>
                    ),
                }
            );

            if (data.numOfCartItems === 0) {
                setCartProducts([]);
            } else {
                setCartProducts(data);
            }
        } catch (error) {}
    }

    async function clearAllCartProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: "DELETE",
                headers: {
                    token,
                },
            };

            setCartAnimation(false);

            let { data } = await axios.request(options);

            setCartAnimation("animate-cart");

            setCartProducts([]);
        } catch (error) {}
    }

    async function updateProductCount({ productId, productCount }) {
        let toastId;

        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token,
                },
                data: {
                    count: productCount,
                },
            };
            toastId = toast.loading("waiting...", {
                position: "top-right",
                style: {
                    marginTop: "48px",
                },
            });

            setCartAnimation(false);
            let { data } = await axios.request(options);
            setCartAnimation("animate-cart");

            toast.dismiss(toastId);
            toast(
                `${
                    productCount == 1
                        ? `You have ${productCount} piece now`
                        : `You have ${productCount} pieces now`
                } `,
                {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        marginTop: "48px",
                    },
                    icon: (
                        <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                            <i className="fa-solid fa-check text-white"></i>
                        </span>
                    ),
                }
            );
            setCartProducts(data);
        } catch (error) {}
    }

    return (
        <>
            <CartContext.Provider
                value={{
                    addProductToCart,
                    getAllProductsCart,
                    cartProducts,
                    setCartProducts,
                    deleteSingleProduct,
                    updateProductCount,
                    clearAllCartProducts,
                    cartAnimation,
                    userOrders,
                    getUserOrders,
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    );
}
