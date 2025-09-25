# React Board Side Portfolio

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" /> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" /> <img src="https://img.shields.io/badge/firebase-%23FFCA28.svg?&style=for-the-badge&logo=firebase&logoColor=black" /> <img src="https://img.shields.io/badge/redux-%23764ABC.svg?&style=for-the-badge&logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/sass-%23CC6699.svg?&style=for-the-badge&logo=sass&logoColor=white" /> <img src="https://img.shields.io/badge/prettier-%23F7B93E.svg?&style=for-the-badge&logo=prettier&logoColor=black" /> <img src="https://img.shields.io/badge/eslint-%234B32C3.svg?&style=for-the-badge&logo=eslint&logoColor=white" />

## Overview
- 개인 RND 및 포트폴리오 목적으로 제작

## Live
- https://my-react-board.firebaseapp.com/

## Explanation
- react v19, vite, typescript, firebase, tanstack query(react-query)
- 기존 React RTK 에서 tanstack query(react-query) 로 리팩토링    <a href="https://github.com/silence337/mypp-fb-web" target="_blank">[Redux-toolkit 버전보기]</a>
- Firebase Auth email register, login
- Firebase Firestore database BOARD
- 포트폴리오 목적성이기에 가입 시, 이메일 인증처리는 하지 않아 임시 계정으로 생성하여 테스트 가능
- 임시 테스트 계정 - admin@naver.com/110909

## Structure 

```
    ├─ src
    │  ├─ api                # Firebase Auth, Board DB 서버 통신 관련
    │  ├─ assets             # Resources
    │  ├─ components         # UI Components
    │  │  ├─ auth
    │  │  ├─ board
    │  │  ├─ form
    │  │  ├─ layouts
    │  ├─ hooks              # React Query hook
    │  ├─ pages              # Page components
    │  │  ├─ freeboad
    │  │  ├─ home
    │  ├─ routes             # Page Routes
    │  ├─ types              # 타입 정의
    │  ├─ validation         # 회워가입, 로그인, 게시물 Form Rules


```


