import axios from "axios";
import React, { createContext, useState } from "react";

export const ProductContext = createContext("");

export default function ProductProvider({ children }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [allProductsList, setAllProductsList] = useState(null);
    const [range, setRange] = useState(50000);
    const [pageNum, setPageNum] = useState(1);
    const [womanCategory, setWomanCategory] = useState("");
    const [manCategory, setManCategory] = useState("");
    const [electronicsCategory, setElectronicsCategory] = useState("");
    const [canonBrand, setCanonBrand] = useState("");
    const [dellBrand, setDellBrand] = useState("");
    const [defactoBrand, setDefactoBrand] = useState("");
    const [pumaBrand, setPumaBrand] = useState("");
    const [priceSort, setPriceSort] = useState("+");

    const allProductsUrl = `https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}&limit=10&sort=${priceSort}price&price[lte]=${range}${canonBrand}${dellBrand}${defactoBrand}${pumaBrand}${manCategory}${womanCategory}${electronicsCategory}`;

    async function getAllProducts() {
        const options = {
            method: "GET",
            url: allProductsUrl,
        };

        let { data } = await axios.request(options);
        setAllProductsList(data);
    }

    return (
        <>
            <ProductContext.Provider
                value={{
                    showLoginModal,
                    setShowLoginModal,
                    getAllProducts,
                    allProductsList,
                    range,
                    setRange,
                    allProductsUrl,
                    priceSort,
                    setPriceSort,
                    pageNum,
                    setPageNum,
                    womanCategory,
                    setWomanCategory,
                    manCategory,
                    setManCategory,
                    electronicsCategory,
                    setElectronicsCategory,
                    canonBrand,
                    setCanonBrand,
                    dellBrand,
                    setDellBrand,
                    defactoBrand,
                    setDefactoBrand,
                    pumaBrand,
                    setPumaBrand,
                }}
            >
                {children}
            </ProductContext.Provider>
        </>
    );
}
