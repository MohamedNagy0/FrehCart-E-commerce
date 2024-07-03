import { Navigate } from "react-router-dom";
import { userContext } from "../../../Context/User.context";
import { useContext } from "react";

export default function ProtectedAuth({ children }) {
    const { token } = useContext(userContext);

    if (token) {
        return <Navigate to="/" />;
    } else return children;
}
