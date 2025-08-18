import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeftArrowIcon from "../../assets/icons/leftArrowIconBlack.svg";
import CameraIcon from "../../assets/icons/cameraIcon.svg";
import styled from "styled-components";

const PostingCreatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editingData = location.state; // 수정모드면 데이터 있음
  const isEdit = !!editingData;
  const maxImages = 15;

  // 기본 state
  const [form, setForm] = useState({
    price: "",
    subText: "",
    location: "",
    subLocation: "",
    maxDays: "",
    images: [],
    buildingUsage: "", // 건축물용도
    floor: "", // 해당층
    area: "", // 전용면적 (㎡)
  });

  // 수정 모드일 때 초기화
  useEffect(() => {
    if (editingData) {
      setForm(editingData);
    }
  }, [editingData]);

  // input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 파일 업로드
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...urls].slice(0, maxImages),
    }));
  };

  // 이미지 삭제
  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // 주소 찾기 (카카오 주소 API 예시)
  const handleFindAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setForm((prev) => ({
          ...prev,
          location: data.address,
        }));
      },
    }).open();
  };

  const handleSubmit = () => {
    if (isEdit) {
      navigate("/main");
    } else {
      console.log("새 매물 등록:", form);
      navigate("/main");
    }
  };

  return (
    <Container>
      <Header>
        <img
          src={LeftArrowIcon}
          alt=""
          style={{ position: "absolute", left: 20 }}
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title>{isEdit ? "매물 수정하기" : "매물 등록하기"}</Title>
      </Header>
      <div style={{ overflowY: "auto", height: "100%", width: "100%" }}>
        <Content>
          {/* 이미지 업로드 */}
          <ImageContainer>
            {/* 카메라 박스 */}
            <CameraBox htmlFor="fileUpload">
              <img src={CameraIcon} alt="camera" />
              <CountText>
                {form.images.length}/{maxImages}
              </CountText>
            </CameraBox>
            <input
              type="file"
              id="fileUpload"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* 업로드된 이미지*/}
            {form.images
              .slice()
              .reverse()
              .map((img, i) => (
                <ImageBox key={i}>
                  <img src={img} alt={`upload-${i}`} />
                  <RemoveBtn
                    onClick={
                      () => handleRemoveImage(form.images.length - 1 - i) // index 다시 맞추기
                    }
                  >
                    ×
                  </RemoveBtn>
                </ImageBox>
              ))}
          </ImageContainer>

          <div
            style={{
              justifyContent: "center",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 가격 */}
            <Label>가격</Label>
            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="₩ 가격을 입력해주세요"
            />

            {/* 설명 */}
            <Label>설명</Label>
            <Input
              type="text"
              name="subText"
              value={form.subText}
              onChange={handleChange}
              placeholder="매물의 설명을 간단히 적어주세요"
            />

            {/* 임대 가능 최대일수 */}
            <Label>상세정보</Label>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <DetailRow>
                <DetailLabel>건축물용도</DetailLabel>
                <Value>
                  <Input
                    type="text"
                    name="buildingUsage"
                    value={form.buildingUsage}
                    onChange={handleChange}
                    placeholder="건축물용도를 입력해주세요"
                    style={{
                      padding: "10px 0px",
                      textAlign: "center",
                      border: "none", // 전체 테두리 제거
                      borderBottom: "1px solid #ccc", // 아래만 테두리
                      outline: "none",
                      borderRadius: 0, // 둥근 테두리 제거
                      appearance: "none", // (모바일 브라우저 기본 스타일 제거)
                      WebkitAppearance: "none", // iOS Safari 전용
                      MozAppearance: "textfield", // Firefox 전용 (숫자 input 화살표 제거)
                    }}
                  />
                </Value>
              </DetailRow>
              <DetailRow>
                <DetailLabel>해당층</DetailLabel>
                <Value>
                  <Input
                    type="number"
                    name="floor"
                    value={form.floor}
                    onChange={handleChange}
                    placeholder="층"
                    style={{
                      width: 40,
                      padding: "10px 0px",
                      textAlign: "center",
                      border: "none", // 전체 테두리 제거
                      borderBottom: "1px solid #ccc", // 아래만 테두리
                      outline: "none",
                      borderRadius: 0, // 둥근 테두리 제거
                      appearance: "none", // (모바일 브라우저 기본 스타일 제거)
                      WebkitAppearance: "none", // iOS Safari 전용
                      MozAppearance: "textfield", // Firefox 전용 (숫자 input 화살표 제거)
                    }}
                  />
                  <DetailSubLabel>층</DetailSubLabel>
                </Value>
              </DetailRow>
              <DetailRow>
                <DetailLabel>전용면적</DetailLabel>
                <Value>
                  <Input
                    type="number"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="㎡"
                    style={{
                      width: 80,
                      padding: "10px 0px",
                      textAlign: "center",
                      border: "none", // 전체 테두리 제거
                      borderBottom: "1px solid #ccc", // 아래만 테두리
                      outline: "none",
                      borderRadius: 0, // 둥근 테두리 제거
                      appearance: "none", // (모바일 브라우저 기본 스타일 제거)
                      WebkitAppearance: "none", // iOS Safari 전용
                      MozAppearance: "textfield", // Firefox 전용 (숫자 input 화살표 제거)
                    }}
                  />
                  <DetailSubLabel>
                    m{" "}
                    <span
                      style={{ fontSize: 8, position: "relative", top: -6 }}
                    >
                      2
                    </span>
                  </DetailSubLabel>
                </Value>
              </DetailRow>
              <DetailRow>
                <DetailLabel>임대가능 최대일수</DetailLabel>
                <Value>
                  <Input
                    type="number"
                    name="maxDays"
                    value={form.maxDays}
                    onChange={handleChange}
                    placeholder="일"
                    style={{
                      width: 40,
                      padding: "10px 0px",
                      textAlign: "center",
                      border: "none", // 전체 테두리 제거
                      borderBottom: "1px solid #ccc", // 아래만 테두리
                      outline: "none",
                      borderRadius: 0, // 둥근 테두리 제거
                      appearance: "none", // (모바일 브라우저 기본 스타일 제거)
                      WebkitAppearance: "none", // iOS Safari 전용
                      MozAppearance: "textfield", // Firefox 전용 (숫자 input 화살표 제거)
                    }}
                  />
                  <DetailSubLabel>일</DetailSubLabel>
                </Value>
              </DetailRow>
            </div>
          </div>
        </Content>

        <Divider />
        <Content>
          {/* 주소 */}
          <Label>주소</Label>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <Input2
              style={{ flex: 1 }}
              value={form.location}
              readOnly
              placeholder="주소를 입력해주세요"
            />
            <AddressBtn onClick={handleFindAddress}>주소 찾기</AddressBtn>
          </div>

          {/* 상세 주소 */}
          <Input2
            name="subLocation"
            style={{ marginTop: 20, width: "100%" }}
            placeholder="상세주소"
            value={form.subLocation}
            onChange={handleChange}
          />
        </Content>
        <div style={{ height: 100 }} />
      </div>
      <NextBox>
        <NextButton onClick={handleSubmit}>
          {isEdit ? "수정하기" : "등록하기"}
        </NextButton>
      </NextBox>
    </Container>
  );
};

export default PostingCreatePage;

/* 스타일 */
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  overflow-x: auto;
  padding: 5px 0;
`;

const CameraBox = styled.label`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: var(--default4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--default1);
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
`;

const CountText = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: var(--default1);
`;

const ImageBox = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 14px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 10px;
  background: var(--gray1);
`;

const Label = styled.div`
  margin-top: 30px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0px;
  border: none;
  border-bottom: 1px solid var(--gray1);
  outline: none;
  border-radius: 0;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
`;

const Input2 = styled.input`
  width: 100%;
  padding: 10px 0px;
  border: 1px solid var(--gray1);
  background-color: white;
  outline: none;
  border-radius: 0;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  border-radius: 8px;
`;

const AddressBtn = styled.button`
  cursor: pointer;

  justify-content: center;
  display: flex;
  align-items: center;
  width: 80px;

  background-color: white;
  border: 1px solid var(--gray1);
  border-radius: 8px;
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
  background: var(--default1);
  color: white;
  border: none;
  border-radius: 6px;
  height: 50px;
  font-size: medium;
  font-weight: 500;
  border-radius: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 15px 0;
  border-bottom: 1px solid var(--gray1);
`;

const DetailLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  min-width: 40%;
`;

const DetailSubLabel = styled.div`
  font-size: 14px;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  flex: 1;
  text-align: start;
`;
