import axios from "axios";


var url = "http://kor1du.gonetis.com:8080";
// var url = "http://kor1du.gonetis.com:8080";

// eslint-disable-next-line no-unused-vars

export function axiosPost(path, data, header) {
  if (url !== "http://kor1du.gonetis.com:8080") {
    url = "http://kor1du.gonetis.com:8080" + path;
  } else {
    url += path;
  }

  const postResult = axios.post(url, data);
  return postResult;
}


export function axiosDelete(path, headers) {
  if (url !== "http://kor1du.gonetis.com:8080") {
    url = "http://kor1du.gonetis.com:8080" + path;

  } else {
    url += path;
  }

  const getResult = axios.get(url, { headers });
  return getResult;
}


export function axiosGet(path, headers) {
  if (url !== "http://kor1du.gonetis.com:8080") {
    url = "http://kor1du.gonetis.com:8080" + path;

  } else {
    url += path;
  }

  const getResult = axios.get(url, { headers });
  return getResult;
}

export function axiosPut(path, data) {
  if (url !== "http://kor1du.gonetis.com:8080") {
    url = "http://kor1du.gonetis.com:8080" + path;
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
