import styled from "styled-components";

import onBoardingSlide1 from "../assets/onBoardingSlide1.svg";
import onBoardingSlide2 from "../assets/onBoardingSlide2.svg";
import onBoardingSlide3 from "../assets/onBoardingSlide3.svg";
import kakaoLoginIcon from "../assets/icons/kakaoLoginIcon.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const OnboardingContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  min-width: 300px;
  max-width: 500px;
  height: 100vh;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
`;

const SwiperWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideImage = styled.img`
  max-width: 80%;
  max-height: 70%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
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

const OnBoarding = () => {
  // 백엔드에서 제공한 카카오 로그인 URL로 사용자를 리다이렉트
  const handleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_BASE_URL
    }/oauth2/authorization/kakao`;
  };

  return (
    <OnboardingContainer>
      <SwiperWrapper>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2000, // 2초마다 전환
            disableOnInteraction: false, // 유저가 건드려도 계속 자동재생
          }}
          loop={true} // 무한 반복
        >
          <SwiperSlide>
            <SlideImage src={onBoardingSlide1} alt="슬라이드 1" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImage src={onBoardingSlide2} alt="슬라이드 2" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImage src={onBoardingSlide3} alt="슬라이드 3" />
          </SwiperSlide>
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

export default OnBoarding;
