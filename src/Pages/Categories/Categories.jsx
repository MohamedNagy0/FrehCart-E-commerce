import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useCategories from "../../Hooks/useCategories";

export default function Categories() {
    const { data, isLoading } = useCategories();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Helmet>
                <title>Categories</title>
                <meta
                    name="description"
                    content="Welcome to our Categories page! Here, you’ll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <>
                <h2 className="text-center border-b border-t py-2 text-primary text-lg">
                    Shop by category
                </h2>
                <section className="wrapper grid grid-cols-12 px-2 pb-4">
                    {data.data.data.map((category, index) => (
                        <article
                            key={category._id}
                            className="flex flex-col  justify-center items-center p-4 max-xs:col-span-6 col-span-4 md:col-span-3 lg:md:col-span-2 "
                        >
                            <Link
                                to={`/category/${category._id}`}
                                className="relative group inline-block mb-6 size-[150px] rounded-xl shadow-md cursor-pointer  p-1"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="size-full object-cover rounded-xl group-hover:scale-[1.03] duration-500"
                                />
                                <h2 className="mt-3 font-semibold text-center">
                                    {category.name}
                                </h2>

                                {index != 1 && index != 2 && index != 9 ? (
                                    <p className="bg-red-600 bg-opacity-50 text-sm w-[95%] text-white uppercase  text-center absolute top-1/2  -translate-y-1/2">
                                        Out OFF STOCK
                                    </p>
                                ) : (
                                    ""
                                )}
                            </Link>
                        </article>
                    ))}
                </section>
            </>
        </>
    );
}
