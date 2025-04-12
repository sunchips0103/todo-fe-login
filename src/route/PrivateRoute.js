import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute=({user, children})=>{ //PrivateRoute 원하는 모든 페이지에서 쓸 수 있어야함
    return(
        user ? children : <Navigate to="/login" />
    )
};
//user값이 있으면 ? todopage: redirect to /login

export default PrivateRoute