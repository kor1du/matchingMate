/* eslint-disable no-undef */

import React from "react";
import "./res/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./res/page/home";
import Login from "./res/page/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./res/page/signup";
import ChattingList from "./res/page/chattingList";
import Chat from "./res/page/chatting";
import AdminPostManagement from "./res/page/admin/adminPostManagement";
import AdminReportManagement from "./res/page/admin/adminReportManagement";
import AdminCategoryAdd from "./res/page/admin/adminCategoryAdd";
import AdminCategoryModify from "./res/page/admin/adminCategoryModify";
import AdminCategoryView from "./res/page/admin/adminCategoryView";
import AdminBadgeAdd from "./res/page/admin/adminBadgeAdd";
import AdminBadgeModify from "./res/page/admin/adminBadgeModify";
import AdminBadgeView from "./res/page/admin/adminBadgeView";
import MatchProfile from './res/page/matchProfile/matchProfile';
import MemberProfile from './res/page/memberProfile/memberProfile';
import BoardDetail from './res/page/BoardDetail/BoardDetail';

function App() {
  const member = {
    name: "홍길동",
    nickname: "NickNAME",
    contents: "안녕하세요 반갑습니다.",
    phone: "010-1234-5678",
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatting/list" element={<ChattingList />} />
          <Route path="/chatting" element={<Chat />} ></Route>
          <Route path="/post/:id" element={<BoardDetail />} ></Route>
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
          <Route path="/match" element={<MatchProfile member={member} exact />} />
          <Route
            path="/admin/badge/view"
            element={<AdminBadgeView />}
            exact
          ></Route>
          <Route path="/member" element={<MemberProfile member={member} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
