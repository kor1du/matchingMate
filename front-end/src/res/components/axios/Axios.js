import axios from "axios";

<<<<<<< HEAD

var url = "http://localhost:8080";
// var url = "http://localhost:8080";

// eslint-disable-next-line no-unused-vars

export function axiosPost(path, data, header) {
  if (url !== "http://localhost:8080") {
    url = "http://localhost:8080" + path;
=======
var url = " https://2adb-60-253-18-218.jp.ngrok.io";
// var url = " https://2adb-60-253-18-218.jp.ngrok.io";

// eslint-disable-next-line no-unused-vars

export function axiosPost(path, data, headers) {
  if (url !== " https://2adb-60-253-18-218.jp.ngrok.io") {
    url = " https://2adb-60-253-18-218.jp.ngrok.io" + path;
>>>>>>> origin/junwoo7
  } else {
    url += path;
  }

  const postResult = axios.post(url, data, headers);
  return postResult;
}


export function axiosDelete(path, headers) {
<<<<<<< HEAD
  if (url !== "http://localhost:8080") {
    url = "http://localhost:8080" + path;

=======
  if (url !== " https://2adb-60-253-18-218.jp.ngrok.io") {
    url = " https://2adb-60-253-18-218.jp.ngrok.io" + path;
>>>>>>> origin/junwoo7
  } else {
    url += path;
  }

  const getResult = axios.get(url, { headers });
  return getResult;
}


export function axiosGet(path, headers) {
<<<<<<< HEAD
  if (url !== "http://localhost:8080") {
    url = "http://localhost:8080" + path;

=======
  if (url !== " https://2adb-60-253-18-218.jp.ngrok.io") {
    url = " https://2adb-60-253-18-218.jp.ngrok.io" + path;
>>>>>>> origin/junwoo7
  } else {
    url += path;
  }

  const getResult = axios.get(url, { headers });
  return getResult;
}

export function axiosPut(path, data) {
  if (url !== " https://2adb-60-253-18-218.jp.ngrok.io") {
    url = " https://2adb-60-253-18-218.jp.ngrok.io" + path;
  } else {
    url += path;
  }

  const getResult = axios.put(url, data);
  return getResult;
}

export async function getAdminPosts(url) {
  const headers = {
    //서버에 데이터 요청할때 담아보낼 header정보
    Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    RefreshToken: `Bearer ${sessionStorage.getItem("jwtToken")}`,
  };
  const res = async () => {
    return await axiosGet(url, headers);
  };

  return res();
}
