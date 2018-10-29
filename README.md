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