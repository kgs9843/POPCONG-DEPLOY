import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpArrowIcon from "../../assets/icons/upArrowIcon.svg"; // svg 불러오기
import Star from "../../assets/icons/star.svg";
import GrayMarker from "../../assets/icons/grayMarker.svg";
const dummyHost = {
  id: 1,
  name: "홍길동",
  profileImage: "https://via.placeholder.com/150",
  introduction: "안녕하세요! 성실하게 임대 관리해드립니다.",
  listingCount: 5,
  host: true,
};

// 더미 데이터 (10개)
const dummyData = [
  {
    id: 1,
    price: 100000,
    distance: 700,
    reviews: 16,
    rating: 4.0,
    location: "대구 북구 대학로 71 2층",
  },
  {
    id: 2,
    price: 50000,
    distance: 15500,
    reviews: 25,
    rating: 4.5,
    location: "대구 중구 중앙대로 23",
  },
  {
    id: 3,
    price: 200000,
    distance: 1500,
    reviews: 10,
    rating: 3.8,
    location: "대구 수성구 들안로 102",
  },
  {
    id: 4,
    price: 75000,
    distance: 300,
    reviews: 40,
    rating: 4.7,
    location: "대구 달서구 월배로 11",
  },
  {
    id: 5,
    price: 120000,
    distance: 2200,
    reviews: 18,
    rating: 4.2,
    location: "대구 북구 칠곡중앙대로 55",
  },
  {
    id: 6,
    price: 95000,
    distance: 5000,
    reviews: 33,
    rating: 4.3,
    location: "대구 동구 동대구로 77",
  },
  {
    id: 7,
    price: 300000,
    distance: 800,
    reviews: 5,
    rating: 3.5,
    location: "대구 서구 서대구로 19",
  },
  {
    id: 8,
    price: 60000,
    distance: 1200,
    reviews: 27,
    rating: 4.6,
    location: "대구 남구 현충로 8",
  },
  {
    id: 9,
    price: 180000,
    distance: 9500,
    reviews: 22,
    rating: 4.1,
    location: "대구 달성군 화원읍 성화로 21",
  },
  {
    id: 10,
    price: 80000,
    distance: 400,
    reviews: 12,
    rating: 3.9,
    location: "대구 중구 동성로 12",
  },
];
const MyPage = () => {
  const navigate = useNavigate();
  const [likeOpen, setLikeOpen] = useState(false);
  const [hostOpen, setHostOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reserveCount, setReserveCount] = useState(2);
  const [progressCount, setProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  return (
    <MainContainer>
      <Content>
        {/* 프로필 박스 */}
        <Section>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HostProfile>
                  <img src={dummyHost.profileImage} alt={dummyHost.name} />
                </HostProfile>
                <HostName>{dummyHost.name} 님</HostName>
                {/* host 라벨 */}
                {dummyHost.host && <HostLabel>Host</HostLabel>}
              </div>
              <ModifyBtn
                onClick={() =>
                  navigate("/mypage/edit/profile", { state: dummyHost })
                }
              >
                프로필 편집
              </ModifyBtn>
            </div>
            <HostInfo>{dummyHost.introduction}</HostInfo>
            {dummyHost.host && (
              <FullWidthBtn onClick={() => navigate("/post/create")}>
                상가 등록하기
              </FullWidthBtn>
            )}
          </div>
        </Section>
        {/* 내역 박스 */}
        <Section>
          <HistoryBox>
            <HistoryItem>
              예약 내역 <span>{reserveCount}건</span>
            </HistoryItem>
            <HistoryItem>
              진행중 내역 <span>{progressCount}건</span>
            </HistoryItem>
            <HistoryItem>
              완료 내역 <span>{doneCount}건</span>
            </HistoryItem>
          </HistoryBox>
        </Section>

        {/* 관심목록 아코디언 */}
        <Section>
          <AccordionHeader onClick={() => setLikeOpen((prev) => !prev)}>
            관심 목록
            <Arrow
              src={UpArrowIcon}
              alt={"UpArrowIcon"}
              rotate={open ? 180 : 0}
            />
          </AccordionHeader>
          {likeOpen && (
            <AccordionContent>
              {/* 리스트 */}

              {dummyData.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                >
                  <Thumbnail />
                  <Info>
                    <Price>{item.price.toLocaleString()}원</Price>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", gap: 3 }}>
                        <img src={GrayMarker} alt="Marker" />
                        <SubInfo>{item.location}</SubInfo>
                      </div>
                    </div>
                    <Rating>
                      <img src={Star} alt="Star" /> {item.rating}{" "}
                      <div
                        style={{
                          color: "var(--gray2)",
                          fontSize: 10,
                          textAlign: "end",
                          height: "100%",
                        }}
                      >
                        ({item.reviews})
                      </div>
                    </Rating>
                  </Info>
                </ListItem>
              ))}
            </AccordionContent>
          )}
        </Section>

        {/* 내 건물 관리 아코디언*/}
        {dummyHost.host && (
          <Section>
            <AccordionHeader onClick={() => setHostOpen((prev) => !prev)}>
              내 건물 관리
              <Arrow
                src={UpArrowIcon}
                alt={"UpArrowIcon"}
                rotate={open ? 180 : 0}
              />
            </AccordionHeader>
            {hostOpen && (
              <AccordionContent>
                {/* 리스트 */}

                {dummyData.map((item) => (
                  <ListItem
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                    }}
                  >
                    <Thumbnail />
                    <Info>
                      <Price>{item.price.toLocaleString()}원</Price>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", gap: 3 }}>
                          <img src={GrayMarker} alt="Marker" />
                          <SubInfo>{item.location}</SubInfo>
                        </div>
                      </div>
                      <Rating>
                        <img src={Star} alt="Star" /> {item.rating}{" "}
                        <div
                          style={{
                            color: "var(--gray2)",
                            fontSize: 10,
                            textAlign: "end",
                            height: "100%",
                          }}
                        >
                          ({item.reviews})
                        </div>
                      </Rating>
                    </Info>
                  </ListItem>
                ))}
              </AccordionContent>
            )}
          </Section>
        )}

        {/* 회원탈퇴 */}
        <LeaveBtn>회원 탈퇴하기</LeaveBtn>
      </Content>
    </MainContainer>
  );
};
export default MyPage;

//
// styled-components
//
const MainContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  padding: 75px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  overflow-y: auto;
`;
const Section = styled.div`
  padding: 15px;
  border: 1px solid var(--gray1);
  border-radius: 10px;
  overflow: hidden;
`;
/* 프로필 */

const HostInfo = styled.div`
  width: 100%;
  height: auto;
  font-size: 14px;
  min-height: 20px;
`;

const FullWidthBtn = styled.div`
  background: none;
  border: none;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  background-color: var(--default4);
  color: var(--default1);
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
`;
const HostProfile = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden; /* 원형 밖으로 넘치는 부분 잘라냄 */
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지 꽉 채우기 */
  }
`;

const HostName = styled.div`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
`;
const HostLabel = styled.div`
  background: none;
  border: none;
  padding: 5px;
  border-radius: 20px;
  background-color: var(--default1);
  color: white;
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
  margin-left: 5px;
`;
const ModifyBtn = styled.button`
  background: none;
  border: 1px solid var(--gray1);
  padding: 5px;
  border-radius: 20px;
  background-color: white;
  color: var(--default1);
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
`;

/* 내역 */
const HistoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px 15px;
`;

const HistoryItem = styled.div`
  color: var(--gray2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  span {
    color: black;
    margin-top: 4px;
    font-weight: bold;
  }
`;

/* 관심목록 아코디언 */

const AccordionHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Arrow = styled.img`
  transition: transform 0.2s ease;
  transform: rotate(${(props) => props.rotate}deg);
`;

const AccordionContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const LeaveBtn = styled.div`
  font-size: 13px;
  color: var(--gray2);
  text-align: start;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
  text-underline-offset: 3px; /* 글자랑 밑줄 간격 */
`;

const ListItem = styled.div`
  display: flex;
  height: 70px;
  gap: 10px;
  padding: 10px 0;
  background-color: "yellow";
  align-items: center;
`;

const Thumbnail = styled.div`
  width: 70px;
  height: 70px;
  background: #ddd;
  border-radius: 8px;
`;

const Info = styled.div`
  flex: 1;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const SubInfo = styled.div`
  font-size: 12px;
  color: var(--gray2);
`;

const Rating = styled.div`
  display: flex;
  gap: 3px;
  font-size: 12px;
  font-weight: 600;
  color: "black";
`;
