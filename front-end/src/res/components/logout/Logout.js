import "../../css/logout/logout.css";
import { axiosPost } from "../axios/Axios";

export function logout() {
  axiosPost("/logout", sessionStorage.getItem("jwtToken"));
  sessionStorage.removeItem("jwtToken");
  location.reload();
}
