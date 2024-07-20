import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import formatMoney from "../../Helpers/helpers";
import { Helmet } from "react-helmet";
import BackButton from "../../Components/BackButton/BackButton";

export default function AllOrders() {
    const { getUserOrders, userOrders } = useContext(CartContext);

    useEffect(() => {
        getUserOrders();
    }, []);

    return (
        <>
            <Helmet>
                <title>AllOrders</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            {userOrders == null ? (
                <Loading />
            ) : userOrders.length == 0 ? (
                <div className=" flex  flex-col justify-center items-center">
                    <header className="flex  justify-center items-center self-start gap-6">
                        <BackButton />
                        <h2 className="flex items-center gap-2">
                            <span className="text-2xl font-bold">
                                Track your orders
                            </span>
                            <i className="fa-solid fa-truck-fast  text-primary text-2xl"></i>
                        </h2>
                    </header>

                    <footer className="p-5 m-16 flex flex-col justify-center items-center gap-2 text-center">
                        <p className="text-nowrap">There are not orders yet.</p>
                        <Link
                            to="/products"
                            className="btn-primary text-nowrap "
                        >
                            Add your first order
                        </Link>
                    </footer>
                </div>
            ) : (
                <section className=" flex flex-col gap-8">
                    <header className="flex  justify-center items-center self-start gap-6">
                        <BackButton />
                        <h2 className="flex items-center gap-2">
                            <span className="text-2xl font-bold">
                                Track your orders
                            </span>
                            <i className="fa-solid fa-truck-fast  text-primary text-2xl"></i>
                        </h2>
                    </header>

                    {userOrders.map((order) => (
                        <div
                            key={order.id}
                            className="p-4 md:p-6 border border-dashed border-slate-300 rounded-xl"
                        >
                            <header className="flex max-xs:flex-col max-xs:items-start justify-between items-center border-b-2 border-slate-100 pb-6">
                                <div className="flex flex-col gap-3 lg:flex-row lg:justify-between grow lg:gap-0">
                                    <h2 className="flex">
                                        <span className="font-semibold text-nowrap">
                                            Transaction Number :{" "}
                                        </span>
                                        <span className="ml-1  text-nowrap">
                                            #{order.id}
                                        </span>
                                    </h2>
                                    <h3 className="flex gap-1 items-center">
                                        <span className="font-semibold">
                                            Placed on :
                                        </span>{" "}
                                        <div>
                                            {order.createdAt.split("T")[0]}
                                        </div>
                                    </h3>
                                    <h3>
                                        <span className="font-semibold">
                                            Payment :{" "}
                                        </span>{" "}
                                        <span>
                                            {order.paymentMethodType == "cash"
                                                ? "Cash"
                                                : "Credit"}{" "}
                                        </span>
                                    </h3>
                                </div>
                                <Link
                                    to="/products"
                                    className="btn-primary max-xs:order-first text-nowrap px-3 py-1 text-sm max-xs:ml-0 max-xs:mb-4 ml-20 max-lg:self-start"
                                >
                                    Add new items
                                </Link>
                            </header>

                            <div className="wrapper grid grid-cols-12  gap-2  mt-6">
                                <div className="max-xs:col-span-12 col-span-8  xl:col-span-10 flex flex-wrap gap-8 ">
                                    {order.cartItems.map((product) => (
                                        <article
                                            key={product._id}
                                            className="flex gap-6"
                                        >
                                            <div className="inner w-[150px] shrink-0 h-full rounded-lg overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={
                                                        product.product
                                                            .imageCover
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full ">
                                                <Link
                                                    to={`/product/${product.product._id}`}
                                                    className="font-medium hover:text-primary max-w-24 duration-300"
                                                >
                                                    <span>{`${
                                                        product.product.title.split(
                                                            " "
                                                        )[0]
                                                    }
                                                    ${
                                                        product.product.title.split(
                                                            " "
                                                        )[1]
                                                    }
                                                    
                                                    
                                                    ${
                                                        product.product.title.split(
                                                            " "
                                                        )[2]
                                                            ? product.product.title.split(
                                                                  " "
                                                              )[2]
                                                            : ""
                                                    }
                                                   `}</span>
                                                </Link>

                                                <div className="text-primary text-base flex items-center ">
                                                    <span className=" text-darkPrimary mr-1">
                                                        Price :
                                                    </span>
                                                    <span className="flex gap-1">
                                                        <span>EGP</span>
                                                        {product.price *
                                                            product.count}
                                                    </span>
                                                </div>
                                                <div className="text-primary text-base ">
                                                    <span className=" text-darkPrimary mr-1">
                                                        Quantity :
                                                    </span>
                                                    <span>{product.count}</span>
                                                </div>

                                                <div className="text-gray-500 flex flex-col text-sm">
                                                    <span>
                                                        {
                                                            product.product
                                                                .category?.name
                                                        }
                                                    </span>

                                                    <span>
                                                        {
                                                            product.product
                                                                .brand?.name
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <div className="self-start max-xs:col-span-12 max-xs:place-content-center max-xs:mt-4 place-content-end col-span-4  xl:col-span-2 flex items-center gap-2 ">
                                    <div className="flex flex-col gap-8 items-center justify-center">
                                        <div className="relative p-[11px] size-1 border  border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                                            <div className=" size-1 p-[7px] rounded-full bg-primary"></div>
                                        </div>
                                        <div className="relative p-[11px] size-1 border  border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                                            <div className=" size-1 p-[7px] rounded-full bg-primary"></div>
                                        </div>
                                        <div
                                            className={`relative p-[11px] size-1 border ${
                                                order.isDelivered
                                                    ? "border-primary"
                                                    : "border-green-500"
                                            }  rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2`}
                                        >
                                            <div
                                                className={`size-1 p-[7px] rounded-full ${
                                                    order.isDelivered
                                                        ? "bg-primary"
                                                        : "bg-green-500"
                                                }`}
                                            ></div>
                                        </div>
                                        <div
                                            className={`relative p-[11px] size-1 border ${
                                                order.isDelivered
                                                    ? "border-primary"
                                                    : "border-red-400"
                                            } rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2`}
                                        >
                                            <div
                                                className={` size-1 p-[7px] rounded-full ${
                                                    order.isDelivered
                                                        ? "bg-primary"
                                                        : "bg-red-400"
                                                } `}
                                            ></div>
                                        </div>
                                        <div
                                            className={`p-[11px] size-1 border rounded-full flex items-center justify-center border-primary ${
                                                order.isDelivered
                                                    ? "border-primary"
                                                    : "border-red-400"
                                            } `}
                                        >
                                            <div
                                                className={`size-1 p-[7px] rounded-full ${
                                                    order.isPaid
                                                        ? "bg-primary"
                                                        : "bg-red-400"
                                                }`}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-8">
                                        <h2>Ordered</h2>
                                        <h2>Confirmed</h2>
                                        <h2>Out for delivery</h2>
                                        <h2>Delivered</h2>
                                        <h2>Paid</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col gap-2">
                                <h2 className="flex items-center gap-1">
                                    <span className="font-semibold">
                                        Products Quantity :{" "}
                                    </span>

                                    <span className="font-bold text-primary">
                                        {order.cartItems.length}
                                    </span>
                                </h2>
                                <h2 className="flex gap-1 items-center">
                                    <span className="font-semibold">
                                        Shipping Price :{" "}
                                    </span>
                                    <span className="flex items-center text-primary">
                                        <span className="self-start text-xs">
                                            EGP
                                        </span>
                                        <span className="flex  font-bold">
                                            {order.shippingPrice}
                                        </span>
                                    </span>
                                </h2>
                                <h2 className="flex gap-1 items-center">
                                    <span className="font-semibold">
                                        taxes :{" "}
                                    </span>
                                    <span className="flex items-center text-primary">
                                        <span className="self-start text-xs">
                                            EGP
                                        </span>
                                        <span className="flex  font-bold">
                                            {order.taxPrice}
                                        </span>
                                    </span>
                                </h2>
                                <h2 className="flex items-center gap-1">
                                    <span className="font-semibold text-xl">
                                        Total Order Price :{" "}
                                    </span>
                                    <span className="flex text-primary">
                                        <span className="font-bold text-xl">
                                            {" "}
                                            {formatMoney(order.totalOrderPrice)}
                                        </span>
                                    </span>
                                </h2>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
}
