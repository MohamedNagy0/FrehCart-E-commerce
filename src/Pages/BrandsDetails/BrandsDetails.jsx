import noProductFound from "../../assets/images/no-product-found.png";
import Loading from "../Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../../Components/BackButton/BackButton";

export default function BrandsDetails() {
    const [specificBrandProducts, setSpecificBrandProducts] = useState(null);
    let { brandId } = useParams();

    async function getSpecificBrand() {
        try {
            const options = {
                method: "GET",
                url: `https://ecommerce.routemisr.com/api/v1/products?brand[in]=${brandId}`,
            };

            let { data } = await axios.request(options);
            setSpecificBrandProducts(data.data);
        } catch (error) {}
    }

    useEffect(() => {
        getSpecificBrand();
    }, []);
    return (
        <>
            {specificBrandProducts ? (
                <>
                    <div className="mb-4 px-4  flex justify-start ">
                        <BackButton />
                    </div>
                    {specificBrandProducts.length == 0 ? (
                        <div className="flex justify-center items-center">
                            <img src={noProductFound} alt="noProductFound" />
                        </div>
                    ) : (
                        <section className="wrapper grid grid-cols-12 gap-5 max-md:px-16 pb-8">
                            {specificBrandProducts.map((obj) => {
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
