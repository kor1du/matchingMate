function checkURL() {
  const url = document.URL;

  if (url.includes("localhost")) return "http://localhost:3000/";
  else return "http://kor1du.ddns.net:3000/";
}

export function redirectURL(path) {
  window.location.replace(checkURL() + path);
}
