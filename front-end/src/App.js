/* eslint-disable no-undef */

import React from "react";
import "./res/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./res/page/home";
import Login from "./res/page/login";
import SignUp from "./res/page/signup";
import AdminPostManagement from "./res/page/admin/adminPostManagement";
import AdminReportManagement from "./res/page/admin/adminReportManagement";
import AdminCategoryAdd from "./res/page/admin/adminCategoryAdd";
import AdminCategoryModify from "./res/page/admin/adminCategoryModify";
import AdminCategoryView from "./res/page/admin/adminCategoryView";
import AdminBadgeAdd from "./res/page/admin/adminBadgeAdd";
import AdminBadgeModify from "./res/page/admin/adminBadgeModify";
import AdminBadgeView from "./res/page/admin/adminBadgeView";
import MatchProfile from "./res/page/matchProfile/matchProfile";
import MemberProfile from "./res/page/memberProfile/memberProfile";
import BoardDetail from './res/page/BoardDetail/BoardDetail';
import BoardRegister from './res/page/BoardRegister/BoardRegister';
// import ChatRoomList from './res/page/YH/ChatRoomList';
import ChatRoom from './res/page/YH/ChatRoom';
import Chat from './res/page/YH/Chat'

import UserPrivateRoute from "./lib/UserPrivateRoute";
import AdminPrivateRoute from "./lib/AdminPrivateRoute";
import UserPublicRoute from "./lib/UserPublicRoute";


export default function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route 
            path="/" 
            element={
              <UserPublicRoute>
                <Home />
              </UserPublicRoute>
            } 
          />

          <Route 
            path="/signUp" 
            element={
              <UserPublicRoute restricted={true}>
                <SignUp />
              </UserPublicRoute>
            } 
          />

          <Route 
            path="/login" 
            element={
              <UserPublicRoute restricted={true}>
                <Login />
              </UserPublicRoute>
            } 
          />

          <Route 
            path="/post/:id" 
            element={
              <UserPrivateRoute>
                <BoardDetail />
              </UserPrivateRoute>
            } 
          />

          <Route 
            path="/register" 
            element={ 
              <UserPrivateRoute>
                <BoardRegister />
              </UserPrivateRoute>
            } 
          />

          <Route
            path="/admin/post/management"
            element={
              <AdminPrivateRoute>
                <AdminPostManagement />
              </AdminPrivateRoute>
            }
          />


          <Route
            path="/admin/report/management"
            element={
              <AdminPrivateRoute>
                <AdminReportManagement />
              </AdminPrivateRoute>
            }
          />

          <Route 
            path="/admin/add" 
            element={
              <AdminPrivateRoute>
                <AdminCategoryAdd />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/admin/modify/"
            element={
              <AdminPrivateRoute>
                <AdminCategoryModify />
              </AdminPrivateRoute>
              }
          />

          <Route 
            path="/admin/view" 
            element={
              <AdminPrivateRoute>
                <AdminCategoryView />
              </AdminPrivateRoute>
            }
          />

          <Route 
            path="/admin/badge/add" 
            element={
              <AdminPrivateRoute>
                <AdminBadgeAdd />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/admin/badge/modify"
            element={
              <AdminPrivateRoute>
                <AdminBadgeModify />
              </AdminPrivateRoute>
            }
          />

          <Route 
            path="/admin/badge/view" 
            element={
              <AdminPrivateRoute>
                <AdminBadgeView />
              </AdminPrivateRoute>
            }
          />

          <Route 
            path="/member" 
            element={
              <UserPrivateRoute>
                <MemberProfile />
              </UserPrivateRoute>
            } 
          />

          <Route 
            path="/match" 
            element={
              <UserPrivateRoute>
                <MatchProfile />
              </UserPrivateRoute>
            }
          />

          <Route 
            path="/chat" 
            element={
              <UserPrivateRoute>
                <Chat />
              </UserPrivateRoute>
            } 
            exact 
          />
          <Route 
            path="/chat/in" 
            element={
              <UserPrivateRoute>
                <ChatRoom />
              </UserPrivateRoute>
            } 
            exact 
          />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}
