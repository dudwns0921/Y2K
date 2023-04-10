# y2K
## 컨벤션
- 구조 자체가 복잡하지 않기 때문에 컴포넌트간 통신은 이벤트로 진행
- env파일에는 공개되면 안되는 데이터만 저장
    - 현재 관리자 이메일은 상수 파일에 저장중
- Error를 표시할 때는 try catch문에서 throw Error을 통해 해결하자.
- 규모가 크지 않기 때문에 아토믹 디자인중 template은 필요없을 것 같음.
    - template을 통해 여러 개의 page 인스턴스를 만드는데, template을 재사용할 정도로 규모가 크지 않음
- 커스텀 이벤트에 대한 메서드를 정의할 때는 handle이벤트명으로 작성
- 기본 이벤트에 대한 메서드를 정의할 때는 메서드의 목적에 따라 메소드명 작성
    - 커스텀 이벤트는 이벤트명으로 어떤 작업인지 유추가 가능하지만, 기본 이벤트는 그게 불가능
    - 따라서 메소드가 어떤 행위를 하는지 정확하게 표기

### 컨벤션 레퍼런스
- https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/
- https://github.com/pablohpsilva/vuejs-component-style-guide/blob/master/README-KR.md
