import Loading from "../Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import HomeSilder from "../../Components/HomeSilder/HomeSilder";
import CategorySilder from "../../Components/CategorySilder/CategorySidler";
import Title from "../../Components/Title/Title";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
    function getHomeProducts() {
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/products?limit=12",
        };
        return axios.request(options);
    }

    let { data, isLoading } = useQuery({
        queryKey: ["HomeProducts"],
        queryFn: getHomeProducts,
        staleTime: 50000,
        gcTime: 10000,
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta
                    name="description"
                    content="Welcome to FreshCart, where shopping meets convenience! Our sleek and user-friendly e-commerce platform is designed to enhance your online shopping experience. "
                />
            </Helmet>
            <section>
                <HomeSilder />

                <CategorySilder />

                <div id="products-section">
                    <Title name="Products" />
                </div>

                <div className="wrapper grid grid-cols-12 gap-5 max-md:px-16 pb-4">
                    {data.data.data.map((obj) => {
                        return <ProductCard products={obj} key={obj.id} />;
                    })}
                </div>
            </section>
        </>
    );
}
