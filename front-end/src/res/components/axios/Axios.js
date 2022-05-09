import axios from "axios";

// var url = "http://localhost:8080";
var url = "http://localhost:8080";

export function axiosPost(path, data) {
  if (url !== "http://localhost:8080") {
    url = "http://localhost:8080" + path;
  } else {
    url += path;
  }
  const postResult = axios.post(url, data);
  return postResult;
}

export function axiosGet(path, headers) {
  if (url !== "http://localhost:8080") {
    url = "http://localhost:8080" + path;
  } else {
    url += path;
  }

  const getResult = axios.get(url, { headers });
  return getResult;
}
