import styled from "styled-components";

const Main = () => {
  return <MainContainer>컴포넌트 작성하기</MainContainer>;
};

export default Main;

// styled-components
const MainContainer = styled.div`
  background-color: var(--main-blue-color);
  width: 100%;
  height: 100vh;
`;
