요약:
1. 각종 기능 모듈화
2. 백엔드로 보내는 데이터 수정
3. 로그아웃 추가
4. 채팅리스트 접근시 로그인여부확인

공통추가사항:
kor1du+junwoo 브랜치 머지

추가사항:
프론트엔드:

Nav.js
1. NavAdmin, NavChatting 로그아웃 추가

Login.js
1. SessionStorage 추가 (jwtToken저장용)

Toggle.js
1. 토글 기능 추가 (toggle Active할때가 많은데 매번 코드를 다 적으면 모듈화에서 비효율적이라 생각함)

수정사항:
프론트엔드

App.js
1. HashRouter -> BrowserRouter

Signup.js
1. 회원가입 남성 여성 -> 남자 여자로 value 변경

Nav.js
1. Nav바에 각각 존재했던 isLogin LoginComponent에서 사용하도록 변경
2. showLeft Nav바에 export 등록(모듈화, NavAdmin, NavChatting에서 중복코드 삭제)
3. showLoginBtn Nav바에 export 등록(모듈화, NavAdmin, NavChatting에서 중복코드 삭제)
4. toggle기능 Toggle.js컴포넌트로 대체(모듈화)

NavLeftside.js
1. 메뉴2를 chattingList 바로가기로 변경

Profile.js
1. toggle기능 Toggle.js컴포넌트로 대체(모듈화)

CheckURL.js
1. 폴더명 url로 변경
2. 경로입력하면 바로 해당 경로로 보내주는 기능 추가 (모듈화)

ChattingList.js
1. 로그인해야만 볼 수 있게 변경 (미로그인시 confirm창 출력후 "예"면 로그인 "아니오"면 첫화면으로)
2. 예 아니오 클릭시 화면 잠깐나오는데 active로 조정할까했지만 어차피 로그인 안한상태이면 백엔드에서 들고오는거 없으니까 백지로 뜰듯?

백엔드
1. readRecentPosts() 컨트롤러, 서비스, 레포지토리 매개변수 삭제

삭제사항:
프론트엔드:
1.Cookies폴더 및 컴포넌트삭제 (SessionStorage로 대체)

추후 예정

Admin
1. 관리자인지 체크해야하지만 일단은 보류
