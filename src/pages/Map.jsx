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
import { getPlaces } from "../api/space-controller/spaceGet";

//gps 옵션
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

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
  const [loading, setLoading] = useState(true);

  const [originMarkers, setOriginMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!location) return;
    setCurrentLocation(location);
    fetchPlaces();
  }, [location]);

  const fetchPlaces = async () => {
    try {
      const data = await getPlaces(location?.latitude, location?.longitude); // 필요 시 파라미터 전달
      const rawMarkers = data.data.markers;
      // 변환 로직
      const transformed = rawMarkers.map((item) => ({
        ...item,
        id: item.spaceId,
        price: item.rentalFee,
        distance: item.distance, // 필요하면 (item.distance / 1000).toFixed(1) + "km" 로 변환
        reviews: item.reviewCount,
        rating: item.rating,
        location: item.address,
      }));
      setMarkers(transformed);
      setOriginMarkers(transformed);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const getSortedList = () => {
    switch (activeSort) {
      case "popular": // 인기순
        return [...markers].sort((a, b) => b.rating - a.rating);
      case "distance": // 가까운 거리순
        return [...markers].sort((a, b) => a.distance - b.distance);
      case "review": // 후기 많은 순
        return [...markers].sort((a, b) => b.reviews - a.reviews);
      default:
        return markers;
    }
  };

  const applyFilters = (priceRange, floorRange, ratingRange) => {
    let filtered = [...originMarkers];

    // 가격 필터
    if (priceRange) {
      const [minStr, maxStr] = priceRange.split("~");
      const min = parseInt(minStr.replace(",", "")) || 0;
      const max = maxStr ? parseInt(maxStr.replace(",", "")) : Infinity;
      filtered = filtered.filter(
        (marker) => marker.price >= min && marker.price <= max
      );
    }

    // 층수 필터
    if (floorRange) {
      const floorNum = parseInt(floorRange.replace("층", "").replace("~", ""));
      if (floorRange.startsWith("~")) {
        filtered = filtered.filter((marker) => marker.floor <= floorNum);
      } else {
        filtered = filtered.filter((marker) => marker.floor === floorNum);
      }
    }

    // 평점 필터
    if (ratingRange) {
      const minRating = parseFloat(ratingRange.replace("~", ""));
      filtered = filtered.filter((marker) => marker.rating >= minRating);
    }
    setActiveDropdown(null);
    setMarkers(filtered);
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
                      applyFilters(price, selectedFloor, selectedRating);
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
                      applyFilters(selectedPrice, floor, selectedRating);
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
                      applyFilters(selectedPrice, selectedFloor, rating);
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
          markers={markers}
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
                <Thumbnail>
                  <img
                    src={item.coverImageUrl || "/default-image.png"}
                    alt={item.spaceName || "공간 이미지"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Thumbnail>
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
          <div style={{ height: 80 }} />
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
