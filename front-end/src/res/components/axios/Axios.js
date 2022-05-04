import axios from "axios";

// var url = "http://kor1du.ddns.net:8080";
let url = "localhost:8050";

export function axiosPost(path, data) {
  url += path;
  const postResult = axios.post(url, data);
  return postResult;
}

export function axiosGet(path) {
  url += path;
  const getResult = axios.get(url);
  return getResult;
}
