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
                  <ProfileImg
                    src="data:image/jpeg;base64,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"
                    alt="profile"
                  />
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
