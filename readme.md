# 프로젝트 소개

### 플랜업( PLAN UP )

**취업준비를 위한 여러분들을 위해, 캘린더를 통한 일정관리 서비스를 제공합니다!**

* **취업 공고 추가**
구직 사이트에서 원하시는공고의 url를 입력하셔서, 해당 공고의 정보와 자세한 일정을 캘린더에 바로 추가하실 수 있습니다!

   * 해당 공고에 대한 간단한 정보 및 기업정보를 같이 저장하며, 잊어버리지 않도록 취업공고 마감일정과, 추가적인 체크리스트 추가를 통해 취업을 위한 플래너를 관리해보세요!

* **자격증 시험 일정 추가**
    * 준비하시는 자격증이 있다면, 자격증 검색 기능을 통해,원하시는 자격증 시험 일정을 선택하셔서, 나의 캘린더 일정에 추가할 수 있습니다!

**플랜 업과 함께 목표를 이루시도록 도와드릴게요!**

# 포트폴리오

 
![PLAN_UP 기획서_page-0001](https://github.com/user-attachments/assets/31f7e8e5-9f11-48ad-84b4-2d75cfc57c8d)
![PLAN_UP 기획서_page-0002](https://github.com/user-attachments/assets/ff59fad1-362a-4d70-88a9-5dded9682f5f)
![PLAN_UP 기획서_page-0003](https://github.com/user-attachments/assets/e1c54730-5bca-4f9d-aa36-a7176a3f5648)
![PLAN_UP 기획서_page-0004](https://github.com/user-attachments/assets/e58e3242-ff2c-41dc-af1d-1cfe494e19a3)
![PLAN_UP 기획서_page-0005](https://github.com/user-attachments/assets/885521d3-3fb3-4552-a014-73f9dfca706b)
![PLAN_UP 기획서_page-0006](https://github.com/user-attachments/assets/b98bc8da-ed3a-4bdd-8f13-b27dc6fe7493)
![PLAN_UP 기획서_page-0007](https://github.com/user-attachments/assets/dbb87149-45a5-45c4-992e-2f40b0a888dc)
![PLAN_UP 기획서_page-0008](https://github.com/user-attachments/assets/eddbb1c9-9da3-4b36-9a41-e0f23aae1f3e)
![PLAN_UP 기획서_page-0009](https://github.com/user-attachments/assets/492e5b6d-f071-4209-91ec-bdc02f9a55c9)
![PLAN_UP 기획서_page-0010](https://github.com/user-attachments/assets/e1b5aeef-cec4-43b2-ac68-27e88ca62a85)
 

 <hr/>

### 기능

* 캘린더를 통해 일정을 한눈에 확인

* 일정 리스트를 통해 내가 추가한 일정 확인

* 일정에 대한 체크리스트로 해당 일정에 할 일, 준비물 등을 확인

* 자격증 일정 검색 및 일정 추가

* 채용 공고 URL을 통한 기업 정보, 채용 공고를 일정에 저장

# 실제 어플 구동 화면
<details>
  <summary>시연 보기/접기</summary>
  

  <br/>

 <center><img src="구동화면.gif" alt="Demo GIF" width="360" height="640"></center>

 
 
</details>



### 프로젝트 폴더 구조

```
Backend/
├── src/
│   ├── config/                 # 설정 파일
│   ├── controllers/            # 컨트롤러
│   ├── middleware/             # 미들웨어
│   ├── models/                 # 데이터베이스 모델
│   ├── routes/                 # 라우트
│   ├── services/               # API 호출 등 비즈니스 로직
│   ├── app.js                  # Express 애플리케이션 설정
├── .env                        # 환경 변수 설정 파일
├── package.json                # npm 패키지 설정 파일
├── requirements.txt            # 종속성 설치 파일
├── main.py                     # 크롤링 서버 파일
└── README.md                   # 프로젝트 설명 파일

```


# 실행
1. 리포지토리 복제
```bash
git clone https://github.com/Heeseon06/PlanUP_backend_Project

```

2. 패키지 설치
  * node.js, react-native-cli, android stuid 필요
```bash
npm install
```
  * 백엔드 종속성 설치
```bash
# 백엔드 루트 폴더에서 아래 코드 실행
pip install -r requirements.txt
```

3. 앱 실행

  * 백엔드 서버 실행
```bash
npm start
```
  * FastAPI 크롤링 서버 실행
```bash
python main.py
```
  * 프론트 엔드
```bash
npx react-native run-android
```

# 플레이 스토어

### [스토어 링크](https://play.google.com/store/apps/details?id=com.PlanUP&pli=1)
![플레이스토어](https://github.com/user-attachments/assets/77b51f29-cd09-49e8-a971-87710aa3204f)


### 기술 스택

* **프론트엔드**
  * JavaScript
  * React-Native
  * AndroidStudio
* **백엔드**
  * Node.js
  * Python
  * FastAPI
* **데이터베이스**
  * MongoDB
* **배포**
  * Docker
  * CloudType
* **협업툴**
  * Figma
  * GitHub


# 협업 방식
1. **Figma 활용**
    * 기획안을 스토리보드로 작성
    * 화면 구성을 참고하여 개발

2. **GIT**
    * GIT-FLOW 전략을 차용
    <img src="https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/git-flow_overall_graph.png" alt="git-flow" width="600" height="600">
    
    * master: 배포를 위한 브랜치. 특별한 경우가 아니면 따로 관여하지 않으며 pull request 기능을 사용
    * develop: 개발, 테스트를 위한 브랜치
    * 모든 개발은 develop 브랜치에서 이루어지고, 추가 기능 개발은 따로 브랜치를 분리해 develop과 병합. 이후 충분한 테스트를 거친 후 master 브랜치에 병합하여 배포 버전을 업데이트

# 작성자의 기여

* 캘린더, 일정 리스트, 체크리스트의 프론트엔드 및 백엔드, DB  초안 개발
* 자격증 OpenAPI 연결
* 자격증 검색 일정 추가 기능 개발
* 회원 관련 백엔드, DB 초반 구성
* 백엔드 서버, 크롤링 서버 배포
