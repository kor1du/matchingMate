import axios from "axios";

var url = "http://kor1du.ddns.net:8080";

export function axiosPost(path, data) {
  if (url !== "http://kor1du.ddns.net:8080") {
    url = "http://kor1du.ddns.net:8080" + path;
  } else {
    url += path;
  }
  const postResult = axios.post(url, data);
  return postResult;
}

export function axiosGet(path) {
  if (url !== "http://kor1du.ddns.net:8080") {
    url = "http://kor1du.ddns.net:8080" + path;
  } else {
    url += path;
  }

  var getResult;
  if (path.includes("admin")) {
    getResult = axios.get("http://www.localhost:8080/admin/matchingPost", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data; charset=UTF-8",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjUxNzM3OTk0LCJleHAiOjE2NTE4MjQzOTR9.FBlABWOaAhbiMLkiyPG4I1F7BY8TOOjK5j291AWvwCU`,
        RefreshToken: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjUxNzM3OTk0LCJleHAiOjE2NTE4MjQzOTR9.FBlABWOaAhbiMLkiyPG4I1F7BY8TOOjK5j291AWvwCU`,
      },
    });
  } else getResult = axios.get(url);
  return getResult;
}
