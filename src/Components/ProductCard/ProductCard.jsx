import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import formatMoney from "../../Helpers/helpers";
import { WishListContext } from "../../Context/WishList.context";
import { ProductContext } from "../../Context/Product.context";
import { BiCartAdd } from "react-icons/bi";

export default function ProductCard({ products }) {
    const [finaleSale, setFinaleSale] = useState(null);
    const { addProductToCart } = useContext(CartContext);
    const { token } = useContext(userContext);
    const { setShowLoginModal } = useContext(ProductContext);
    const {
        addProductToWishList,
        wishListProducts,
        deleteProductFromWishList,
    } = useContext(WishListContext);

    let {
        category,
        ratingsAverage,
        price,
        priceAfterDiscount,
        title,
        ratingsQuantity,
        id,
        brand,
        imageCover,
    } = products;

    const calcSale = (price, priceAfterDiscount) => {
        const calculation = (priceAfterDiscount / price) * 100;
        const sale = 100 - calculation;
        setFinaleSale(Math.floor(sale));
    };

    useEffect(() => {
        calcSale(price, priceAfterDiscount);
    }, []);

    return (
        <>
            <article className="productCard group  flex flex-col gap-3 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3  shadow-md rounded-md overflow-hidden">
                <header className="relative">
                    <Link to={`/product/${id}`}>
                        <img
                            src={imageCover}
                            className="w-full"
                            alt={ratingsQuantity.description}
                        />
                    </Link>
                    {priceAfterDiscount ? (
                        <span className="size-1 p-7 flex justify-center items-center bg-darkPrimary rounded-full rounded-tl-none text-primary  absolute top-0 left-0">
                            <span className=" flex flex-col   items-center font-bold text-orange-400">
                                <span className="text-sm flex items-center font-normal text-nowrap">
                                    - {finaleSale}%
                                </span>
                                <span className="text-sm text-primary">
                                    Sale
                                </span>
                            </span>
                        </span>
                    ) : (
                        ""
                    )}

                    <div className="layer -translate-y-1/2  flex justify-center items-center gap-4 absolute top-1/2 left-1/2  -translate-x-1/2">
                        <div
                            onClick={() => {
                                if (token) {
                                    wishListProducts.data.find(
                                        (product) => product.id == id
                                    )
                                        ? deleteProductFromWishList(id)
                                        : addProductToWishList(id);
                                } else {
                                    setShowLoginModal(true);
                                    document
                                        .querySelector("body")
                                        .classList.add("overflow-hidden");
                                }
                            }}
                            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100  hover:bg-darkPrimary duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            {wishListProducts?.data.find(
                                (product) => product.id == id
                            ) ? (
                                <i className="fa-solid text-red-600 fa-heart"></i>
                            ) : (
                                <i className="fa-regular fa-heart"></i>
                            )}
                        </div>

                        <div
                            onClick={() => {
                                if (token) {
                                    addProductToCart({ productId: id });
                                } else {
                                    setShowLoginModal(true);
                                    document
                                        .querySelector("body")
                                        .classList.add("overflow-hidden");
                                }
                            }}
                            className="icon  opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100  hover:bg-darkPrimary duration-700 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            <BiCartAdd size="1.5rem" />
                        </div>
                        <Link
                            to={`/product/${id}`}
                            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100  hover:bg-darkPrimary duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            <i className="fa-solid fa-eye"></i>
                        </Link>
                    </div>
                </header>
                <footer className="py-6 px-5">
                    <header>
                        <h2 className="line-clamp-1 text-primary">
                            <Link
                                className="hover:text-orange-500 duration-300"
                                to={`/product/${id}`}
                            >
                                {title}
                            </Link>
                        </h2>

                        <h2 className="line-clamp-1 font-semibold my-1">
                            {category.name}
                        </h2>
                        <div className="text-gray-500  text-sm">
                            <span>{brand?.name}</span>
                            <span className="mx-1">|</span>
                            <span className="text-green-500">Available</span>
                        </div>
                    </header>
                    <footer className="flex justify-between mt-2 items-center">
                        <span className="text-primary flex  items-center">
                            {formatMoney(price)}
                        </span>
                        <div className="rating flex gap-2 items-center">
                            <span>
                                <i className="fa-solid fa-star text-rating"></i>
                            </span>
                            <span>{ratingsAverage}</span>
                        </div>
                    </footer>
                </footer>
            </article>
        </>
    );
}
