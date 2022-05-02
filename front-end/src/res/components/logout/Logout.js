import { deleteCookie } from "../cookie/Cookie";
import "../../css/logout/logout.css";

export function logout() {
  deleteCookie("jwtToken");
  location.reload();
}
