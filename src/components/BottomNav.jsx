import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../assets/icons/homeIcon.svg";
import HomeActiveIcon from "../assets/icons/activeIcons/homeIcon.svg";
import MapIcon from "../assets/icons/mapIcon.svg";
import MapActiveIcon from "../assets/icons/activeIcons/mapIcon.svg";
import ChatIcon from "../assets/icons/chatIcon.svg";
import ChatActiveIcon from "../assets/icons/activeIcons/chatIcon.svg";
import MyIcon from "../assets/icons/myIcon.svg";
import MyActiveIcon from "../assets/icons/activeIcons/myIcon.svg";
import { chatAlert } from "../stores/alert";

const navItems = [
  { label: "홈", icon: HomeIcon, activeIcon: HomeActiveIcon, path: "/home" },
  { label: "지도", icon: MapIcon, activeIcon: MapActiveIcon, path: "/map" },
  { label: "채팅", icon: ChatIcon, activeIcon: ChatActiveIcon, path: "/chat" },
  { label: "MY", icon: MyIcon, activeIcon: MyActiveIcon, path: "/mypage" },
];

const BottomNav = () => {
  const { notice, setNotice } = chatAlert();
  const hasNewChat = notice;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Nav>
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);

        return (
          <NavItem key={item.path} onClick={() => navigate(item.path)}>
            {isActive ? (
              <img src={item.activeIcon} alt={item.label} />
            ) : (
              <img src={item.icon} alt={item.label} />
            )}
            {item.label === "채팅" && hasNewChat && <RedDot />}
            <span
              style={{
                fontSize: 12,
                marginTop: 4,
                color: isActive
                  ? "var(--sub-dark-blue-color)"
                  : "var(--main-dark-gray-color)",
              }}
            >
              {item.label}
            </span>
          </NavItem>
        );
      })}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  right: 0;
  height: 60px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  transform: translateX(-50%);
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid var(--gray1);
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

export default BottomNav;
