export function checkURL() {
  const url = document.URL;

  if (url.includes(" https://2adb-60-253-18-218.jp.ngrok.io")) return " https://2adb-60-253-18-218.jp.ngrok.io:3000/";
  else return " https://2adb-60-253-18-218.jp.ngrok.io:3000/";
}

export function redirectURL(path) {
  window.location.replace(checkURL() + path);
}
