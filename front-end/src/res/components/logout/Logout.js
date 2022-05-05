import "../../css/logout/logout.css";

export function logout() {
  sessionStorage.removeItem("jwtToken");
  location.reload();
}
