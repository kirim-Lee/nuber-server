# nuber-server
Server for the (N)Uber Clone Course on Nomad Academy. GraphQL, Typescript, NodeJS

# devDependencies
- nodemon
- ts-node
- typescript

## tsconfig.json, tslint.json 설정
- tslint-config-prettier 설치

# DefinitelyTyped 
타입스크립트의 사용을 도와줌 [타입들을 정의함] 이프로젝트에서는 @types/node 를 사용

## package.json
```
"scripts":{
    "dev":"cd src && nodemon --exec ts-node index.ts -e ts,graphql"
}
```
yarn dev로 실행할 수 있다
src 서버에 들어가서 nodemon으로 ts-node를 이용해서 index.ts를 실행 extension ts,graphql

# dependencies
- cors
- graphql-yoga
- helmet
- morgan

## devDependencies 
- 설치된 dependencies에 맞는 타입 @type/dependencies
- @types/cors
- @types/helmet
- @types/morgan

## devDependencies
- graphql-tools 
- merge-graphql-schemas

## devDependencies
- graphql-to-typescript
- gql-merge

## Resolvers

### Pubilc Resolvers:

- [x] 페이스북으로 로그인/회원가입 연동 연동
- [x] 이메일으로 회원가입
- [x] 핸드폰으로 인증
- [ ] 핸드폰 인증 완료
- [ ] 이메일 회원가입 완료
---

### Private Resolvers:

- [ ] JWT 생성
- [ ] JWT 인증
- [ ] 이메일 인증
- [ ] 프로필정보 가져오기
- [ ] 프로필정보 업데이트
- [ ] 드라이버/탑승자 토글
- [ ] Report Location / Orientation
- [ ] 장소정보 추가
- [ ] 장소정보 업데이트
- [ ] 장소정보 삭제
- [ ] 근처 운전자 보기
- [ ] Subscribe 으로 근처 운전자 보기
- [ ] 탑승요청
- [ ] 근처 탑승요청 받기
- [ ] Subscribe to Nearby Ride Requests
- [ ] Subscribe to Ride Status
- [ ] 채팅방 메세지 받기
- [ ] 채팅방 들어가기
- [ ] 메세지 보내기

## Code Challenge
- [ ] 탑승기록 보기
- [ ] 탑승상세정보보기