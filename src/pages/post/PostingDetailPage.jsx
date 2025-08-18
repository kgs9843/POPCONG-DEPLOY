import styled from "styled-components";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeftArrow from "../../assets/icons/leftArrowIcon.svg"; // 좌측 화살표 (하얀색)
import RightArrow from "../../assets/icons/rightArrowIcon.svg"; // 우측 화살표 (하얀색)
import HeartIcon from "../../assets/icons/heartIcon.svg";
import HeartActiveIcon from "../../assets/icons/activeIcons/heartActiveIcon.svg";
import GrayMarkerIcon from "../../assets/icons/grayMarker.svg";
import StarIcon from "../../assets/icons/star.svg";
const dummyPosting = {
  id: 1,
  price: 100000,
  subText: "한줄소개",
  location: "대구 북구 대학로 71",
  subLocation: "2층",
  maxDays: 7,
  images: [
    "https://via.placeholder.com/500x300?text=Image1",
    "https://via.placeholder.com/500x300?text=Image2",
    "https://via.placeholder.com/500x300?text=Image3",
  ],
  buildingUsage: "근린생활시설", // 건축물 용도
  floor: "2", // 해당 층
  area: "45", // 전용면적 (㎡)
  // 기존에 있던 데이터
  distance: 700,
  reviews: 16,
  rating: 4.0,
};

const dummyHost = {
  id: 1,
  name: "홍길동",
  profileImage: "https://via.placeholder.com/150",
  introduction: "안녕하세요! 성실하게 임대 관리해드립니다.",
  listingCount: 5,
};
const PostingDetailPage = () => {
  const navigate = useNavigate();
  const { price, rating, reviews, subText, location, images } = dummyPosting;
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false); // 상태값 저장

  const total = 5;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };
  return (
    <MainContainer>
      <div style={{ overflowY: "auto", height: "100%", width: "100%" }}>
        <div style={{ height: 60 }} />
        {/* 이미지 영역 */}
        <ImageBox>
          <HeartContainer onClick={() => setLiked((prev) => !prev)}>
            <img src={liked ? HeartActiveIcon : HeartIcon} alt="heart" />
          </HeartContainer>
          {images[currentIndex] ? (
            <img
              src={images[currentIndex]}
              alt={`item-${currentIndex}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "이미지"
          )}

          {/* 좌우 버튼 */}
          {total > 1 && (
            <>
              <ArrowButton left onClick={handlePrev}>
                <img src={LeftArrow} alt="Prev" />
              </ArrowButton>
              <ArrowButton right onClick={handleNext}>
                <img src={RightArrow} alt="Next" />
              </ArrowButton>
            </>
          )}

          {/* 카운터 */}
          <ImageCounter>
            {currentIndex + 1} / {total}
          </ImageCounter>
        </ImageBox>
        <Content>
          {/* 가격, 위치, 평점 */}
          <InfoSection>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Price>{price.toLocaleString()}원</Price>
              <EditBtn
                onClick={() => {
                  navigate("/post/create", { state: dummyPosting });
                }}
              >
                수정하기
              </EditBtn>
            </div>
            <SubText>{subText}</SubText>
            <Location>
              <img src={GrayMarkerIcon} alt="marker" /> {location}
            </Location>
            <Rating>
              <img src={StarIcon} alt="star" /> {rating}{" "}
              <span style={{ fontSize: 12, color: "var(--gray2)" }}>
                ({reviews})
              </span>
            </Rating>
          </InfoSection>
        </Content>
        <Divider />
        <Content>
          {/* 상세정보 (임의로 값 고정) */}
          <DetailSection>
            <SectionTitle>상세정보</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <DetailRow>
                <Label>건축물용도</Label>
                <Value>제1종근린생활시설</Value>
              </DetailRow>
              <DetailRow>
                <Label>해당층/건물층</Label>
                <Value>1층 / 6층</Value>
              </DetailRow>
              <DetailRow>
                <Label>전용면적</Label>
                <Value>140.82㎡</Value>
              </DetailRow>
              <DetailRow>
                <Label>임대가능 최대일수</Label>
                <Value>140.82㎡</Value>
              </DetailRow>
            </div>
          </DetailSection>
        </Content>

        <Divider />
        <Content>
          <DetailSection>
            <SectionTitle>호스트 정보</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <HostProfile>
                  <img src={dummyHost.profileImage} alt={dummyHost.name} />
                </HostProfile>
                <HostName>{dummyHost.name}</HostName>
              </div>
              <HostInfo>{dummyHost.introduction}</HostInfo>
              <DetailRow>
                <Label>등록 매물 수</Label>
                <Value>{dummyHost.listingCount}개</Value>
              </DetailRow>
            </div>
          </DetailSection>
        </Content>
      </div>
      <NextBox>
        <NextButton
          onClick={() => {
            navigate(`/chat/room/${id}`);
          }}
        >
          문의하기
        </NextButton>
      </NextBox>
    </MainContainer>
  );
};

export default PostingDetailPage;

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const HeartContainer = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  top: 5px;
  right: 5px;
  z-index: 500;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px 20px;
  position: relative;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
`;
const ImageBox = styled.div`
  width: 100%;
  height: 230px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 8px;
  right: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 8px;" : "right: 8px;")}
  transform: translateY(-50%);
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
  }
`;
const InfoSection = styled.div`
  padding: 15px;
`;

const Price = styled.div`
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;
const EditBtn = styled.div`
  /* Frame 1707484303 */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;
  font-size: 10px;
  margin: 0 auto;
  width: 53px;
  height: 22px;

  border: 1px solid rgba(189, 207, 245, 0.3);
  border-radius: 10px;
`;
const SubText = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Location = styled.div`
  font-size: 14px;
  color: var(--gray2);
  margin-bottom: 5px;
`;

const Rating = styled.div`
  font-size: 14px;
  display: flex;
  gap: 5px;
`;

const Divider = styled.div`
  height: 10px;
  background: var(--gray1);
`;

const DetailSection = styled.div`
  padding: 15px;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 15px 0;
  border-bottom: 1px solid var(--gray1);
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  min-width: 40%;
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  text-align: start;
`;
const HostInfo = styled.div`
  width: 100%;
  height: auto;
  min-height: 20px;
`;

const HostProfile = styled.div`
  width: 50px;
  height: 50px;
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
  font-size: 16px;
  font-weight: 600;
`;
const NextBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  width: 90%;
`;
const NextButton = styled.button`
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
