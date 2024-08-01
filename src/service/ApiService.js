//API 통신 서비스를 위한 함수 정의

import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {

  let headers = new Headers({
    "Content-Type": "application/json",
  });

  //로컬 스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if(accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer "+accessToken);
  }

  let options = {  //헤더 옵션
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };



  if(request) {
    //GET method
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) => {   //fulfilled 상태
      console.log(response.status);
      if (response.status === 200) {
        return response.json();
      } else if(response.status === 403) {
        window.location.href = "/login";   //redirect
      } else {
        Promise.reject(response);
        throw Error(response);
      }
    }).catch((error) => {   // rejected 상태 생략과 에러시 동작
      console.log("http error");
      console.log(error);
    });

}

export function signin(userDTO) {  //Login.js에서 사용!
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if(response.token) {
        //로컬 스토리지에 토큰 저장
        localStorage.setItem("ACCESS_TOKEN", response.token);
        //token이 존재하는 경우 Todo 화면으로 리다이렉트
        window.location.href = "/";
      }
    });
}

export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup","POST", userDTO);
}
