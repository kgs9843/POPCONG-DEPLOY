import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import LeftArrowIcon from "../../assets/icons/leftArrowIconBlack.svg";
import GrayIcon from "../../assets/icons/grayMarker.svg";

const dummyPlace = {
  id: 1,
  price: 100000,
  distance: 700,
  reviews: 16,
  rating: 4.0,
  location: "대구 북구 대학로 71 2층",
  image: "https://via.placeholder.com/80", // 가짜 이미지 URL (실제 이미지 URL로 대체 가능)
};

const ChatRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! 혹시 지금 거래 가능할까요?",
      sender: "other",
      time: "오후 5:35",
    },
    { id: 2, text: "네 가능합니다 😀", sender: "me", time: "오후 5:36" },
    {
      id: 3,
      text: "좋아요! 위치는 어디신가요?",
      sender: "other",
      time: "오후 5:37",
    },
    {
      id: 4,
      text: "대구 북구 대학로 71 2층입니다.",
      sender: "me",
      time: "오후 5:38",
    },
    {
      id: 5,
      text: "알겠습니다. 근처 카페에서 만나는 건 어떨까요?",
      sender: "other",
      time: "오후 5:39",
    },
    {
      id: 6,
      text: "네 좋아요. 혹시 몇 시쯤 가능하세요?",
      sender: "me",
      time: "오후 5:40",
    },
    {
      id: 7,
      text: "6시쯤 괜찮으신가요?",
      sender: "other",
      time: "오후 5:41",
    },
    {
      id: 8,
      text: "네 6시 좋습니다!",
      sender: "me",
      time: "오후 5:41",
    },
    {
      id: 9,
      text: "물건 상태는 괜찮은가요?",
      sender: "other",
      time: "오후 5:42",
    },
    {
      id: 10,
      text: "네, 사용감은 거의 없고 깨끗합니다 🙂",
      sender: "me",
      time: "오후 5:43",
    },
    {
      id: 11,
      text: "혹시 실물 사진도 받아볼 수 있을까요?",
      sender: "other",
      time: "오후 5:44",
    },
    {
      id: 12,
      text: "네 잠시만요, 지금 보내드릴게요.",
      sender: "me",
      time: "오후 5:44",
    },
    {
      id: 13,
      text: "[사진]",
      sender: "me",
      time: "오후 5:45",
    },
    {
      id: 14,
      text: "오 상태가 정말 좋네요 👍",
      sender: "other",
      time: "오후 5:46",
    },
    {
      id: 15,
      text: "감사합니다 ㅎㅎ 바로 거래 진행하실까요?",
      sender: "me",
      time: "오후 5:47",
    },
    {
      id: 16,
      text: "네 그럼 오늘 6시에 뵙겠습니다.",
      sender: "other",
      time: "오후 5:48",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), text: input, sender: "me", time: "오후 5:40" },
    ]);
    setInput("");
  };
  return (
    <Container>
      <div
        style={{
          padding: "75px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          position: "relative",
          height: "calc(100% - 150px)",
        }}
      >
        {/* 상단 상품/장소 정보 */}
        <Header1>
          <BackButton onClick={() => navigate(-1)}>
            <img src={LeftArrowIcon} alt="back" />
          </BackButton>
          <Title>이름</Title>
        </Header1>
        <Header2>
          <Info>
            <Top>
              <img
                src={dummyPlace.image}
                alt="item"
                style={{ width: 45, height: 45, backgroundColor: "#CCC" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  height: "auto",
                  flex: 1,
                  gap: 5,
                }}
              >
                <SubText>
                  <img
                    src={GrayIcon}
                    alt="marker"
                    style={{ width: "auto", height: "auto" }}
                  />
                  {dummyPlace.location}
                </SubText>
                <Price>{dummyPlace.price.toLocaleString()}원</Price>
              </div>
            </Top>
          </Info>
          <PriceBox>
            <PayButton
              onClick={() =>
                navigate(`/chat/room/buy/${id}`, {
                  state: { place: dummyPlace },
                })
              }
            >
              결제하기
            </PayButton>
          </PriceBox>
        </Header2>

        {/* 채팅 영역 */}
        <MessageList>
          {messages.map((m) => (
            <MessageBubble key={m.id} sender={m.sender}>
              {m.sender === "me" ? (
                <>
                  <Time>{m.time}</Time>
                  <MessageText sender={m.sender}>{m.text}</MessageText>
                </>
              ) : (
                <>
                  <MessageText sender={m.sender}>{m.text}</MessageText>
                  <Time>{m.time}</Time>
                </>
              )}
            </MessageBubble>
          ))}
        </MessageList>

        {/* 입력창 */}
        <InputContainer>
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <SendButton onClick={sendMessage}>전송</SendButton>
        </InputContainer>
      </div>
    </Container>
  );
};

export default ChatRoomPage;

// styled-components
const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Header1 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
`;
const Header2 = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--gray1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Info = styled.div`
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const SubText = styled.div`
  display: flex;
  gap: 2px;
  font-size: 13px;
  color: var(--gray2);
`;

const PriceBox = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const PayButton = styled.button`
  background: var(--default1);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 5px;
  width: auto;
  height: auto;
  border-radius: 4px;
`;

const MessageList = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
`;

const MessageBubble = styled.div`
  display: flex;
  justify-content: ${({ sender }) =>
    sender === "me" ? "flex-end" : "flex-start"};
`;

const MessageText = styled.div`
  background: ${({ sender }) =>
    sender === "me" ? "var(--default1)" : "#e5e5ea"};
  color: ${({ sender }) => (sender === "me" ? "white" : "black")};
  padding: 10px;
  border-radius: 15px;
  max-width: 60%;
`;

const Time = styled.div`
  font-size: 10px;
  color: gray;
  margin-top: 4px;
  margin-left: 8px;
  margin-right: 8px;
  height: auto;
  display: flex;
  justify-content: end;
  align-items: end;
  position: relative;
  top: -5px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ChatInput = styled.input`
  flex: 1;
  border: 1px solid var(--gray2);
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 14px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  background: var(--default1);
  border: none;
  color: white;
  border-radius: 20px;
  padding: 0 15px;
  cursor: pointer;
`;
