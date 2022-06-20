import React from "react";

/* 원하는 컴포넌트의 이름을 파라미터로 받아 화면 출력 */
export default function ShowComponent(target) {
  const targetClass = findClass(target);
  const alreadyOpenedClass = findAlreadyOpenedClass();

  if (alreadyOpenedClass !== null) {
    if (alreadyOpenedClass !== targetClass) {
      alreadyOpenedClass.classList.toggle("active");
    }
  }

  targetClass.classList.toggle("active");
}

/* target이 될 컴포넌트 찾기 */
function findClass(target) {
  return document.querySelector(".container-match-profile ." + target);
}

/* 이미 열려있는 Component 찾기 */
function findAlreadyOpenedClass() {
  if (document.querySelector(".active")) return document.querySelector(".active");
  return null;
}
