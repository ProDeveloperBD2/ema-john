import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    console.log(location)
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 200 }}>Loading...</div>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;