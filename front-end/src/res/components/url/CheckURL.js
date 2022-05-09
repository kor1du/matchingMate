export function checkURL() {
  const url = document.URL;

  if (url.includes("localhost")) return "http://localhost:3000/";
  else return "http://kalzake.gonetis.com:3000/";
}

export function redirectURL(path) {
  window.location.replace(checkURL() + path);
}
