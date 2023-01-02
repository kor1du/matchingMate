export function checkURL() {
  const url = document.URL;

  if (url.includes("https://c0f9-1-235-210-229.jp.ngrok.io")) return "https://c0f9-1-235-210-229.jp.ngrok.io:3000/";
  else return "https://c0f9-1-235-210-229.jp.ngrok.io:3000/";
}

export function redirectURL(path) {
  window.location.replace(checkURL() + path);
}
