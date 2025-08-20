import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LeftArrowIcon from "../../assets/icons/leftArrowIconBlack.svg";
import BuyCheckIcon from "../../assets/icons/buyCheckIcon.svg";
import useHistoryStore from "../../stores/useHistoryStore";
const ChatRoomFinalPage = () => {
  const { reverseAddReservation, moveToOngoing } = useHistoryStore();
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
      {/* 상단 헤더 */}
      <Header>
        <Title>결제 완료</Title>
      </Header>

      {/* 본문 */}
      <Content>
        {/* 체크 아이콘 (SVG) */}
        <img src={BuyCheckIcon} alt="check" style={{ width: 120 }} />

        <MainText>결제가 완료되었습니다.</MainText>
        <SubText>시작하기를 눌러 팝콩 서비스를 이용해 보세요!</SubText>
      </Content>

      {/* 하단 버튼 */}
      <HomeBox>
        <HomeButton
          onClick={() => {
            navigate("/home", { state: { roomId } });
            reverseAddReservation();
            moveToOngoing();
          }}
        >
          홈으로 가기
        </HomeButton>
      </HomeBox>
    </Container>
  );
};

export default ChatRoomFinalPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

// const BackButton = styled.button`
//   position: absolute;
//   left: 10px;
//   background: none;
//   cursor: pointer;
// `;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const Spacer = styled.div`
  width: 24px; /* 뒤로가기 버튼과 대칭 맞추기용 */
`;

const Content = styled.div`
  flex: 1;
  position: relative;
  top: -50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const MainText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const SubText = styled.p`
  font-size: 14px;
  color: var(--gray2);
`;

const HomeBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  width: 90%;
`;
const HomeButton = styled.button`
  width: 100%;
  background: var(--default1);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: medium;
  font-weight: 500;
  height: 50px;
  border-radius: 4px;
`;
