# Bookit List

> 🌟 북킷리스트는 용도별로 나만의 책꽂이를 만들어서 책을 담고,<br /> 책에서 기억하고 싶은 문구나 내용을 작성할 수 있는 **독서 기록용 웹 애플리케이션**입니다.

## Demo / 배포

🔗 [https://bookit-list.netlify.app/](https://bookit-list.netlify.app/)

<details>
  <summary>먼저 읽어주세요! 🙌</summary>

  현재 배포된 사이트에 접속시 로그인 절차가 포함되어 있지만, 같은 기기에서 저장한 데이터만 조회할 수 있는 상태입니다. (로컬 스토리지에만 데이터가 저장됩니다.) 추후에 Firebase 데이터베이스와 연결해서 동일한 계정으로 로그인 할 경우, 다른 기기를 사용해서 저장한 데이터에도 접근할 수 있도록 수정할 예정입니다. 이용해주셔서 감사합니다.

</details>

```
🔐 임시 로그인 아이디 & 비밀번호:

아이디: ilovebooks@bookitlist.com
비밀번호: 123456
```

## Features / 주요 기능

- 카카오 도서 검색 API로 **책 검색**
- **나만의 책꽂이**를 생성해서 원하는 대로 책들을 분류해서 저장
- 책꽂이에 저장한 책에 대한 **메모 저장**

### +@ 추가하면 좋을 기능

- 목표 독서량 / 읽은 책 권수 표시하는 대시보드
- 친구와 책꽂이 공유하는 기능

## Pages / 페이지

1. 메인 페이지 / Main page

   - 로그인 전
   
   <img width="800" alt="메인페이지(로그인 전)" src="https://user-images.githubusercontent.com/32476867/194691030-43f0b484-edd2-41d5-a211-8c3030c7b41f.png">

   - 로그인 후
   
   <img width="800" alt="메인페이지(로그인 후)1" src="https://user-images.githubusercontent.com/32476867/194691033-4a8f4f01-efa4-4214-bd8d-b9c98af33ad2.png">
   <img width="800" alt="메인페이지(로그인 후)2" src="https://user-images.githubusercontent.com/32476867/194691035-0622178b-ebff-4422-92b3-75a1d9386e36.png">

2. 책꽂이 페이지 / Library page
    - 책꽂이 목록
    
    <img width="800" alt="책꽂이페이지" src="https://user-images.githubusercontent.com/32476867/194691036-da8057a2-bfd1-4b07-ab55-7ab349240f75.png">
  
    - 새 책꽂이 추가 모달창
    
    <img width="552" alt="책꽂이페이지(새책꽂이 모달)" src="https://user-images.githubusercontent.com/32476867/194691037-89cb6e63-5c79-4e66-8573-c2511aeb8bdf.png">

3. 노트 페이지 / Notes page

   (이미지 추가 예정)

## Technologies / 개발 환경 및 사용한 기술

이 프로젝트는 아래의 프레이워크 및 라이브러리를 사용해서 만들었습니다:

- React 18.2.0
- Node.js 16.14.0
- Redux 4.2.0
- Redux toolkit 1.8.3
- styled-components
- @iconify/react
- Firebase
  - Authentication
  - Database
