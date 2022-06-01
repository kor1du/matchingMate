export function checkURL() {
  const url = document.URL;

  if (url.includes("localhost")) return "/#/";
  else return "http://kor1du.ddns.net:3000/#/";
}
