import { useContext, useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import formatMoney from "../../Helpers/helpers";
import BackButton from "../../Components/BackButton/BackButton";
import filterImg from "../../assets/images/filter.png";
import { ProductContext } from "../../Context/Product.context";
import { Helmet } from "react-helmet";

export default function Products() {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");

    const {
        getAllProducts,
        allProductsList,
        setRange,
        range,
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
    } = useContext(ProductContext);

    const filterData = allProductsList?.data.filter((item) =>
        item.title.toLowerCase().includes(searchInputValue.toLowerCase())
    );

    useEffect(() => {
        getAllProducts();
    }, [allProductsUrl]);

    return (
        <>
            <Helmet>
                <title>Products</title>
                <meta
                    name="description"
                    content="Welcome to our Products page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            {allProductsList ? (
                <>
                    (
                    <aside
                        onClick={(e) => {
                            if (e.target == document.querySelector(".filter")) {
                                setShowFilterModal(!showFilterModal);
                            }
                        }}
                        className={`${
                            showFilterModal ? "translate-x-0" : ""
                        } bg-white -translate-x-full  filter duration-500 flex shadow-md rounded-lg flex-col gap-3 p-4 fixed top-0 bottom-0 left-0 max-xs:w-[250px] w-[350px] h-full z-50`}
                    >
                        <header className="flex items-center justify-between">
                            <h2 className="text-xl font-bold  uppercase">
                                <span className="relative after:bg-darkPrimary after:absolute after:top-full after:left-0 after:w-full after:h-[1px]">
                                    Sort
                                </span>
                            </h2>
                            <i
                                onClick={() => {
                                    setShowFilterModal(!showFilterModal);
                                }}
                                className="fa-solid fa-xmark cursor-pointer"
                            ></i>
                        </header>

                        <div>
                            <h2 className="font-semibold">Price :</h2>
                            <form>
                                <div
                                    onClick={() => {
                                        setPriceSort("+");
                                    }}
                                >
                                    <div
                                        className="cursor-pointer flex gap-2 items-center"
                                        htmlFor="priceSmaller"
                                    >
                                        <span>smaller to Bigger</span>
                                        <span className="size-3 rounded-full p-[6px] flex justify-center items-center border border-primary ">
                                            {priceSort == "+" ? (
                                                <span className="size-1 rounded-full p-[3px] inline-block bg-primary"></span>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setPriceSort("-");
                                    }}
                                >
                                    <label
                                        className="cursor-pointer flex gap-2 items-center"
                                        htmlFor="priceBigger"
                                    >
                                        <span>Bigger to smaller</span>
                                        <span className="size-3 rounded-full p-[6px] border border-primary flex justify-center items-center">
                                            {priceSort == "-" ? (
                                                <span className="size-1 rounded-full p-[3px] inline-block bg-primary"></span>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </label>
                                </div>
                            </form>
                        </div>

                        <h2 className="text-xl font-bold  uppercase">
                            <span className="relative after:bg-darkPrimary after:absolute after:top-full after:left-0 after:w-full after:h-[1px]">
                                Filter
                            </span>
                        </h2>

                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold">Price Range :</h3>
                            <div>
                                <input
                                    type="range"
                                    min={149}
                                    max={50000}
                                    value={range}
                                    onChange={(e) => setRange(e.target.value)}
                                />
                            </div>

                            <p className="flex items-center gap-1">
                                <span className="text-sm">
                                    Max Salary now is
                                </span>
                                <span>({formatMoney(range)})</span>
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Categories</h3>
                            <ul className="flex flex-col items-start gap-2">
                                <li
                                    onClick={() => {
                                        if (womanCategory == "") {
                                            setWomanCategory(
                                                "&category[in]=6439d58a0049ad0b52b9003f"
                                            );
                                        } else {
                                            setWomanCategory("");
                                        }
                                    }}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    {" "}
                                    <span className="inline-block">
                                        <span
                                            className={`${
                                                womanCategory != ""
                                                    ? "bg-primary"
                                                    : ""
                                            } size-1 p-[6px] border   border-primary duration-300  group-hover:text-white text-white flex justify-center items-center`}
                                        >
                                            {womanCategory != "" ? (
                                                <i className="fa-solid fa-check  text-[10px]"></i>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </span>
                                    <span className="text-sm">
                                        Women's Fashion
                                    </span>
                                </li>

                                <li
                                    onClick={() => {
                                        if (manCategory == "") {
                                            setManCategory(
                                                "&category[in]=6439d5b90049ad0b52b90048"
                                            );
                                        } else {
                                            setManCategory("");
                                        }
                                    }}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    <span className="inline-block">
                                        <span
                                            className={`${
                                                manCategory != ""
                                                    ? "bg-primary"
                                                    : ""
                                            } size-1 p-[6px] border border-primary duration-300  group-hover:text-white text-white  flex justify-center items-center`}
                                        >
                                            {manCategory != "" ? (
                                                <i className="fa-solid fa-check text-[10px]"></i>
                                            ) : (
                                                ""
                                            )}{" "}
                                        </span>
                                    </span>
                                    <span className="text-sm">
                                        Men's Fashion
                                    </span>
                                </li>

                                <li
                                    onClick={() => {
                                        if (electronicsCategory == "") {
                                            setElectronicsCategory(
                                                "&category[in]=6439d2d167d9aa4ca970649f"
                                            );
                                        } else {
                                            setElectronicsCategory("");
                                        }
                                    }}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    <span className="inline-block">
                                        <span
                                            className={`${
                                                electronicsCategory != ""
                                                    ? "bg-primary"
                                                    : ""
                                            } size-1 p-[6px] border border-primary duration-300  group-hover:text-white text-white  flex justify-center items-center`}
                                        >
                                            {electronicsCategory != "" ? (
                                                <i className="fa-solid fa-check text-[10px]"></i>
                                            ) : (
                                                ""
                                            )}{" "}
                                        </span>
                                    </span>
                                    <span className="text-sm">Electronics</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Brands</h3>
                            <ul className="flex flex-col items-start gap-2">
                                <li
                                    onClick={() => {
                                        if (canonBrand == "") {
                                            setCanonBrand(
                                                "&brand=64089fe824b25627a25315d1"
                                            );
                                        } else {
                                            setCanonBrand("");
                                        }
                                    }}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    {" "}
                                    <span className="inline-block">
                                        <span
                                            className={`${
                                                canonBrand != ""
                                                    ? "bg-primary"
                                                    : ""
                                            } size-1 p-[6px] border   border-primary duration-300  group-hover:text-white text-white flex justify-center items-center`}
                                        >
                                            {canonBrand != "" ? (
                                                <i className="fa-solid fa-check  text-[10px]"></i>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </span>
                                    <span className="text-sm">Canon</span>
                                </li>

                                <li
                                    onClick={() => {
                                        if (dellBrand == "") {
                                            setDellBrand(
                                                "&brand=64089faf24b25627a25315cd"
                                            );
                                        } else {
                                            setDellBrand("");
                                        }
                                    }}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    <span className="inline-block">
                                        <span
                                            className={`${
                                                dellBrand != ""
                                                    ? "bg-primary"
                                                    : ""
                                            } size-1 p-[6px] border border-primary duration-300  group-hover:text-white text-white  flex justify-center items-center`}
                                        >
                                            {dellBrand != "" ? (
                                                <i className="fa-solid fa-check text-[10px]"></i>
                                            ) : (
                                                ""
                                            )}{" "}
                                        </span>
                                    </span>
                                    <span className="text-sm">Dell</span>
                                </li>

                                <li
                                    onClick={() => {
                                        if (defactoBrand == "") {
                                            setDefactoBrand(
                                                "&brand=64089bbe24b25627a253158b"
                                            );
                                        } else {
                                            setDefactoBrand("");
                                        }
                                    }}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    <span className="inline-block">
                                        <span
                                            className={`${
                                                defactoBrand != ""
                                                    ? "bg-primary"
                                                    : ""
                                            } size-1 p-[6px] border border-primary duration-300  group-hover:text-white text-white  flex justify-center items-center`}
                                        >
                                            {defactoBrand != "" ? (
                                                <i className="fa-solid fa-check text-[10px]"></i>
                                            ) : (
                                                ""
                                            )}{" "}
                                        </span>
                                    </span>
                                    <span className="text-sm">Defacto</span>
                                </li>
                                <li
                                    onClick={() => {
                                        if (pumaBrand == "") {
                                            setPumaBrand(
                                                "&brand=64089d5c24b25627a253159f"
                                            );
                                        } else {
                                            setPumaBrand("");
                                        }
                                    }}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    <span className="inline-block">
                                        <span
                                            className={`${
                                                pumaBrand != ""
                                                    ? "bg-primary"
                                                    : ""
                                            } size-1 p-[6px] border border-primary duration-300  group-hover:text-white text-white  flex justify-center items-center`}
                                        >
                                            {pumaBrand != "" ? (
                                                <i className="fa-solid fa-check text-[10px]"></i>
                                            ) : (
                                                ""
                                            )}{" "}
                                        </span>
                                    </span>
                                    <span className="text-sm">Puma</span>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    )
                    <nav className="sticky top-0 left-0 right-0 mt-[-80px] max-xs:flex-wrap pt-[65px] bg-light px-4 pb-3 rounded-3xl bg- z-30 flex  items-center justify-between mb-3 gap-2 sm:gap-6">
                        <div className="max-xs:w-full">
                            <BackButton />
                        </div>
                        <div className="relative max-xs:flex-grow max-xs:order-first ">
                            <label
                                htmlFor="search"
                                className="absolute top-1/2 -translate-y-1/2 right-[15px]"
                            >
                                <i className="fa-solid fa-magnifying-glass text-slate-300 text-sm"></i>
                            </label>
                            <input
                                autoComplete="off"
                                id="search"
                                className="form-control rounded-3xl px-3 placeholder:text-sm max-xs:w-full "
                                type="text"
                                value={searchInputValue}
                                placeholder="Search"
                                onChange={(e) => {
                                    setSearchInputValue(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            onClick={() => {
                                setShowFilterModal(!showFilterModal);
                            }}
                            className="size-8 cursor-pointer max-xs:order-first"
                        >
                            <img
                                src={filterImg}
                                className="size-full"
                                alt="filter img"
                            />
                        </div>
                    </nav>
                    <section className="wrapper mb-28 max-sm:mb-40  grid grid-cols-12 gap-5 max-md:px-16">
                        {filterData.map((obj) => (
                            <ProductCard products={obj} key={obj.id} />
                        ))}
                    </section>
                    {filterData.length != 0 ? (
                        <div className="absolute  max-xs:flex-col bottom-0 w-full  left-1/2 -translate-x-1/2 max-sm:pb-[400px]  pb-[330px]   text-center flex justify-center gap-3  px-3 items-center">
                            {allProductsList.metadata.currentPage >= 3 ? (
                                <button
                                    onClick={() => {
                                        setPageNum(1);
                                    }}
                                    className="flex items-center justify-center gap-3 text-primary"
                                >
                                    <div className="flex items-center justify-center">
                                        <i className="fa-solid rotate-90 -mr-[5px] fa-minus"></i>
                                        <i className="fa-solid fa-angle-left"></i>
                                    </div>
                                    <span>Go to page 1</span>
                                </button>
                            ) : (
                                ""
                            )}

                            <div className="flex justify-center items-center gap-3">
                                {allProductsList.metadata.currentPage != 1 ? (
                                    <button
                                        onClick={() => {
                                            setPageNum(pageNum - 1);
                                        }}
                                        className="btn-primary bg-white text-primary border hover:bg-white border-primary"
                                    >
                                        <i className="fa-solid fa-arrow-left-long"></i>
                                    </button>
                                ) : (
                                    ""
                                )}
                                {allProductsList.metadata.currentPage != 6 &&
                                allProductsList.metadata.numberOfPages != 1 ? (
                                    <button
                                        onClick={() => {
                                            setPageNum(pageNum + 1);
                                        }}
                                        className="btn-primary flex items-center justify-center gap-2"
                                    >
                                        <span>Next Page</span>
                                        <i className="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>

                            <p className="flex justify-center gap-1 items-center text-sm">
                                <span>Page</span>
                                <span>
                                    {allProductsList.metadata.currentPage}
                                </span>
                                <span>of</span>
                                <span>
                                    {allProductsList.metadata.numberOfPages}
                                </span>
                            </p>
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
