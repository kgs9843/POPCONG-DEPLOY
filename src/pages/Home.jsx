import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignupStore from "../stores/useSignupStore";
import useAuthRedirect from "../hooks/useAuthRedirect";
import styled from "styled-components";
import dayjs from "dayjs";

import heartEmpty from "../assets/icons/heartEmpty.svg";
import heartFilled from "../assets/icons/heartFilled.svg";
import star from "../assets/icons/star.svg";
import locationIcon from "../assets/icons/locationIcon.svg";
import locationWhiteIcon from "../assets/icons/locationWhiteIcon.svg";
import popular from "../assets/popular.jpg";
import popular2 from "../assets/popular2.jpeg";
import popular3 from "../assets/popular3.jpeg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding-top: 86px;
`;

const Greeting = styled.p`
  color: var(--black);
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 140%;
  margin-bottom: 23px;
  margin-left: 16px;
`;

const SectionTitle = styled.p`
  color: var(--black);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  margin-left: 16px;
`;

const HorizontalScroll = styled.div`
  display: flex;
  padding: 16px;
  gap: 10px;
  overflow-x: auto;
`;

const PopupCard = styled.div`
  display: flex;
  min-width: 140px;
  min-height: 100px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 8px;
  border: 1px solid var(--default3);
  margin-bottom: 25px;
`;

const StatusBadge = styled.span`
  display: flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: var(--default1);
  color: var(--white);
  font-size: 12px;
  font-weight: 500;
  align-self: flex-start;
  margin-bottom: 4px;
`;

const PopupName = styled.p`
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.35px;
  margin-bottom: 2px;
`;

const PopupAddress = styled.p`
  color: var(--gray2);
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
  margin-bottom: 4px;
`;

const DateRow = styled.p`
  color: #5b86e5;
  text-align: right;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.35px;
  align-self: flex-end;
`;

const SpaceCard = styled.div`
  min-width: 140px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 100px;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const HeartIcon = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  z-index: 2;
`;

const SpaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const AddressRow = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 2px;
  color: var(--gray2);
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

const RatingPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StarFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  flex-shrink: 0;
  color: var(--black);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Price = styled.span`
  color: var(--black);
  text-align: right;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.35px;
`;

const NearbyPopupCard = styled.div`
  position: relative;
  width: 140px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(17, 17, 17, 0.7) 100%
  );
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
`;

const PopupPeriod = styled.div`
  position: absolute;
  top: 10px;
  display: inline-flex;
  width: fit-content;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(--default1);
  color: var(--white);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const PopupLocation = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--white);
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-weight: 400;
`;

const PopupNameText = styled.div`
  color: var(--white);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Status = styled.span`
  color: var(--default1);
  font-size: 12px;
  font-weight: 500;
`;

// 날짜 포맷 함수
const formatPeriod = (startDate, endDate) => {
  return `${dayjs(startDate).format("MM/DD")}~${dayjs(endDate).format(
    "MM/DD"
  )}`;
};

const Home = () => {
  const navigate = useNavigate();
  useAuthRedirect();
  const { name, userType } = useSignupStore();

  const [rerender, setRerender] = useState(false);

  // 나의 팝업 / 나의 매물
  const myItems = [
    {
      status: "이용중",
      popupName: "진주시 감성 스튜디오",
      address: "팝콩시 팝콩동",
      startDate: "2025-08-12",
      endDate: "2025-08-20",
    },
    {
      status: "진행중",
      popupName: "울산시 감성 스튜디오",
      address: "팝콩시 팝콩동",
      startDate: "2025-08-20",
      endDate: "2025-09-10",
    },
    {
      status: "이용중",
      popupName: "청주시 감성 스튜디오",
      address: "팝콩시 팝콩동",
      startDate: "2025-08-23",
      endDate: "2025-09-15",
    },
  ];

  // 최근 인기 매물
  const [spaces, setSpaces] = useState([
    {
      spcaeId: 1,
      spcaeName: "진주시 감성 스튜디오",
      imageUrl: [popular],
      address: "00시 00동 00-0번지",
      rating: 4.0,
      rentalFee: 100000,
      isWished: true,
    },
    {
      spcaeId: 2,
      spcaeName: "울주시 감성 스튜디오",
      imageUrl: [popular2],
      address: "00시 00동 00-0번지",
      rating: 4.5,
      rentalFee: 200000,
      isWished: true,
    },
    {
      spcaeId: 3,
      spcaeName: "울산시 감성 스튜디오",
      imageUrl: [popular3],
      address: "00시 00동 00-0번지",
      rating: 4.3,
      rentalFee: 300000,
      isWished: true,
    },
  ]);

  // 내 주변 팝업스토어
  const nearbyPopups = [
    {
      popupId: 1,
      name: "진주시 팝업",
      address: "진주시 가좌동",
      startDate: "2025-08-12",
      endDate: "2025-08-20",
    },
    {
      popupId: 2,
      name: "울산시 팝업",
      address: "울산시 울산동",
      startDate: "2025-08-20",
      endDate: "2025-09-10",
    },
    {
      popupId: 3,
      name: "청주시 팝업",
      address: "청주시 청주동",
      startDate: "2025-08-20",
      endDate: "2025-09-10",
    },
    {
      popupId: 4,
      name: "강원시 팝업",
      address: "강원시 강원동",
      startDate: "2025-08-20",
      endDate: "2025-09-10",
    },
  ];

  const handleLookAround = () => {
    if (userType === "host") navigate("/home"); // 추후 수정
    else navigate("/map");
  };

  return (
    <Container>
      <Greeting>
        안녕하세요
        <br />
        {name}님
      </Greeting>

      {/* 나의 팝업 / 나의 매물 */}
      {myItems.length > 0 && (
        <>
          <SectionTitle>
            {userType === "host" ? "나의 매물" : "나의 팝업"}
          </SectionTitle>
          <HorizontalScroll>
            {myItems.map((item, idx) => (
              <PopupCard key={idx}>
                <StatusBadge>{item.status}</StatusBadge>
                <PopupName>{item.popupName}</PopupName>
                <PopupAddress>{item.address}</PopupAddress>
                <DateRow>{formatPeriod(item.startDate, item.endDate)}</DateRow>
              </PopupCard>
            ))}
          </HorizontalScroll>
        </>
      )}

      {/* 최근 인기 매물 */}
      <SectionTitle>최근 인기 매물</SectionTitle>
      <HorizontalScroll>
        {spaces.map((space) => (
          <SpaceCard key={space.spcaeId}>
            <ThumbnailWrapper>
              <Thumbnail src={space.imageUrl[0]} />
              <HeartIcon
                src={space.isWished ? heartEmpty : heartFilled}
                onClick={() => {
                  setSpaces((prev) =>
                    prev.map((s) =>
                      s.spcaeId === space.spcaeId
                        ? { ...s, isWished: !s.isWished }
                        : s
                    )
                  );
                }}
              />
            </ThumbnailWrapper>
            <SpaceInfo>
              <AddressRow>
                <img
                  src={locationIcon}
                  alt="위치"
                  style={{ width: 12, height: 12 }}
                />
                <span>{space.address}</span>
              </AddressRow>
              <RatingPriceRow>
                <StarFlex>
                  <img src={star} alt="별" style={{ width: 16, height: 16 }} />
                  <span>{space.rating.toFixed(1)}</span>
                </StarFlex>
                <Price>{space.rentalFee.toLocaleString()}원</Price>
              </RatingPriceRow>
            </SpaceInfo>
          </SpaceCard>
        ))}
      </HorizontalScroll>

      {/* 내 주변 팝업스토어 */}
      {nearbyPopups.length > 0 && (
        <>
          <SectionTitle>내 주변 팝업스토어</SectionTitle>
          <HorizontalScroll>
            {nearbyPopups.map((popup) => (
              <NearbyPopupCard key={popup.popupId}>
                <PopupPeriod>
                  {formatPeriod(popup.startDate, popup.endDate)}
                </PopupPeriod>
                <PopupLocation>
                  <img
                    src={locationWhiteIcon}
                    alt="위치"
                    style={{ width: 12, height: 12 }}
                  />
                  <span>{popup.address}</span>
                </PopupLocation>
                <PopupNameText>{popup.name}</PopupNameText>
              </NearbyPopupCard>
            ))}
          </HorizontalScroll>
        </>
      )}
    </Container>
  );
};

export default Home;
