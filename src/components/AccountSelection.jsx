import { useState } from "react";
import styled from "styled-components";
import useSignupStore from "../stores/useSignupStore";

// 아이콘
import selectedHostIcon from "../assets/icons/selectedHostIcon.svg";
import unSelectedHostIcon from "../assets/icons/unSelectedHostIcon.svg";
import selectedGuestIcon from "../assets/icons/selectedGuestIcon.svg";
import unSelectedGuestIcon from "../assets/icons/unSelectedGuestIcon.svg";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  padding-top: 60px;
`;

const PageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  padding: 16px 0;
`;

const Title = styled.h2`
  color: var(--black);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
`;

const SelectionWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 280px;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const TypeButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  background-color: transparent;
  border: none;
`;

const Icon = styled.img`
  width: 96px;
  height: 96px;
`;

const ButtonName = styled.p`
  color: ${(props) => (props.$active ? "#1c54d0" : "var(--black)")};
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${(props) => (props.$active ? "var(--default2)" : "var(--gray2)")};
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
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

const AccountSelection = () => {
  const [selectedType, setSelectedType] = useState(null);
  const { setNextStepWithType } = useSignupStore();

  const handleNext = () => {
    if (!selectedType) return;
    // 2단계로 이동 + 선택한 userType 저장
    setNextStepWithType(2, selectedType);
  };

  return (
    <Container>
      <PageHeader>
        <Title>계정 선택</Title>
      </PageHeader>

      <SelectionWrapper>
        <SelectionContainer>
          {/* 호스트 버튼 */}
          <TypeButton onClick={() => setSelectedType("host")}>
            <Icon
              src={
                selectedType === "host" ? selectedHostIcon : unSelectedHostIcon
              }
            />
            <ButtonName $active={selectedType === "host"}>호스트</ButtonName>
            <Description $active={selectedType === "host"}>
              내 매물을 등록하고
              <br />
              임대해 줘요
            </Description>
          </TypeButton>

          {/* 게스트 버튼 */}
          <TypeButton onClick={() => setSelectedType("guest")}>
            <Icon
              src={
                selectedType === "guest"
                  ? selectedGuestIcon
                  : unSelectedGuestIcon
              }
            />
            <ButtonName $active={selectedType === "guest"}>게스트</ButtonName>
            <Description $active={selectedType === "guest"}>
              매물을 임대해서
              <br />
              팝업스토어를 열어요
            </Description>
          </TypeButton>
        </SelectionContainer>
      </SelectionWrapper>

      <NextButton onClick={handleNext} disabled={!selectedType}>
        다음
      </NextButton>
    </Container>
  );
};

export default AccountSelection;
