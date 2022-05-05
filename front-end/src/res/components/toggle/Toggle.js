export function toggle(target) {
  if (target.includes("."))
    //특정 클래스라면
    document.querySelector(target).classList.toggle("active");
  //클래스가 아닌 변수라면
  else target.classList.toggle("active");
}
