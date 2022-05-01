import { deleteCookie } from "../cookie/Cookie";
import "../../css/logout/logout.css";

export function logout() {
  deleteCookie("jwtToken");
  window.location.replace("/");
}
