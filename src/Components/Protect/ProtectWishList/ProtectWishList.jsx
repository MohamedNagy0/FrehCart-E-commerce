import { Navigate } from "react-router-dom";
import { userContext } from "../../../Context/User.context";
import { useContext } from "react";

export default function ProtectWishList({ children }) {
    const { token } = useContext(userContext);

    if (token) {
        return children;
    } else return <Navigate to="/notFound" />;
}
