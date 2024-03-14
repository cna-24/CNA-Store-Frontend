import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './CheckAuth';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    let location = useLocation();

    if (!user) {
        return <Navigate to="/store" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;