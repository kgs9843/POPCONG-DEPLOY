// components/ItemModal.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../assets/icons/closeIcon.svg";
import StarIcon from "../assets/icons/star.svg";
import GrayMarker from "../assets/icons/grayMarker.svg";
import LeftArrow from "../assets/icons/leftArrowIcon.svg"; // 좌측 화살표 (하얀색)
import RightArrow from "../assets/icons/rightArrowIcon.svg"; // 우측 화살표 (하얀색)
import HeartIcon from "../assets/icons/heartIcon.svg";
import HeartActiveIcon from "../assets/icons/activeIcons/heartActiveIcon.svg";
import { likeSpace } from "../api/wish-controller/wishPost";
import { unlikeSpace } from "../api/wish-controller/wishDelete";
const ItemModal = ({ isOpen, onClose, item }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false); // 상태값 저장
  if (!isOpen || !item) return null;

  const images =
    item.coverImageUrl && item.coverImageUrl.length > 0
      ? item.coverImageUrl
      : [null]; // 기본 이미지 처리
  const total = 1;
  console.log(item);
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleLikeToggle = async () => {
    try {
      const spaceId = item.spaceId; // 임의 ID

      if (liked) {
        // 이미 좋아요 상태라면 → 취소 요청
        const res = await unlikeSpace(spaceId);
        if (res?.data?.isLiked !== undefined) {
          setLiked(res.data.isLiked);
        } else {
          setLiked(false);
        }
      } else {
        // 좋아요 상태가 아니라면 → 생성 요청
        const res = await likeSpace(spaceId);
        if (res?.data?.isLiked !== undefined) {
          setLiked(res.data.isLiked);
        } else {
          setLiked(true);
        }
      }
    } catch (error) {
      console.error("좋아요 토글 에러:", error);
    }
  };

  return (
    <Overlay>
      <Modal>
        <div
          style={{
            width: "100%",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            position: "relative",
          }}
        >
          {/* 닫기 버튼 */}
          <CloseButton onClick={onClose}>
            <img src={CloseIcon} alt="X" />
          </CloseButton>
        </div>

        <HeartContainer onClick={handleLikeToggle}>
          <img src={liked ? HeartActiveIcon : HeartIcon} alt="heart" />
        </HeartContainer>

        {/* 이미지 영역 */}
        <ImageBox>
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

        {/* 내용 */}
        <Content>
          <Price>{item.price.toLocaleString()}원</Price>
          <Location>
            <img src={GrayMarker} alt="Marker" /> {item.location}
          </Location>
          <Rating>
            <img src={StarIcon} alt="Star" /> {item.rating}{" "}
            <span style={{ fontSize: 12 }}>({item.reviews})</span>
          </Rating>
        </Content>

        {/* 버튼들 */}
        <ButtonContainer>
          <Button
            onClick={() => {
              navigate(`/post/detail/${item.spaceId}`, { state: { item } });
            }}
          >
            상세보기
          </Button>
          <InquiryButton
            onClick={() => {
              navigate(`/chat/room/${item.spaceId}`, { state: { item } });
            }}
          >
            문의하기
          </InquiryButton>
        </ButtonContainer>
      </Modal>
      <div style={{ height: 80, width: "100%" }} />
    </Overlay>
  );
};

export default ItemModal;

// styled-components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  flex-direction: column;
`;

const Modal = styled.div`
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  width: 320px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const HeartContainer = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  top: 45px;
  right: 5px;
  z-index: 500;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 180px;
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

const Content = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Location = styled.div`
  font-size: 14px;
  color: gray;
  margin-bottom: 8px;
`;

const Rating = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;

  span {
    color: gray;
    font-weight: normal;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
`;

const Button = styled.button`
  flex: 1;
  height: 36px;
  border: 1px solid var(--gray1);
  border-radius: 6px;
  background: white;
  cursor: pointer;
`;

const InquiryButton = styled(Button)`
  background: var(--default1);
  color: white;
  border: none;
`;
