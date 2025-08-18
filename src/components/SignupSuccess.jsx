import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import successIcon from "../assets/icons/successIcon.svg";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  padding: 20px;
  box-sizing: border-box;
`;

const PageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  padding: 16px 0;
  color: var(--black);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Icon = styled.img`
  margin-bottom: 16px;
`;

const Title = styled.h2`
  color: var(--black);
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.4px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: var(--gray2);
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const NextButton = styled.button`
  all: unset;
  display: flex;
  height: 42px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: var(--default1);
  cursor: pointer;

  color: var(--white);
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;

  &:disabled {
    color: var(--white) !important;
    cursor: default;
  }

  position: fixed;
  bottom: 20px;
  left: 17px;
  right: 17px;
`;

const SignupSuccess = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <Container>
      <PageHeader>가입 완료</PageHeader>

      <ContentWrapper>
        <Icon src={successIcon} alt="가입 성공" />
        <Title>회원가입이 완료되었습니다.</Title>
        <Subtitle>시작하기를 눌러 팝콩 서비스를 이용해 보세요!</Subtitle>
      </ContentWrapper>

      <NextButton onClick={handleStart}>시작하기</NextButton>
    </Container>
  );
};

export default SignupSuccess;
