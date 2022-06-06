import { useNavigate } from 'react-router-dom';
import "../../css/logout/logout.css";


export function logout() {
  sessionStorage.removeItem("jwtToken");
  sessionStorage.removeItem("nickname");
  sessionStorage.removeItem("profileImgAddress");
  sessionStorage.removeItem("role");
  const navigate = useNavigate();

  location.reload();
  navigate('/');
}
