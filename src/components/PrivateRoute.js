import React, {useContext }from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  
  const { authData } = useContext(AuthContext);
  // 로그인 상태를 확인하는 로직
  const isAuthenticated = localStorage.getItem("token") !== null;

return authData.token ? (
  <Route {...rest} element={<Component />} />
) : (
  <Navigate to="/login" state={{ from: rest.location }} replace />
);
}
export default PrivateRoute;
