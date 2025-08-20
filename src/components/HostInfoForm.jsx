import styled from "styled-components";
import { useState } from "react";
import useSignupStore from "../stores/useSignupStore";
import useAuthStore from "../stores/useAuthStore";
import axios from "axios";

// 아이콘
import backIcon from "../assets/icons/backIcon.svg";
import profileIcon from "../assets/icons/profileIcon.svg";
import editProfileIcon from "../assets/icons/editProfileIcon.svg";
import completeIcon from "../assets/icons/completeIcon.svg";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 16px 0;
`;

const BackButton = styled.img`
  position: absolute;
  left: 16px;
  cursor: pointer;
`;

const Title = styled.h2`
  color: var(--black);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.4px;
`;

const ProfileWrapper = styled.div`
  position: relative;
  margin: 70px auto 20px;
`;

const Profile = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--default2);
  cursor: pointer;
`;

const EditProfileButton = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  bottom: 0;
  right: 0;
  cursor: pointer;
  border-radius: 50%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Form = styled.form`
  display: flex;
  width: 90%;
  max-width: 400px;
  flex-direction: column;
  gap: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
`;

const Label = styled.label`
  color: var(--black);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.35px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RequiredMark = styled.span`
  color: var(--red);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.35px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  padding-right: 40px;
  box-sizing: border-box;
  color: var(--black);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
  border-radius: 8px;
  border: 1.5px solid
    ${(props) => (props.$isComplete ? "var(--default1)" : "var(--default3)")};
  outline: none;
`;

const CompleteIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
  display: ${(props) => (props.$isComplete ? "block" : "none")};
`;

const FileUploadWrapper = styled.div`
  position: relative;
`;

const FileUploadBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1.5px solid var(--default3);
  cursor: pointer;
  gap: 10px;
  color: var(--black);
  font-size: 12px;
`;

const FileName = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--default1);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

const NextButton = styled.button`
  all: unset;
  display: flex;
  height: 42px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--default1);
  background: var(--default1);
  cursor: pointer;

  color: var(--white);
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.35px;

  position: fixed;
  bottom: 20px;
  left: 17px;
  right: 17px;

  &:disabled {
    color: var(--white) !important;
  }
`;

const HostInfoForm = () => {
  const { setNextStep, setBackStep, name, setName } = useSignupStore();
  const { token } = useAuthStore(); // Bearer Token 가져오기

  // 상태 정의
  const [profile, setProfile] = useState(profileIcon);
  const [introduce, setIntroduce] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [buildingFile, setBuildingFile] = useState(null);
  const [leaseFile, setLeaseFile] = useState(null);
  const [bankFile, setBankFile] = useState(null);

  // 모든 필수 입력 체크
  const isValid =
    name.trim() !== "" &&
    idFile !== null &&
    buildingFile !== null &&
    leaseFile !== null;

  // 프로필 이미지 선택
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile(reader.result);
    reader.readAsDataURL(file);
  };

  // 일반 파일 선택
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("introduction", introduce);

    if (profile && profile !== profileIcon) {
      const profileBlob = dataURLtoFile(profile, "profile.png");
      formData.append("profileImagUrl", profileBlob);
    }

    if (idFile) formData.append("idFile", idFile);
    if (buildingFile) formData.append("buildingFile", buildingFile);
    if (leaseFile) formData.append("leaseFile", leaseFile);
    if (bankFile) formData.append("bankFile", bankFile);

    try {
      await axios.patch(
        "http://44.251.104.213:8080/api/v1/user/my/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNextStep(3); // SignupSuccess 화면으로 이동
    } catch (err) {
      console.error(err);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  // Base64 -> File 변환
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Container>
      <PageHeader>
        <BackButton src={backIcon} alt="뒤로가기" onClick={setBackStep} />
        <Title>개인정보 입력</Title>
      </PageHeader>

      <ProfileWrapper>
        <Profile
          src={profile}
          alt="프로필 사진"
          onClick={() => document.getElementById("profileInput").click()}
        />
        <EditProfileButton
          src={editProfileIcon}
          alt="프로필 수정"
          onClick={() => document.getElementById("profileInput").click()}
        />
        <HiddenInput
          id="profileInput"
          type="file"
          accept="image/*"
          onChange={handleProfileChange}
        />
      </ProfileWrapper>

      <Form onSubmit={handleNext}>
        {/* 이름 */}
        <InputGroup>
          <Label htmlFor="name">
            이름<RequiredMark>*</RequiredMark>
          </Label>
          <InputWrapper>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력해 주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              $isComplete={name.trim() !== ""}
            />
            <CompleteIcon
              src={completeIcon}
              alt="완료"
              $isComplete={name.trim() !== ""}
            />
          </InputWrapper>
        </InputGroup>

        {/* 소개 */}
        <InputGroup>
          <Label htmlFor="introduce">소개</Label>
          <Input
            id="introduce"
            type="text"
            placeholder="소개 문구를 입력해 주세요"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </InputGroup>

        {["신분증 사본", "건축물대장", "임대차 계약서", "통장 사본"].map(
          (label, index) => {
            const fileState = [idFile, buildingFile, leaseFile, bankFile][
              index
            ];
            const setFileState = [
              setIdFile,
              setBuildingFile,
              setLeaseFile,
              setBankFile,
            ][index];
            const inputId = [
              "idFileInput",
              "buildingFileInput",
              "leaseFileInput",
              "bankFileInput",
            ][index];
            return (
              <InputGroup key={index}>
                <Label>
                  {label}
                  {index < 3 && <RequiredMark>*</RequiredMark>}
                </Label>
                <FileUploadWrapper>
                  <FileUploadBox
                    onClick={() => document.getElementById(inputId).click()}
                  >
                    <FileName>
                      {fileState ? fileState.name : "파일 선택하기"}
                    </FileName>
                  </FileUploadBox>
                </FileUploadWrapper>
                <HiddenInput
                  id={inputId}
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) => handleFileChange(e, setFileState)}
                />
              </InputGroup>
            );
          }
        )}

        <NextButton type="submit" disabled={!isValid}>
          다음
        </NextButton>
      </Form>
    </Container>
  );
};

export default HostInfoForm;
