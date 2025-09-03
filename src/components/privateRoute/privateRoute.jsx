import { Navigate } from "react-router-dom";

function PrivateRoute({ isAuth, children }) {
    return isAuth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
