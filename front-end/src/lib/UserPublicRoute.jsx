import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin, isUser } from "../res/components/login/Login"

const UserPublicRoute = ({children, restricted}) => {
  if (isLogin() && restricted) {
    if ( isUser() ) {
      return <Navigate to="/" replace/>;
    } else {
      return <Navigate to="/admin/post/management" replace/>;
    }
  }

  if (isLogin() && !isUser())
    return <Navigate to="/admin/post/management" replace/>;

  return children;
};

export default UserPublicRoute;