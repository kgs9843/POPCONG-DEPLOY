import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import LeftArrowIcon from "../../assets/icons/leftArrowIconBlack.svg";
import EditProfileIcon from "../../assets/icons/editProfileIcon.svg";
const EditProfilePage = () => {
  const { state } = useLocation(); // MyPage에서 넘겨받은 값
  const navigate = useNavigate();

  // 기본값 state에서 가져오기
  const [name, setName] = useState(state?.name || "");
  const [introduction, setIntroduction] = useState(state?.introduction || "");
  const [profileImage, setProfileImage] = useState(state?.profileImage || "");

  // 프로필 이미지 변경
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: 서버로 PATCH 요청 or Zustand 업데이트
    console.log("저장 데이터:", { name, introduction, profileImage });

    navigate(-1); // 저장 후 마이페이지로 이동
  };
  return (
    <Container>
      <div
        style={{
          padding: "75px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          position: "relative",
          height: "calc(100% - 150px)",
        }}
      >
        <Header1>
          <BackButton onClick={() => navigate(-1)}>
            <img src={LeftArrowIcon} alt="back" />
          </BackButton>
          <Title>프로필 편집</Title>
        </Header1>

        <Form onSubmit={handleSubmit}>
          <ImageWrapper>
            <ProfileImage src={profileImage} alt="profile" />
            <div
              style={{
                position: "absolute",
                top: 75,
                right: "calc(50% - 55px)",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              <img src={EditProfileIcon} alt="edit" />
              <ImageInput
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </ImageWrapper>

          <Label>이름</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
          />

          <Label>소개</Label>
          <TextArea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="소개를 입력하세요"
            maxLength={1000}
            style={{ fontFamily: "Pretendard, SUIT, sans-serif" }}
          />
          <CharCount>{introduction.length}/1000</CharCount>

          <NextBox>
            <NextButton type="submit">적용하기</NextButton>
          </NextBox>
        </Form>
      </div>
    </Container>
  );
};

export default EditProfilePage;

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Header1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const BackButton = styled.button`
  position: absolute;
  left: 5px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ImageWrapper = styled.label`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  pointer-events: none;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border: 2px solid var(--default2);
  border-radius: 50%;
  object-fit: cover;
`;

const ImageInput = styled.input`
  display: none;
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin: 30px 0 15px 0;
`;

const Input = styled.input`
  padding: 18px;
  border: 1.5px solid var(--default3);
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  padding: 18px;

  border: 1.5px solid var(--default3);
  border-radius: 6px;
  min-height: 150px;
  overflow-y: auto;
`;

const CharCount = styled.div`
  font-size: 12px;
  color: var(--gray2);
  text-align: right;
  margin: 4px 0 12px;
  position: relative;
  top: -20px;
  left: -5px;
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
  cursor: pointer;
  border-radius: 4px;
`;
