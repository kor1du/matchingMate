import React from "react";
import "./res/css/global.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./res/page/home";
import Login from "./res/page/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import MemberEdit from "./res/page/memberEdit";
import BoardDetail from "./res/page/BoardDetail/BoardDetail";
import ChatRoomList from "./res/page/YH/ChatRoomList";
import ChatRoom from "./res/page/YH/ChatRoom";

export default function App() {
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
          <Route path="/post/:id" element={<BoardDetail />} />
          <Route
            path="/admin/post/management"
            element={<AdminPostManagement />}
          ></Route>
          <Route
            path="/admin/report/management"
            element={<AdminReportManagement />}
          ></Route>
          <Route path="/admin/add" element={<AdminCategoryAdd />}></Route>
          <Route
            path="/admin/modify/"
            element={<AdminCategoryModify />}
          ></Route>
          <Route path="/admin/view" element={<AdminCategoryView />}></Route>
          <Route path="/admin/badge/add" element={<AdminBadgeAdd />}></Route>
          <Route
            path="/admin/badge/modify"
            element={<AdminBadgeModify />}
          ></Route>
          <Route path="/admin/badge/view" element={<AdminBadgeView />}></Route>
          <Route path="/match" element={<MatchProfile member={member} />} />
          <Route path="/admin/badge/view" element={<AdminBadgeView />}></Route>
          <Route path="/member" element={<MemberProfile member={member} />} />
          <Route path="/member/edit" element={<MemberEdit />} exact />
          <Route path="/chat/" element={<ChatRoomList />} exact />
          <Route path="/chat/in" element={<ChatRoom />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
