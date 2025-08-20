import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SplashLogo from "../assets/splashLogo.svg";

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  min-width: 300px;
  max-width: 500px;
  height: 100%;
  background: var(--default2);
  );
  gap: 22px;
`;

const LogoText = styled.p`
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  font-family: "Inter", sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 자동 이동
    const timer = setTimeout(() => {
      navigate("/onboarding"); // 온보딩 페이지로 이동
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashContainer>
      <img src={SplashLogo} alt="로고" />
    </SplashContainer>
  );
};

export default Splash;
