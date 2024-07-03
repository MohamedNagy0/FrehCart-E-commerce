import image1 from "../../assets/images/product1.jpg";
import image2 from "../../assets/images/product2.jpg";
import image3 from "../../assets/images/product3.jpg";
import image4 from "../../assets/images/product4.jpg";
import image5 from "../../assets/images/product5.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./HomeSlider.module.css";

export default function HomeSilder() {
    const silderImages = [
        { img: image1, id: 1 },
        { img: image2, id: 2 },
        { img: image3, id: 3 },
    ];
    return (
        <>
            <section className={`mb-6 ${styles.homeSlider} max-md:px-2`}>
                <div className="wrapper grid grid-cols-12">
                    <div className="col-span-12 md:col-span-8">
                        <Swiper
                            style={{
                                height: "100%",
                                "--swiper-navigation-color": "#fff",
                                "--swiper-navigation-size": "18px",
                                "--swiper-navigation-sides-offset": "25px",
                                "--swiper-pagination-color": "#09c",
                            }}
                            loop={true}
                            lazy={"true"}
                            spaceBetween={0}
                            pagination={{
                                dynamicBullets: true,
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {silderImages.map((obj, index) => {
                                return (
                                    <SwiperSlide
                                        onClick={() => {
                                            console.log(index);
                                        }}
                                        key={obj.id}
                                        style={{ height: "100%" }}
                                    >
                                        <div
                                            style={{
                                                backgroundImage: `url(${obj.img})`,
                                            }}
                                            className={`w-full h-[400px] md:h-full bg-center bg-cover cursor-pointer`}
                                        >
                                            {index == 0 ? (
                                                <div className="flex flex-col p-5">
                                                    <h2 className="text-3xl font-extrabold text-primary mb-2 Ubuntu">
                                                        <span className="bg-white rounded-full text-darkPrimary px-3 py-2">
                                                            <i className="fa-brands fa-opencart text-primary mr-2"></i>{" "}
                                                            Fresh Cart
                                                        </span>
                                                    </h2>
                                                    <p className="text-sm Ubuntu text-white font-semibold max-w-xl mt-4 shadow-inner bg-white bg-opacity-10 p-5 rounded-lg">
                                                        Whether you’re looking
                                                        for the freshest
                                                        produce, pantry staples,
                                                        or specialty items,
                                                        FreshCart brings the
                                                        supermarket to you,
                                                        redefining the way you
                                                        shop for groceries.
                                                    </p>
                                                    <div className="mt-8">
                                                        <a
                                                            href="#products-section"
                                                            className="btn-primary capitalize rounded-full Ubuntu"
                                                        >
                                                            Get Started
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <div className="col-span-12 max-md:flex md:col-span-4 bg-teal-700">
                        <div>
                            <img
                                src={image5}
                                className="w-full h-full"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                src={image4}
                                className="w-full h-full"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
