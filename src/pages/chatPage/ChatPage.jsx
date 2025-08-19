// ChatPage.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 더미 데이터
const dummyData = [
  {
    id: 1,
    name: "홍길동",
    lastMessage: "안녕하세요! 오늘 보시나요?",
    time: "방금 전",
    unreadCount: 3,
    profile: "https://via.placeholder.com/40",
    buildingImage: "https://via.placeholder.com/50",
    timestamp: new Date(2024, 7, 15, 10, 20), // 정렬용 timestamp
  },
  {
    id: 2,
    name: "김철수",
    lastMessage: "네 내일 괜찮습니다.",
    time: "1시간 전",
    unreadCount: 0,
    profile: "https://via.placeholder.com/40",
    buildingImage: "https://via.placeholder.com/50",
    timestamp: new Date(2024, 7, 15, 9, 10),
  },
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState("newest");

  // 정렬 함수
  const getSortedList = () => {
    switch (activeSort) {
      case "newest": // 최신순
        return [...dummyData].sort((a, b) => b.timestamp - a.timestamp);
      case "oldest": // 오래된 순
        return [...dummyData].sort((a, b) => a.timestamp - b.timestamp);
      default:
        return dummyData;
    }
  };

  const sortedList = getSortedList();

  return (
    <MainContainer>
      <div
        style={{
          padding: "75px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 정렬 탭 */}
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Span2
            active={activeSort === "newest"}
            onClick={() => setActiveSort("newest")}
          >
            최신순
          </Span2>
          <Span2
            active={activeSort === "oldest"}
            onClick={() => setActiveSort("oldest")}
          >
            오래된 순
          </Span2>
        </div>

        {/* 채팅 리스트 */}
        <ChatList>
          {sortedList.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                color: "var(--gray2)",
                fontSize: 16,
              }}
            >
              아직 채팅이 없어요
            </div>
          ) : (
            <>
              {sortedList.map((item) => (
                <ChatItem
                  key={item.id}
                  onClick={() => navigate(`/chat/room/${item.id}`)}
                >
                  <ProfileImg src={item.profile} alt="profile" />
                  <ChatInfo>
                    <Name>{item.name}</Name>
                    <div
                      style={{ display: "flex", flexDirection: "row", gap: 5 }}
                    >
                      <Message>{item.lastMessage}</Message>
                      <Time>{item.time}</Time>
                      {item.unreadCount > 0 && (
                        <Unread>{item.unreadCount}</Unread>
                      )}
                    </div>
                  </ChatInfo>
                  <BuildingImg src={item.buildingImage} alt="building" />
                </ChatItem>
              ))}
            </>
          )}
        </ChatList>
      </div>
    </MainContainer>
  );
};

export default ChatPage;

// styled-components
const MainContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
`;

const Span2 = styled.span`
  position: relative;
  padding: 0 10px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid
    ${({ active }) => (active ? "var(--default1)" : "var(--gray2)")};
  color: ${({ active }) => (active ? "var(--default1)" : "var(--gray2)")};
`;

const ChatList = styled.div`
  display: flex;
  height: 75vh;
  overflow-y: auto;
  flex-direction: column;
  gap: 15px;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray1);
`;

const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ccc;
`;

const ChatInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Message = styled.div`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.div`
  font-size: 12px;
  color: var(--gray2);
`;

const Unread = styled.div`
  position: relative;
  top: -5px;
  background: var(--red);
  color: white;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BuildingImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: #ddd;
`;
