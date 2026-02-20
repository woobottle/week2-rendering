Step1

#### Network 탭 분석

1. **FCP (First Contentful Paint)**: 첫 콘텐츠가 화면에 표시되는 시간
    - SSR: `/posts?delay=2000` 에서 측정
    - CSR: `/todos?delay=2000` 에서 측정
    - 어느 쪽이 더 빠른가요? 왜 그럴까요?
      - SSR이 더 빠름. => csr은 js를 다운로드 받고 실행한 후에야 api를 호출하기 때문
2. **Network Waterfall**: 요청 순서 비교
    - SSR: HTML Response에 데이터가 이미 포함되어 있는지 확인
    - CSR: JS 다운로드 → 실행 → API 요청 순서로 진행되는지 확인
3. **소스 보기 (View Page Source)**:
    - SSR(`/posts`): 완성된 HTML에 게시글 데이터가 들어있는지 확인
    - CSR(`/todos`): 빈 컨테이너만 보이고 데이터가 없는지 확인


#### Performance 탭 분석

1. **LCP (Largest Contentful Paint)**: 가장 큰 콘텐츠가 렌더링되는 시간
    - SSR: `/posts?delay=2000` 에서 측정 => 2.43s
    - CSR: `/todos?delay=2000` 에서 측정 => 2.55s
    
2. **TTI (Time to Interactive)**: 페이지가 인터랙티브해지는 시간
    - SSR: `/posts?delay=2000` 에서 측정 => 2.44s => nextjs에서 hydration이 완료되는 시간으로 측정 / hydration이 완료되어야 페이지의 반응이 가능
    - CSR: `/todos?delay=2000` 에서 측정 => 2.55s => csr에서는 fetching후 화면에 그려지면 바로 인터랙티브 가능
3. delay를 **0ms, 1000ms, 3000ms**로 변경하며 각각 측정해보기
  - 0ms: SSR => 351.19ms, CSR => 439.22ms
  - 1000ms: SSR => 1.45s, CSR => 1.55s
  - 3000ms: SSR => 3.40s, CSR => 3.41s


Step3

#### 번들크기 비교

1. 번들 크기 비교
    - 서버 컴포넌트 페이지: (/markdown-demo/server) : 145B
    - 클라이언트 컴포넌트 페이지: (/markdown-demo/client) : 42.59KB (40KB면 대충 4만 글자, 영문/숫자/특수문자는 1Byte, 한글은 3Byte)

2. Network탭에서 JS 다운로드 크기 비교
    - 서버 컴포넌트 페이지: (/markdown-demo/server) : 117KB
    - 클라이언트 컴포넌트 페이지: (/markdown-demo/client) : 130KB => client 페이지가 13KB로 확인됨
    => 둘의 차이가 13KB인 이유는 번들에서 보여지는 크기는 압축 전이기 때문 (gzip으로 next > nodejs 서버에서 압축 해줌)


Step4

#### 측정 정리표

| 패턴 | 구조 | `marked` 번들 포함 여부 | JS 크기 |
| --- | --- | --- | --- |
| A | 서버 → 클라이언트 | x | 132KB |
| B | 클라이언트에서 서버를 import | 포함됨 | 145KB |
| C | 클라이언트의 children으로 전달 | x | 132KB |

=> 클라이언트에서 서버를 import할때 무한 로딩 발생 / react는 Promise의 결과를 캐싱할 수 있는 방법이 현재 없다 / 외부 라이브러리 사용해야함