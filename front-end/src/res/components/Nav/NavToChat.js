import React from "react";
import { Link } from "react-router-dom";
import "../../css/nav/navToChat.css";
import { BsFillChatDotsFill } from "react-icons/bs";

export default function NavToChat() {
  return (
    <Link to="/chat" className="nav-to-chat">
      <BsFillChatDotsFill className="chatIcon" />
    </Link>
  );
}
