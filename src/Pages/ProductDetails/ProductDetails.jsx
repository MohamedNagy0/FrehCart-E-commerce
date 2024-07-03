import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { CartContext } from "../../Context/Cart.context";
import BackButton from "../../Components/BackButton/BackButton";
import { userContext } from "../../Context/User.context";
import formatMoney from "../../Helpers/helpers";
import { WishListContext } from "../../Context/WishList.context";
import { ProductContext } from "../../Context/Product.context";
import { Helmet } from "react-helmet";

// https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b
export default function ProductDetails() {
    const [data, setData] = useState(null);
    const { addProductToCart } = useContext(CartContext);
    const { setShowLoginModal } = useContext(ProductContext);
    const { token } = useContext(userContext);
    let { productId } = useParams();
    const {
        addProductToWishList,
        wishListProducts,
        deleteProductFromWishList,
    } = useContext(WishListContext);
    async function getProductDetails() {
        try {
            let { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products/${productId}`
            );
            setData(data.data);
        } catch (error) {}
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    const productImages = data?.images.map((imageUrl) => {
        return {
            original: imageUrl,
            thumbnail: imageUrl,
            originalAlt: data.description,
            thumbnailAlt: data.description,
        };
    });

    return (
        <>
            {data ? (
                <>
                    <Helmet>
                        <title>{data.title}</title>
                        <meta name="description" content={data.description} />
                    </Helmet>

                    <section>
                        <div className="container">
                            <div className="wrapper grid grid-cols-12 gap-6">
                                <div className="col-span-12 md:col-span-4 rounded-xl">
                                    <div className="inner max-md:px-12 ">
                                        <ReactImageGallery
                                            items={productImages}
                                            showNav={false}
                                            showFullscreenButton={false}
                                            showPlayButton={false}
                                            autoPlay={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-8 max-md:p-8 p-4">
                                    <header className="flex flex-col gap-1">
                                        <div className="flex  justify-between items-center">
                                            <h2 className="font-bold text-3xl mb-1">
                                                {data.title}
                                            </h2>
                                            <BackButton />
                                        </div>
                                        <h3 className="text-primary font-semibold text-sm ml-1">
                                            {data.category.name}
                                        </h3>
                                        <div className="text-gray-500 ml-1 text-sm">
                                            <span>{data.brand?.name}</span>
                                            <span className="mx-1">|</span>
                                            <span className="text-green-500">
                                                Available
                                            </span>
                                        </div>
                                        <div>
                                            <i className="fa-solid text-yellow-400 fa-star mr-1"></i>
                                            <span>{data.ratingsAverage}</span>
                                        </div>
                                    </header>
                                    <p className="text-slate-500 my-4 ml-1">
                                        {data.description}
                                    </p>
                                    <footer className="ml-1">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                {data.priceAfterDiscount ? (
                                                    <span className="text-sm  flex items-center  line-through font-light text-slate-400">
                                                        <span>
                                                            {formatMoney(
                                                                data.price
                                                            )}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    ""
                                                )}

                                                {data.priceAfterDiscount ? (
                                                    <span className="text-lg font-semibold flex items-center text-primary">
                                                        <span>
                                                            {formatMoney(
                                                                data.priceAfterDiscount
                                                            )}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span className="text-lg flex items-center font-semibold text-primary">
                                                        <span>
                                                            {formatMoney(
                                                                data.price
                                                            )}
                                                        </span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <button
                                                onClick={() => {
                                                    if (token) {
                                                        wishListProducts.data.find(
                                                            (product) =>
                                                                product.id ==
                                                                productId
                                                        )
                                                            ? deleteProductFromWishList(
                                                                  productId
                                                              )
                                                            : addProductToWishList(
                                                                  productId
                                                              );
                                                    } else {
                                                        setShowLoginModal(true);
                                                        document
                                                            .querySelector(
                                                                "body"
                                                            )
                                                            .classList.add(
                                                                "overflow-hidden"
                                                            );
                                                    }
                                                }}
                                                className="btn-primary"
                                            >
                                                <span className="icon">
                                                    {wishListProducts?.data.find(
                                                        (product) =>
                                                            product.id ==
                                                            productId
                                                    ) ? (
                                                        <i className="fa-solid text-red-600 fa-heart"></i>
                                                    ) : (
                                                        <i className="fa-regular fa-heart"></i>
                                                    )}
                                                </span>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (token) {
                                                        addProductToCart({
                                                            productId: data.id,
                                                        });
                                                    } else {
                                                        setShowLoginModal(true);
                                                        document
                                                            .querySelector(
                                                                "body"
                                                            )
                                                            .classList.add(
                                                                "overflow-hidden"
                                                            );
                                                    }
                                                }}
                                                className="btn-primary w-full group"
                                            >
                                                <i className="fa-solid fa-cart-plus mr-2 group-hover:animate-shake"></i>
                                                <span>ADD TO CART </span>
                                            </button>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
