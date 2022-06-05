import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin, isUser } from "../res/components/login/Login"
import NoAuthority from "./NoAuthority"

const AdminPrivateRoute = ({children}) => {
  
  if (! isLogin()) {
    return <Navigate to="/login" replace/>
  } else if ( isUser() )
  {
    return <NoAuthority />
  }

  return children;
};

export default AdminPrivateRoute;