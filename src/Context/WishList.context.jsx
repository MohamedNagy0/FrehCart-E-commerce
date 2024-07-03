import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext("");

export default function WishListProvider({ children }) {
    const { token } = useContext(userContext);
    const [wishListProducts, setWishListProducts] = useState(null);

    async function addProductToWishList(productId) {
        let toastId;

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId,
                },
            };

            toastId = toast.loading("Adding your product to wishlist...", {
                position: "top-right",
                style: {
                    marginTop: "50px",
                },
            });
            let { data } = await axios.request(options);

            if (data.status == "success") {
                getProductsToWishList();
                setTimeout(() => {
                    toast.dismiss(toastId);
                    toast(
                        <span className="text-sm block">{data.message}</span>,

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
                }, 250);
            }
        } catch (error) {}
    }

    async function getProductsToWishList() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "GET",
                headers: {
                    token,
                },
            };

            let { data } = await axios.request(options);
            setWishListProducts(data);
        } catch (error) {}
    }

    async function deleteProductFromWishList(productId) {
        let toastId;

        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                method: "DELETE",
                headers: {
                    token,
                },
            };

            toastId = toast.loading("Removing Product from wishlist", {
                position: "top-right",
                style: {
                    marginTop: "50px",
                },
            });

            let { data } = await axios.request(options);

            if (data.status == "success") {
                getProductsToWishList();

                setTimeout(() => {
                    toast.dismiss(toastId);
                    toast(<span className="text-sm">{data.message}</span>, {
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
                    });
                }, 800);
            }
        } catch (error) {}
    }

    function deleteAllWishList() {
        // I did this fun to help the user clean all wishlist easily, but I'ts not the best way because I don't have "End Point" for that
        wishListProducts.data.map((product) =>
            deleteProductFromWishList(product.id)
        );
    }

    return (
        <>
            <WishListContext.Provider
                value={{
                    addProductToWishList,
                    getProductsToWishList,
                    wishListProducts,
                    deleteProductFromWishList,
                    deleteAllWishList,
                }}
            >
                {children}
            </WishListContext.Provider>
        </>
    );
}
