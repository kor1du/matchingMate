import "../../css/logout/logout.css";
import { redirectURL } from "../url/CheckURL";

export function logout() {
  sessionStorage.removeItem("jwtToken");
  sessionStorage.removeItem("nickname");
  sessionStorage.removeItem("profileImgAddress");
  sessionStorage.removeItem("role")

  location.reload();
  redirectURL("");
}
