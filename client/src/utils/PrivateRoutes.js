import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => localStorage.getItem("user-Token") ? <Outlet /> : <Navigate to="/" />
export default PrivateRoutes
