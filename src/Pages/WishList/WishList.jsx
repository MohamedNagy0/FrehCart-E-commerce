import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishList.context";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import BackButton from "../../Components/BackButton/BackButton";
import formatMoney from "../../Helpers/helpers";
import { CartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function WishList() {
    const [placeHolderImage, setPlaceHolderImage] = useState("block");
    const [imgShow, setImgShow] = useState("hidden");

    const {
        deleteAllWishList,
        getProductsToWishList,
        wishListProducts,
        deleteProductFromWishList,
    } = useContext(WishListContext);

    const { addProductToCart, setIsOpen } = useContext(CartContext);
    const { token } = useContext(userContext);
    useEffect(() => {
        getProductsToWishList();
    }, []);
    return (
        <>
            <Helmet>
                <title>WishList</title>
                <meta
                    name="description"
                    content="Welcome to our WishList page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            {wishListProducts ? (
                <>
                    <section className="bg-light p-5 mx-4  rounded-3xl">
                        <header className="flex items-center gap-6">
                            <BackButton />
                            <h2 className="flex items-center gap-2">
                                <span className="text-2xl font-bold">
                                    Favorite Products
                                </span>
                                <i className="fa-brands fa-gratipay text-xl text-primary"></i>
                            </h2>
                        </header>

                        {wishListProducts.count == 0 ? (
                            <footer className="p-5 m-16 flex flex-col justify-center items-center gap-2 text-center">
                                <p className="text-nowrap">
                                    There are not products yet.
                                </p>
                                <Link
                                    to="/products"
                                    className="btn-primary text-nowrap "
                                >
                                    Add your first product to favorite
                                </Link>
                            </footer>
                        ) : (
                            wishListProducts.data.map((product, index) => (
                                <article
                                    key={product._id}
                                    className={`wrapper grid grid-cols-12 gap-6 mt-4 ${
                                        index !=
                                        wishListProducts.data.length - 1
                                            ? "border-b-2"
                                            : ""
                                    } pb-8 mx-3`}
                                >
                                    <div className="col-span-4 md:col-span-3 lg:col-span-2">
                                        <div className="inner rounded-3xl overflow-hidden  border-2 ">
                                            <img
                                                className={`w-full ${imgShow}`}
                                                src={product.imageCover}
                                                alt={product.title}
                                            />
                                            <div
                                                className={`w-full h-[150px] bg-gray-300 animate-pulse ${placeHolderImage}`}
                                            ></div>
                                            <div className="hidden">
                                                {setTimeout(() => {
                                                    setPlaceHolderImage(
                                                        "hidden"
                                                    );
                                                    if (
                                                        placeHolderImage ==
                                                        "hidden"
                                                    ) {
                                                        setImgShow("block");
                                                    }
                                                }, 850)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-8  md:col-span-9 lg:col-span-10  flex  max-lg:flex-col max-md:gap-4 justify-center items-start md:items-center ">
                                        <div className="flex flex-col gap-1 w-full ">
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="font-bold text-xl max-lg:line-clamp-1 hover:text-primary duration-300"
                                            >
                                                {product.title}
                                            </Link>
                                            <div className="flex  gap-2 items-center">
                                                <span className="mr1-1">
                                                    Rate :
                                                </span>
                                                <span className="text-primary">
                                                    <i className="fa-solid text-yellow-400 fa-star mr-1"></i>
                                                    {product.ratingsAverage}
                                                </span>
                                            </div>

                                            <div className="text-primary text-base ">
                                                <span className=" text-darkPrimary mr-1">
                                                    Price :
                                                </span>
                                                <span>
                                                    {formatMoney(product.price)}
                                                </span>
                                            </div>

                                            <div className="text-gray-500 text-sm">
                                                <span>
                                                    {product.category?.name}
                                                </span>
                                                <span className="mx-1">|</span>
                                                <span>
                                                    {product.brand?.name}
                                                </span>
                                                <span className="mx-1">|</span>
                                                <span className="text-green-500">
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex max-xs:flex-col items-center gap-3">
                                            <div>
                                                <button
                                                    onClick={() => {
                                                        if (token) {
                                                            deleteProductFromWishList(
                                                                product.id
                                                            );
                                                            addProductToCart({
                                                                productId:
                                                                    product.id,
                                                            });
                                                        } else {
                                                            setIsOpen(true);
                                                            document
                                                                .querySelector(
                                                                    "body"
                                                                )
                                                                .classList.add(
                                                                    "overflow-hidden"
                                                                );
                                                        }
                                                    }}
                                                    className="btn-primary gap-1 rounded-3xl text-sm w-full group flex items-center"
                                                >
                                                    <i className="fa-solid fa-cart-plus  group-hover:animate-shake"></i>
                                                    <span className="text-nowrap">
                                                        ADD TO CART
                                                    </span>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    withReactContent(Swal).fire(
                                                        {
                                                            title: "Are you sure?",
                                                            text: "Do you want to remove this product from your wishlist ?",
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonColor:
                                                                "#09c",
                                                            confirmButtonText:
                                                                "Yes, clear it!",
                                                            iconColor: "#09c",
                                                            preConfirm: () => {
                                                                deleteProductFromWishList(
                                                                    product.id
                                                                );
                                                            },
                                                        }
                                                    );
                                                }}
                                                className="btn-primary px-4  flex items-center gap-1 rounded-3xl group text-sm cursor-pointer  py-2 bg-red-600 hover:bg-red-500 duration-300"
                                            >
                                                <i className="fa-solid fa-trash-can  group-hover:animate-shake"></i>
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}

                        {wishListProducts.data.length != 0 ? (
                            <button
                                onClick={() => {
                                    withReactContent(Swal).fire({
                                        title: "Are you sure?",
                                        text: "Do you want to remove your products wishlist ?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#09c",
                                        confirmButtonText: "Yes, clear it!",
                                        iconColor: "#09c",
                                        preConfirm: () => {
                                            deleteAllWishList();
                                        },
                                    });
                                }}
                                className="btn-primary mx-auto px-4  mt-3 flex items-center gap-1 rounded-3xl group text-sm cursor-pointer  py-2 bg-red-600 hover:bg-red-500 duration-300"
                            >
                                <i className="fa-solid fa-trash-can  group-hover:animate-shake"></i>
                                <span>Remove All</span>
                            </button>
                        ) : (
                            ""
                        )}
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
