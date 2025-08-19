import React, { useState, useEffect } from "react";
import { useGeoLocation } from "../hooks/useGeoLocation";
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";
import DownArrowIcon from "../assets/icons/downArrowIcon.svg";
import Star from "../assets/icons/star.svg";
import DragModal from "../components/DragModal";
import GrayMarker from "../assets/icons/grayMarker.svg";
import ItemModal from "../components/ItemModal";
import Test from "../components/Test";
//gps 옵션
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
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

const Map = () => {
  const { location } = useGeoLocation(geolocationOptions);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [activeSort, setActiveSort] = useState("popular");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [initialHeight, setInitialHeight] = useState(140);

  useEffect(() => {
    if (!location) return;
    setCurrentLocation(location);
  }, [location]);

  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const getSortedList = () => {
    switch (activeSort) {
      case "popular": // 인기순
        return [...dummyData].sort((a, b) => b.rating - a.rating);
      case "distance": // 가까운 거리순
        return [...dummyData].sort((a, b) => a.distance - b.distance);
      case "review": // 후기 많은 순
        return [...dummyData].sort((a, b) => b.reviews - a.reviews);
      default:
        return dummyData;
    }
  };

  const sortedList = getSortedList();

  return (
    <div style={{ height: "100vh", width: "100%", display: "flex" }}>
      {/* 드롭다운 영역 */}
      <DropdownContainer>
        {/* 금액 */}
        <DropdownWrapper>
          <SpanContainer>
            <Span onClick={() => toggleDropdown("price")}>
              {selectedPrice || "금액"}
              <Arrow
                src={DownArrowIcon}
                alt={"DownArrowIcon"}
                rotate={activeDropdown === "price" ? 180 : 0}
              />
            </Span>
            {activeDropdown === "price" && (
              <Popup>
                {[
                  "~50,000",
                  "50,000~100,000",
                  "100,000~200,000",
                  "200,000~",
                ].map((price) => (
                  <PopupItem
                    key={price}
                    onClick={() => {
                      setSelectedPrice(price);
                      setActiveDropdown(null);
                    }}
                  >
                    {price}
                  </PopupItem>
                ))}
              </Popup>
            )}
          </SpanContainer>
        </DropdownWrapper>

        {/* 층수 */}
        <DropdownWrapper>
          <SpanContainer>
            <Span onClick={() => toggleDropdown("floor")}>
              {selectedFloor || "층수"}
              <Arrow
                src={DownArrowIcon}
                alt={"DownArrowIcon"}
                rotate={activeDropdown === "floor" ? 180 : 0}
              />
            </Span>

            {activeDropdown === "floor" && (
              <Popup>
                {["1층", "~2층", "~3층"].map((floor) => (
                  <PopupItem
                    key={floor}
                    onClick={() => {
                      setSelectedFloor(floor);
                      setActiveDropdown(null);
                    }}
                  >
                    {floor}
                  </PopupItem>
                ))}
              </Popup>
            )}
          </SpanContainer>
        </DropdownWrapper>

        {/* 평점 */}
        <DropdownWrapper>
          <SpanContainer>
            <Span onClick={() => toggleDropdown("rating")}>
              {selectedRating || "평점"}
              <Arrow
                src={DownArrowIcon}
                alt={"DownArrowIcon"}
                rotate={activeDropdown === "rating" ? 180 : 0}
              />
            </Span>
            {activeDropdown === "rating" && (
              <Popup>
                {["4.5~", "4.0~", "3.5~"].map((rating) => (
                  <PopupItem
                    key={rating}
                    onClick={() => {
                      setSelectedRating(rating);
                      setActiveDropdown(null);
                    }}
                  >
                    <img src={Star} alt="Star" />
                    {rating}
                  </PopupItem>
                ))}
              </Popup>
            )}
          </SpanContainer>
        </DropdownWrapper>
      </DropdownContainer>

      {/* 지도 */}
      <div style={{ flex: 1 }}>
        <KakaoMap
          lat={currentLocation ? currentLocation.latitude : undefined}
          lng={currentLocation ? currentLocation.longitude : undefined}
        />
      </div>
      <DragModalContainer>
        <DragModal
          minHeight={140}
          maxHeight={650}
          height={initialHeight}
          setHeight={setInitialHeight}
          backgroundColor="white"
        >
          <div
            style={{
              width: "100%",
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              borderBottom: "1px solid var(--gray1)",
            }}
          >
            <Span2
              active={activeSort === "popular"}
              onClick={() => {
                setActiveSort("popular");
                setInitialHeight(650);
              }}
            >
              인기순
            </Span2>
            <Span2
              active={activeSort === "distance"}
              onClick={() => {
                setActiveSort("distance");
                setInitialHeight(650);
              }}
            >
              가까운 거리순
            </Span2>
            <Span2
              active={activeSort === "review"}
              onClick={() => {
                setActiveSort("review");
                setInitialHeight(650);
              }}
            >
              후기 많은 순
            </Span2>
          </div>
          {/* 리스트 */}
          <ListContainer>
            {sortedList.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setInitialHeight(140);
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
                    <SubInfo>{item.distance}m</SubInfo>
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
          </ListContainer>
        </DragModal>
      </DragModalContainer>

      <ItemModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
    </div>
  );
};

const DragModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
const DropdownContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 5px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SpanContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  position: relative;
`;
const Span = styled.span`
  position: relative;
  background-color: var(--default1);
  width: auto;
  padding: 0 10px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  border-radius: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
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

const Arrow = styled.img`
  margin-left: 4px;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => props.rotate}deg);
`;

const Popup = styled.div`
  margin-top: 5px;
  top: 30px;
  left: 0;
  min-width: 100%;
  max-width: auto;
  position: absolute;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const PopupItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  width: auto;
  color: var(--gray2);
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
  justify-content: row;
  display: flex;
  gap: 5px;
  border-bottom: 1px solid var(--gray1);
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  justify-content: center;
`;

const ListContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
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

export default Map;
