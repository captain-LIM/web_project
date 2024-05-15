# 교내 물품 대여 웹 README
---
![실행화면](https://github.com/captain-LIM/web_project/blob/main/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.png)
-------
## 프로젝트 소개
---
* 학교생활을 하며 하며 노트북이나 다른 필요한 주변용품들을 안 가져왔을 때 대여하는 웹입니다.
* 대여시간이 정해져있지 않아 필요할 시에 계속 대여할 수 있습니다.
---
## 개발환경
---
* front-end: html, css
* back-end: node.js, express
## 프로젝트 구조
---
├── README.md

├── 웹 프로젝트 구현영상

├── project

     ├── .vscode

     ├── node_modules
     ├── public
           ├── css
               └── project.css
           ├── photo
                └── charger.png
                └── favicon.ico
                └── notebook.png
                └── pen.png
                └── tabletpc.png
                └── umbrella.png
     │     ├── membership.html
     │     └── project.html
     ├── app.js
     ├── .DS_Store
     ├── package
     ├── package-lock
---
## 페이지별 기능
---
* [초기화면]
![실행화면](https://github.com/captain-LIM/web_project/blob/main/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.png)
물품들을 대여할 수 있는 홈페이지로 회원가입이 되어있다면 아이디와 비밀번호를 입력해서 로그인 할 수 있고 없다면 회원가입을 할 수 있습니다.
* [회원가입]
![회원가입](https://github.com/captain-LIM/web_project/blob/main/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%20%ED%99%94%EB%A9%B4.png)
이름, 학번, 비밍번호를 입력하여 회원가입을 할 수 있습니다.
* [로그인]
![로그인](https://github.com/captain-LIM/web_project/blob/main/%EB%A1%9C%EA%B7%B8%EC%9D%B8%20%ED%99%94%EB%A9%B4.png)
가입된 정보로 로그인하여 기존에 물품들이 대여됐는지 확인할 수 있고 대여버튼을 통해 대여할 수 있습니다.
