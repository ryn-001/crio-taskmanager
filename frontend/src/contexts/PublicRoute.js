import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './UserContext';

const PublicRoute = () => {
    const { user, loading } = useUser();

    if (loading) return null;

    return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;