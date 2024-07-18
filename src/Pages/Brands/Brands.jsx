import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
    const [data, setData] = useState(null);
    const [productLimitation, setProductLimitation] = useState(30);

    async function getAllBrands() {
        try {
            const options = {
                method: "GET",
                url: `https://ecommerce.routemisr.com/api/v1/brands?limit=${productLimitation}`,
            };

            let { data } = await axios.request(options);
            setData(data);
        } catch (error) {}
    }

    useEffect(() => {
        getAllBrands();
    }, [productLimitation]);
    return (
        <>
            <Helmet>
                <title>Brands</title>
                <meta
                    name="description"
                    content="Welcome to our Brands page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            {data ? (
                <>
                    <h2 className="text-center border-b border-t py-2 text-primary text-lg">
                        Shop by Brand
                    </h2>
                    {data.data.length == 0 ? (
                        <p className="text-center mt-8 text-xl">
                            <span className=" text-white inline-block   bg-yellow-400 py-3 px-5">
                                We apologize, there is an error that is being
                                fixed
                            </span>
                        </p>
                    ) : (
                        ""
                    )}

                    <section className="wrapper grid grid-cols-12 gap-2 px-2 pb-16 mt-4">
                        {data.data.map((brand) => (
                            <Link
                                data-aos="zoom-in-up"
                                data-aos-duration="500"
                                to={`/brand/${brand._id}`}
                                key={brand._id}
                                className="col-span-4 md:col-span-3 lg:md:col-span-2  flex items-center justify-center "
                            >
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="size-36 bg-white rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:-translate-y-8 duration-500"
                                />
                            </Link>
                        ))}
                    </section>

                    {productLimitation == 30 && data.data.length != 0 ? (
                        <div className="text-center max-xs:pb-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setProductLimitation(
                                        productLimitation + 20
                                    );
                                }}
                                className="btn-primary text-sm"
                            >
                                Show More
                            </button>
                        </div>
                    ) : (
                        ""
                    )}

                    {productLimitation == 50 && data.data.length != 0 ? (
                        <div className="text-center max-xs:pb-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setProductLimitation(
                                        productLimitation - 20
                                    );
                                }}
                                className="btn-primary text-sm"
                            >
                                Show less
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
