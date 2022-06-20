/* eslint-disable no-undef */

import React from "react";
import "./res/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import Home from "./res/page/home";
import Login from "./res/page/login";
import { HashRouter, Route, Routes } from "react-router-dom";
import Signup from "./res/page/signup";
import ChattingList from "./res/page/chattingList";
import Chat from "./res/page/chatting";
=======

// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./res/page/home";
import Login from "./res/page/login";
import SignUp from "./res/page/signup";
>>>>>>> origin/jungYH
import AdminPostManagement from "./res/page/admin/adminPostManagement";
import AdminReportManagement from "./res/page/admin/adminReportManagement";
import AdminCategoryAdd from "./res/page/admin/adminCategoryAdd";
import AdminCategoryModify from "./res/page/admin/adminCategoryModify";
import AdminCategoryView from "./res/page/admin/adminCategoryView";
import AdminBadgeAdd from "./res/page/admin/adminBadgeAdd";
import AdminBadgeModify from "./res/page/admin/adminBadgeModify";
import AdminBadgeView from "./res/page/admin/adminBadgeView";
<<<<<<< HEAD
import MemberProfile from "./res/page/memberProfile";
import MatchProfile from "./res/page/matchProfile";

function App() {
  const member = {
    name: "홍길동",
    nickname: "NickNAME",
    contents: "안녕하세요 반갑습니다.",
    phone: "010-1234-5678",
  };

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/chatting/list" element={<ChattingList />} exact />
          <Route path="/chatting" element={<Chat />} exact></Route>
          <Route
            path="/admin/post/management"
            element={<AdminPostManagement />}
            exact
          ></Route>

          <Route
            path="/admin/report/management"
            element={<AdminReportManagement />}
            exact
          ></Route>

          <Route
            path="/admin/category/add"
            element={<AdminCategoryAdd />}
            exact
          ></Route>
          <Route
            path="/admin/category/modify"
            element={<AdminCategoryModify />}
            exact
          ></Route>
          <Route
            path="/admin/category/view"
            element={<AdminCategoryView />}
            exact
          ></Route>
          <Route
            path="/admin/badge/add"
            element={<AdminBadgeAdd />}
            exact
          ></Route>
          <Route
            path="/admin/badge/modify"
            element={<AdminBadgeModify />}
            exact
          ></Route>
          <Route
            path="/admin/badge/view"
            element={<AdminBadgeView />}
            exact
          ></Route>
          <Route path="/match" element={<MatchProfile member={member} exact/>} />
          <Route
            path="/admin/badge/view"
            element={<AdminBadgeView />}
            exact
          ></Route>
          <Route path="/member" element={<MemberProfile member={member} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
=======
import MatchProfile from "./res/page/matchProfile/matchProfile";
import MemberProfile from "./res/page/memberProfile/memberProfile";
import BoardDetail from './res/page/BoardDetail/BoardDetail';
import BoardRegister from './res/page/BoardRegister/BoardRegister';
// import ChatRoomList from './res/page/YH/ChatRoomList';
import ChatRoom from './res/page/chat/ChatRoom';
import ChatIn from './res/page/chat/ChatIn'
// import Chat from './res/page/YH/Chat'

import UserPrivateRoute from "./lib/UserPrivateRoute";
import AdminPrivateRoute from "./lib/AdminPrivateRoute";
import UserPublicRoute from "./lib/UserPublicRoute";
import Main2 from './res/page/main/main2';


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
            path="/main"
            element={
              <UserPublicRoute>
                <Main2 />
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

          {/*  */}
          <Route 
            path="/chat" 
            element={
              <UserPrivateRoute>
                <ChatRoom />
              </UserPrivateRoute>
            } 
            exact 
          />

          <Route 
            path="/chat/in/:id" 
            element={
              <UserPrivateRoute>
                <ChatIn />
              </UserPrivateRoute>
            } 
            exact 
          />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}
>>>>>>> origin/jungYH
