import Loading from "../../Pages/Loading/Loading";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "./Category.module.css";
import useCategories from "../../Hooks/useCategories";

//https://ecommerce.routemisr.com/api/v1/categories

export default function CategorySilder() {
    const { data, isLoading } = useCategories();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <section className={`max-md:px-2 ${styles.categorySlider}`}>
                <h2 className="font-semibold text-lg -mt-3 mb-2">
                    Shope now by popular categories
                </h2>
                <div className="bg-light">
                    <Swiper
                        slidesPerView={2}
                        style={{
                            position: "relative",
                            "--swiper-navigation-color": "#fff",
                            "--swiper-navigation-size": "18px",
                            "--swiper-navigation-sides-offset": "20px",
                        }}
                        lazy={"true"}
                        spaceBetween={0}
                        loop={true}
                        navigation={true}
                        pagination={false}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}
                        modules={[Navigation]}
                        className="mySwiper categorySlider"
                    >
                        <span className="bg-black opacity-0  right-swiper bg-opacity-25 absolute z-[3] duration-300 top-0 right-0 bottom-0  w-[50px]"></span>
                        <span className="bg-black opacity-0 left-swiper bg-opacity-25 absolute z-[3] duration-300 top-0 left-0 bottom-0  w-[50px]"></span>
                        {data.data.data.map((obj) => {
                            return (
                                <SwiperSlide key={obj._id}>
                                    <Link to={`/category/${obj._id}`}>
                                        <img
                                            src={obj.image}
                                            className="w-full h-72 object-cover cursor-pointer"
                                        />
                                    </Link>
                                    <h2 className="my-2 font-semibold text-center">
                                        {obj.name}
                                    </h2>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </section>
        </>
    );
}
