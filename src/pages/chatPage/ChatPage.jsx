// ChatPage.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../../stores/chatStore";
const ChatPage = () => {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState("newest");
  const { chats, setUnreadCount } = useChatStore();

  // 정렬 함수
  const getSortedList = () => {
    switch (activeSort) {
      case "newest": // 최신순
        return [...chats].sort((a, b) => b.timestamp - a.timestamp);
      case "oldest": // 오래된 순
        return [...chats].sort((a, b) => a.timestamp - b.timestamp);
      default:
        return chats;
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
                  onClick={() => {
                    navigate(`/chat/room/${item.id}`);
                    setUnreadCount(item.id); // ✅ 함수 호출
                  }}
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
