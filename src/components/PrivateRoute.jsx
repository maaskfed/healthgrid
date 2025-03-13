import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const accessToken = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const path = location.pathname
    const allowed = path.includes(user?.role.toLowerCase()) || user?.role === "Admin"
    return accessToken && allowed ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
