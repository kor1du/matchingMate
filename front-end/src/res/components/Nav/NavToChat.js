import React from "react";
import { Link } from "react-router-dom";
import "../../css/nav/navToChat.css";
import { BsFillChatDotsFill } from "react-icons/bs";
<<<<<<< HEAD

export default function NavToChat() {
  return (
    <Link to="/chatting/list" className="nav-to-chat">
      <BsFillChatDotsFill className="chatIcon" />
    </Link>
  );
}
=======
import { isLogin } from '../login/Login'

export default function NavToChat() {
  if (isLogin()) {
    return (
      
        <Link to="/chat" className="nav-to-chat">
          <BsFillChatDotsFill className="chatIcon" />
        </Link>
      
    );
  } else {
    return (
      null
    );
  }
}
>>>>>>> origin/jungYH
