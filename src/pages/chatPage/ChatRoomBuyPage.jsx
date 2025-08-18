import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import LeftArrowIcon from "../../assets/icons/leftArrowIconBlack.svg";
import GrayIcon from "../../assets/icons/grayMarker.svg";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일
import { ko } from "date-fns/locale";
import RightArrowBlueIcon from "../../assets/icons/rightArrowBlueIcon.svg";
import KakaoPayIcon from "../../assets/icons/kakaoPayIcon.svg";

const ChatRoomBuyPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const place = location.state?.place;
  // step 상태 추가
  const [step, setStep] = useState(1);
  //결재수단
  const [selected, setSelected] = useState("kakao");
  const maxDays = place?.maxDays || 7; // 없으면 기본 7일
  // 달력 선택 상태
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    const start = item.selection.startDate;
    const end = item.selection.endDate;

    // place에서 꺼낸 maxDays 제한
    const diffTime = end.getTime() - start.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays > maxDays) {
      const newEnd = new Date(start);
      newEnd.setDate(start.getDate() + maxDays);

      setRange([{ ...item.selection, endDate: newEnd }]);
    } else {
      setRange([item.selection]);
    }
  };

  // 📌 임대일수 계산
  const rentalDays =
    Math.ceil(
      (range[0].endDate.getTime() - range[0].startDate.getTime()) /
        (1000 * 3600 * 24)
    ) || 1; // 시작일 포함 → 최소 1일

  return (
    <Container>
      <div
        style={{
          padding: "75px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          gap: 10,
          position: "relative",
          height: "calc(100% - 150px)",
        }}
      >
        {/* 상단 상품/장소 정보 */}
        <Header1>
          {step === 1 ? (
            <BackButton onClick={() => navigate(-1)}>
              <img src={LeftArrowIcon} alt="back" />
            </BackButton>
          ) : (
            <BackButton onClick={() => setStep(1)}>
              <img src={LeftArrowIcon} alt="back" />
            </BackButton>
          )}
          <Title>결제하기</Title>
        </Header1>
        <Header2>
          <Info>
            <Top>
              <img
                src={place.image}
                alt="item"
                style={{ width: 45, height: 45, backgroundColor: "#CCC" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  height: "auto",
                  flex: 1,
                  gap: 5,
                }}
              >
                <SubText>
                  <img
                    src={GrayIcon}
                    alt="marker"
                    style={{ width: "auto", height: "auto" }}
                  />
                  {place.location}
                </SubText>
                <Price>{place.price.toLocaleString()}원</Price>
              </div>
            </Top>
          </Info>
        </Header2>
        {/* 📅 Step 1: 달력 / Step 2: 결제 요약 */}
        {step === 1 ? (
          <CalendarWrapper>
            <DateRange
              locale={ko}
              ranges={range}
              onChange={handleChange}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 90))}
              rangeColors={["var(--default2)"]}
            />
          </CalendarWrapper>
        ) : (
          <SummaryWrapper>
            {/* 임대 일정 */}
            <Section>
              <SectionTitle>임대 일정</SectionTitle>
              <Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <RowSpan>임대 시작일</RowSpan>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {range[0].startDate.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      weekday: "short",
                    })}
                  </div>
                </div>

                <img
                  src={RightArrowBlueIcon}
                  alt="right Arrow"
                  style={{ width: 15 }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <RowSpan>임대 종료일</RowSpan>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {range[0].endDate.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      weekday: "short",
                    })}
                  </div>
                </div>
                <ChangeBtn onClick={() => setStep(1)}>변경하기</ChangeBtn>
              </Row>
            </Section>

            {/* 결제 금액 */}
            <Section>
              <SectionTitle>결제 금액</SectionTitle>
              <Row>
                <span style={{ fontSize: 14 }}>1일 임대료</span>
                <span style={{ fontSize: 14 }}>
                  {place.price.toLocaleString()}원
                </span>
              </Row>
              <Row>
                <span style={{ fontSize: 14 }}>임대 일수</span>
                <span style={{ fontSize: 14 }}>{rentalDays}일</span>
              </Row>
              <Row bold>
                <span style={{ fontSize: 14 }}>총 결제 금액</span>
                <span style={{ fontSize: 14 }}>
                  {(place.price * rentalDays).toLocaleString()}원
                </span>
              </Row>
            </Section>

            {/* 결제 수단 */}
            <Section>
              <SectionTitle>결제수단</SectionTitle>

              <RadioGroup>
                <RadioLabel>
                  <HiddenRadio
                    type="radio"
                    name="payment"
                    value="kakao"
                    checked={selected === "kakao"}
                    onChange={() => setSelected("kakao")}
                  />
                  <CustomRadio checked={selected === "kakao"} />
                  <img src={KakaoPayIcon} alt="kakaopayIcon" />
                  <span style={{ fontSize: 14 }}>카카오페이</span>
                </RadioLabel>

                <RadioLabel style={{ opacity: 0.7 }}>
                  <HiddenRadio
                    type="radio"
                    name="payment"
                    value="other"
                    checked={selected === "other"}
                    onChange={() => setSelected("other")}
                  />
                  <CustomRadio checked={selected === "other"} />
                  <span style={{ fontSize: 14 }}>기타 결제수단</span>
                </RadioLabel>
              </RadioGroup>
            </Section>
          </SummaryWrapper>
        )}

        <NextBox>
          <NextButton
            disabled={rentalDays > maxDays} // ✅ maxDays보다 크면 비활성화
            onClick={() => {
              if (rentalDays <= maxDays) {
                setStep((prev) => prev + 1);
              }
              if (step === 2) {
                navigate("/chat/room/final");
              }
            }}
          >
            다음
          </NextButton>
        </NextBox>
      </div>
    </Container>
  );
};
export default ChatRoomBuyPage;

// styled-components
const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Header1 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
`;
const Header2 = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--gray1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Info = styled.div`
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const SubText = styled.div`
  display: flex;
  gap: 2px;
  font-size: 13px;
  color: var(--gray2);
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
  background: ${({ disabled }) =>
    disabled ? "var(--gray2)" : "var(--default1)"};
  color: white;
  border: none;
  border-radius: 6px;
  height: 50px;
  font-size: medium;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 4px;
  transition: background 0.3s ease;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const CalendarWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  .rdrCalendarWrapper {
    width: "auto";
    min-height: 400px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  padding: 15px;
  border: 1px solid var(--default3);
  border-radius: 10px;
`;
const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;
const RowSpan = styled.span`
  font-size: 10px;
  color: var(--gray2);
  margin-bottom: 10px;
  text-align: center;
`;

const ChangeBtn = styled.button`
  background: none;
  border: none;
  padding: 5px;
  border-radius: 20px;
  background-color: var(--default4);
  color: var(--default1);
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
`;

const RadioGroup = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HiddenRadio = styled.input`
  display: none;
`;

const CustomRadio = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ checked }) =>
    checked ? "var(--default1)" : "var(--default3)"}; // 파랑 vs 연파랑
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &::after {
    content: "";
    width: 3px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
