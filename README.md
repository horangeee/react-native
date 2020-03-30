# react-native example

## Example App

### FirstApp

- 기본 환경 구성
  - CLI
  - 프로젝트 파일 구조
    - src
  - 명명규칙
- 참고할 만한 plugin
  - styled-component
    - 사용하면 편할듯 하지만..
    - React의 공식 문서의 StyledSheet를 따르는 것이 낫지 않을까 생각중
    - 빌드했을 때, 용량이 꽤 큰 것 같기도 함
  - babel-plugin-root-import
  - typescript
- 개발자 메뉴
- 디버깅
- 핫 리로딩

### Counter

- 기본 환경 구성
  - 프로젝트 파일 구조
    - image 리소스 위치
- 필요한 개념
  - React
    - Props: 부모 컴포넌트에서 자식 컴포넌트로 전달되는 데이터로 Immutable
    - State: 유동적인 데이터로 mutable. 즉, 컴포넌트의 상태
    - [React Hook](https://ko.reactjs.org/docs/hooks-intro.html)
      - useState
    - Functional Style vs Class Component Style
    - Class Component에서의 Component의 LifeCycle과 호출 순서
      - constructor
      - render
      - getDerivedStateFromProps
      - componentDidMount
      - shouldComponentUpdate
      - getSnapshotBeforeUpdate
      - componentDidUpdate
      - componentWillUnmount
      - componentDidCatch
    - [ ] 호출 순서도
- 참고할 만한 리소스
  - [Material Design](https://material.io)

### TodoList

- 기본 환경 구성
  - 프로젝트 파일 구조
    - View 별로 Directory 생성 후, 내부에 index.tsx를 위치
      - 컴포넌트가 다양할 수록 깊이가 너무 깊어지는 듯하고, index.tsx로 해서 import시켰을 때의 장점이 보이지 않음
      - 차라리 컴포넌트명.tsx로 직접 import해서 사용하는 게 나아보임.
      - Directory 구조는 Atomic Design이 좀 더 나아보임
- 필요한 개념
  - React
    - Props와 State는 부모 -> 자식(위 -> 아래), 즉 한쪽 방향으로 데이터가 흐르게 됨
    - 따라서, 컴포넌트 사이에 공유되는 데이터를 위해 매번 공통 부모 컴포넌트를 수정하고 모든 컴포넌트에 Props를 전달하여 데이터를 사용하게끔 하게 됨(비효율적)
    - 이를 해결하기 위해, Flux라는 개념을 도입하여, Context API를 제공
    - [Flux](https://reactjs.org/blog/2014/05/06/flux.html)
      - Context: 부모 컴포넌트로부터 자식 컴포넌트로 전달되는 데이터의 흐름과는 상관없이, 전역적으로 사용되는 데이터를 다룸
      - 전역 데이터를 Context에 저장한 후, 필요한 컴포넌트에서 해당 데이터를 불러와 사용
        - Provider
        - Consumer
        - [ ] 호출 순서도
    - useEffect
  - [Flexbox](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout/Flexbox의_기본_개념): React Native는 기본적으로 flexbox를 사용하여 화면 레이아웃을 설정
- 참고할 만한 plugin
  - AsyncStorage: App내에서 간단하게 데이터를 저장할 수 있는 저장소
    - Props, State, Context는 모두 휘발성 -> 메모리에만 존재
    - [async-storage](https://github.com/react-native-community/react-native-async-storage)
    - 로그인 이후, 서버로부터 전달받은 토큰을 저장하거나, 캐싱하는 용도로 활용(다른 용도가 더 있는지 확인 필요)
  - Redux vs Mobx (Context API가 나오기전에 사용한 대체제?)
    - [Redux](https://redux.js.org)
    - [Mobx](https://mobx.js.org/README.html)

### WeatherApp

- 기본 환경 구성
  - IOS, Android의 설정파일 수정하는 것
  - IOS의 cocoapod 사용법
  - 기기별 권한 요청에 대한 설정 및 처리(예를들면, ios의 위치정보 권한 요청)
- 필요한 개념

  - XMLHttpRequest(XHR), 이벤트 기반 모델(Event based Model): 입출력과 상태(State)를 모두 하나의 객체로 관리 -> 여기서 상태는 이벤트를 통해 추적
  - Await / Async
  - Promise 기반 비동기 방식
    - Fetch API
      - try/catch로 Error 처리
      - then으로 callback hell 회피
    - Axios
  - React
    - FlatList의 "당겨서 갱신하기(Pull to refresh)" 기능 -> API와 연동해서 동작하는 방법

- 참고할 만한 plugin
  - Geolocation API(위치 정보 API): react-native-geolocation-service
  - [React Native Community](https://github.com/react-native-community)
  - [Awesome React Native](https://github.com/jondot/awesome-react-native)
  - [Awesome React Native UI](https://github.com/madhavanmalolan/awesome-reactnative-ui)

## Reference

- [책: 스무디 한 잔 마시며 끝내는 React Native React Native로 실전 스마트폰 앱 만들기](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791190014625&orderClick=LEa&Kc=)
- [책 예제: 스무디 한 잔 마시며 끝내는 React Native React Native로 실전 스마트폰 앱 만들기](https://github.com/bjpublic/Reactnative)
