// 먼저 전역 변수로 사용하고 싶은 상태와 액션 함수의 타입을 정의해줍니다.
export interface ExampleState {
  example: string;
  setExample: (newExample: string) => void;
}

export interface SideMenuState {
  isOpenSideMenu: boolean;
  setIsOpenSideMenu: () => void;
}

export interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
}