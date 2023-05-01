# y2K
## 컨벤션
- 구조 자체가 복잡하지 않기 때문에 컴포넌트간 통신은 웬만하면 이벤트와 prop으로 진행
- env파일에는 공개되면 안되는 데이터만 저장
- 이벤트 이름은 모두 상수 파일로 관리
- Error를 표시할 때는 try catch문에서 throw Error을 통해 해결.
- 규모가 크지 않기 때문에 아토믹 디자인중 template은 필요없을 것 같음.
    - template을 통해 여러 개의 page 인스턴스를 만드는데, template을 재사용할 정도로 규모가 크지 않음
- 커스텀 이벤트에 대한 메서드를 정의할 때는 handle이벤트명으로 작성
- 기본 이벤트에 대한 메서드를 정의할 때는 메서드의 목적에 따라 메소드명 작성
    - 커스텀 이벤트는 이벤트명으로 어떤 작업인지 유추가 가능하지만, 기본 이벤트는 그게 불가능
    - 따라서 메소드가 어떤 행위를 하는지 정확하게 표기
- tailwind를 사용중인데, 동적인 값을 적용할 때 안 먹히는 경우가 있음. 동적인 값은 style 속성에 객체로 바인딩하기.
- z-index
    - 헤더 z-10
    - 모달 오버레이 z-20
    - 모달창 z-30
    - 팝업 오버레이 z-40
    - 팝업창 z-50
        팝업은 모달창보다 최소한 헤더보다는 앞에 있어야 하고, 모달창보다 앞에 있어야 하는 경우가 있음.

### 컨벤션 레퍼런스
- https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/
- https://github.com/pablohpsilva/vuejs-component-style-guide/blob/master/README-KR.md

## 주요 flow
### 콘텐츠 수정하기
depth 자체가 깊지 않기 때문에 event와 prop으로 충분히 구현 가능하다고 판단
firebase 데이터베이스 set 메서드 그대로 활용.
- contentCard 컴포넌트에서 event emit
- contentsContainer 컴포넌트에서 content 정보를 받아 event emit
- App 컴포넌트까지 전달
- App 컴포넌트에서는 자식 컴포넌트인 FormModal에게 prop으로 content 정보 전달
- FormComponent까지 prop으로 전달
