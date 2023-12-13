
import React from "react";
import { Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "./store/store";

const PrivateRoute = ({ children }) => {
//   const accessToken = useSelector(
//     (state) => state.auth?.userCredential?.accessToken
//   );
  
//   if (accessToken) {
//     localStorage.setItem("accessToken", accessToken);
//   }


  return localStorage.getItem("token") ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
