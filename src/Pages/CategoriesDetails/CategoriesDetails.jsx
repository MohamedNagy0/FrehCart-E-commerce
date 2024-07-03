import noProductFound from "../../assets/images/no-product-found.png";
import Loading from "../Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../../Components/BackButton/BackButton";

export default function CategoriesDetails() {
    const [specificCategoryProducts, setSpecificCategoryProducts] =
        useState(null);

    let { categoryId } = useParams();

    async function getSpecificCategory() {
        try {
            const options = {
                method: "GET",
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
            };

            let { data } = await axios.request(options);
            setSpecificCategoryProducts(data.data);
        } catch (error) {}
    }

    useEffect(() => {
        getSpecificCategory();
    }, []);
    return (
        <>
            {specificCategoryProducts ? (
                <>
                    <div className="flex px-4 justify-start mb-4">
                        <BackButton />
                    </div>
                    {specificCategoryProducts.length == 0 ? (
                        <div className="flex justify-center items-center">
                            <img src={noProductFound} alt="noProductFound" />
                        </div>
                    ) : (
                        <section className="wrapper grid grid-cols-12 gap-5 max-md:px-16">
                            {specificCategoryProducts.map((obj) => {
                                return (
                                    <ProductCard products={obj} key={obj.id} />
                                );
                            })}
                        </section>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
