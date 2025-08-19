import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import NotificationIcon from "../assets/icons/notificationIcon.svg";
import NotificationActiveIcon from "../assets/icons/activeIcons/notificationIcon.svg";
import PlaceIcon from "../assets/icons/placeIcon.svg";
import DownArrowIcon from "../assets/icons/downArrowIcon.svg";
import DownArrowBlueIcon from "../assets/icons/downArrowBlueIcon.svg";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { getDongFromCoords } from "../utils/getDongFromCoords";
import { getCoordsFromDong } from "../utils/getCoordsFromDong";
import { notificationAlert } from "../stores/alert";
import topNavLocationStore from "../stores/topNavLocationStore";
import regions from "../data/regions";
//gps 옵션
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const TopNav = () => {
  const locationURL = useLocation();
  const { setLocation } = topNavLocationStore();
  const { notice, setNotice } = notificationAlert();
  const hasNewNotification = notice;
  const { location, error } = useGeoLocation(geolocationOptions);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState("울산");
  const [selectedDong, setSelectedDong] = useState("반구1동");
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedDistricts, setExpandedDistricts] = useState({});
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleDongClick = async (districtName, dong) => {
    let fullRegion = selectedRegion + " " + districtName + " " + dong;
    const result = await getCoordsFromDong(fullRegion.toString());
    console.log(result.latitude);
    setSelectedDong(dong);
    setShowDropdown(false);
  };

  const hideNavPaths = ["/chat", "/mypage"];
  const shouldHideNav = hideNavPaths.some((path) =>
    locationURL?.pathname.startsWith(path)
  );

  let navTitle = "";
  if (locationURL?.pathname.startsWith("/chat")) {
    navTitle = "채팅";
  } else if (locationURL?.pathname.startsWith("/mypage")) {
    navTitle = "마이페이지";
  }

  const toggleDistrict = (region, district) => {
    setExpandedDistricts((prev) => ({
      ...prev,
      [region]: {
        ...prev[region],
        [district]: !prev?.[region]?.[district],
      },
    }));
  };
  const toggleSidebar = () => {
    setIsActive((prev) => !prev);
  };
  useEffect(() => {
    if (!location) return;

    const fetchDong = async () => {
      try {
        const dong = await getDongFromCoords(
          location.latitude,
          location.longitude
        );
        setSelectedDong(dong);
        setLocation(location.latitude, location.longitude, dong);
      } catch (error) {
        console.error("Error fetching dong:", error);
      }
    };

    fetchDong();
  }, [location]);

  return (
    <>
      <Nav>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          {shouldHideNav ? (
            <span style={{ fontWeight: 500, fontSize: "18px", color: "white" }}>
              {navTitle}
            </span>
          ) : (
            <>
              <img src={PlaceIcon} alt={"PlaceIcon"} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
                onClick={toggleDropdown}
              >
                <span
                  style={{ fontWeight: 500, fontSize: "18px", color: "white" }}
                >
                  {selectedDong}
                </span>
                <Arrow
                  src={DownArrowIcon}
                  alt={"DownArrowIcon"}
                  rotate={showDropdown ? 180 : 0}
                />
              </div>
              {showDropdown && (
                <Dropdown ref={dropdownRef}>
                  <Row>
                    {/* 왼쪽: Region 목록 */}
                    <RegionColumn>
                      {Object.keys(regions).map((region) => (
                        <RegionName
                          key={region}
                          active={region === selectedRegion}
                          onClick={() => setSelectedRegion(region)}
                        >
                          {region}
                        </RegionName>
                      ))}
                    </RegionColumn>

                    {/* 오른쪽: 선택된 Region의 District + Dong */}
                    <DistrictColumn>
                      {Object.entries(regions[selectedRegion]).map(
                        ([districtName, dongs]) => (
                          <React.Fragment key={districtName}>
                            <DistrictRow
                              onClick={() =>
                                toggleDistrict(selectedRegion, districtName)
                              }
                            >
                              {districtName}
                              <Arrow2
                                src={DownArrowBlueIcon}
                                alt={"DownArrowBlueIcon"}
                                rotate={
                                  expandedDistricts[selectedRegion]?.[
                                    districtName
                                  ]
                                    ? 180
                                    : 0
                                }
                              />
                            </DistrictRow>
                            {expandedDistricts[selectedRegion]?.[
                              districtName
                            ] &&
                              dongs.map((dong) => (
                                <DongName
                                  key={dong}
                                  onClick={() =>
                                    handleDongClick(districtName, dong)
                                  }
                                >
                                  {dong}
                                </DongName>
                              ))}
                          </React.Fragment>
                        )
                      )}
                    </DistrictColumn>
                  </Row>
                </Dropdown>
              )}
            </>
          )}
        </div>
        <NavItem onClick={() => toggleSidebar()}>
          {isActive ? (
            <img src={NotificationActiveIcon} alt={"NotificationActiveIcon"} />
          ) : (
            <img src={NotificationIcon} alt={"NotificationIcon"} />
          )}
          {hasNewNotification && <RedDot />}
        </NavItem>
      </Nav>
      {isActive && (
        <>
          <Overlay onClick={toggleSidebar} />
          <Sidebar>
            <SidebarContent>
              <p>아직 알림이 없어요</p>
            </SidebarContent>
          </Sidebar>
        </>
      )}
    </>
  );
};

const Nav = styled.nav`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 50%;
  right: 0;
  height: 60px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  transform: translateX(-50%);
  background-color: var(--default2);
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
  z-index: 1000;
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const RedDot = styled.div`
  position: absolute;
  top: 3px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--red);
`;

const Arrow = styled.img`
  transition: transform 0.2s ease;
  transform: rotate(${(props) => props.rotate}deg);
`;
const Arrow2 = styled.img`
  position: absolute;
  right: 12px;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => props.rotate}deg);
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 170px;
  min-height: 50px;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border-bottom-right-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const RegionColumn = styled.div`
  width: 40%;
  background-color: white;
  border-right: 1px solid #e0e0e0;
`;

const DistrictColumn = styled.div`
  width: 60%;
  background-color: white;
`;

const RegionName = styled.div`
  text-align: center;
  padding: 10px 12px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background-color: white;
  color: ${(props) => (props.active ? "var(--default1)" : "var(--gray2)")};
`;

const DistrictRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px 0px;
  font-size: 14px;
  color: var(--default1);
  cursor: pointer;
`;

const DongName = styled.div`
  padding: 6px 0px;
  font-size: 13px;
  text-align: center;
  background-color: var(--default4);
  color: var(--gray2);
  cursor: pointer;
`;
const Overlay = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 50%;
  right: 0;
  height: 100vh;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.1);
  z-index: 799;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1); /* 왼쪽에 그림자 */
  z-index: 800;
  display: flex;
  flex-direction: column;
  animation: slideInFromRight 0.3s ease forwards;

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
`;

const SidebarContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 10%;
  overflow-y: auto;
  color: var(--gray2);
`;
export default TopNav;
