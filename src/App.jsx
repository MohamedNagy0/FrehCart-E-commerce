import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import Categories from "./Pages/Categories/Categories";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import Products from "./Pages/Products/Products";
import UserProvider from "./Context/User.context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Brands from "./Pages/Brands/Brands";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/Cart.context";
import CategoriesDetails from "./Pages/CategoriesDetails/CategoriesDetails";
import AllOrders from "./Pages/AllOrders/AllOrders";
import ProtectedAuth from "./Components/Protect/ProtectedAuth/ProtectedAuth";
import ProtectedCart from "./Components/Protect/ProtectedCart/ProtectedCart";
import ProtectedAllOrders from "./Components/Protect/ProtectedAllOrders/ProtectedAllOrders";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import BrandsDetails from "./Pages/BrandsDetails/BrandsDetails";
import WishList from "./Pages/WishList/WishList";
import ProtectWishList from "./Components/Protect/ProtectWishList/ProtectWishList";
import WishListProvider from "./Context/WishList.context";
import ProductProvider from "./Context/Product.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },

                { path: "/products", element: <Products /> },
                { path: "/product/:productId", element: <ProductDetails /> },
                { path: "/categories", element: <Categories /> },
                {
                    path: "/category/:categoryId",
                    element: <CategoriesDetails />,
                },
                {
                    path: "/brand/:brandId",
                    element: <BrandsDetails />,
                },
                { path: "/brands", element: <Brands /> },
                {
                    path: "/cart",
                    element: (
                        <ProtectedCart>
                            <Cart />
                        </ProtectedCart>
                    ),
                },
                {
                    path: "/allorders",
                    element: (
                        <ProtectedAllOrders>
                            <AllOrders />
                        </ProtectedAllOrders>
                    ),
                },
                {
                    path: "/wishList",
                    element: (
                        <ProtectWishList>
                            <WishList />
                        </ProtectWishList>
                    ),
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
                "details",
            ],
        },
        {
            path: "/auth",
            element: (
                <ProtectedAuth>
                    <Layout />
                </ProtectedAuth>
            ),
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "forgotPassword",
                    element: <ForgotPassword />,
                },
                {
                    path: "verifyCode",
                    element: <VerifyCode />,
                },
                {
                    path: "resetPassword",
                    element: <ResetPassword />,
                },
            ],
        },
    ]);

    const myClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={myClient}>
                <UserProvider>
                    <ProductProvider>
                        <CartProvider>
                            <WishListProvider>
                                <RouterProvider
                                    router={routes}
                                ></RouterProvider>
                                <ReactQueryDevtools></ReactQueryDevtools>
                                <Toaster />
                            </WishListProvider>
                        </CartProvider>
                    </ProductProvider>
                </UserProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
