import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import kakaoLoginIcon from "../assets/icons/kakaoLoginIcon.svg";

const OnboardingContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  min-width: 300px;
  max-width: 500px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const SwiperWrapper = styled.div`
  flex: 4; /* 상단 비율 */
`;

const BottomWrapper = styled.div`
  flex: 1; /* 하단 비율 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 백엔드에서 제공한 URL로 사용자 리다이렉트
    window.location.href = `${BACKEND_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <OnboardingContainer>
      <SwiperWrapper>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 5000, // 5초마다 전환
            disableOnInteraction: false, // 유저가 건드려도 계속 자동재생
          }}
          loop={true} // 무한 반복
        >
          <SwiperSlide>슬라이드 1</SwiperSlide>
          <SwiperSlide>슬라이드 2</SwiperSlide>
          <SwiperSlide>슬라이드 3</SwiperSlide>
        </Swiper>
      </SwiperWrapper>

      <BottomWrapper>
        <LoginButton onClick={handleLogin}>
          <img src={kakaoLoginIcon} alt="카카오 로그인" />
        </LoginButton>
      </BottomWrapper>
    </OnboardingContainer>
  );
};

export default OnboardingPage;
