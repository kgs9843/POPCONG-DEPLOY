import { create } from "zustand";

const useSignupStore = create((set) => ({
  step: 1, // 1: 계정 선택, 2: 개인정보 입력, 3: 회원가입 성공
  userType: null, // 'host' 또는 'guest'
  name: "", // 이름 전역 상태 추가
  profileImage: null, // 프로필 사진 (File 또는 URL)
  attachments: [], // 첨부 파일들 (File 배열)

  // 다음 단계로 이동
  setNextStep: (nextStep, navigate) => {
    set({ step: nextStep });
    if (nextStep === 3 && navigate) navigate("/home"); // 회원가입 완료 시 홈 이동
  },

  // 이전 단계로 돌아가기
  setBackStep: () => set({ step: 1, userType: null }),

  // userType 지정과 함께 다음 단계 이동
  setNextStepWithType: (nextStep, type, navigate) => {
    set({ step: nextStep, userType: type });
    if (nextStep === 3 && navigate) navigate("/home");
  },

  // 회원 정보 업데이트
  setName: (name) => set({ name }),
  setProfileImage: (fileOrUrl) => set({ profileImage: fileOrUrl }),
  addAttachment: (file) =>
    set((state) => ({ attachments: [...state.attachments, file] })),
  removeAttachment: (index) =>
    set((state) => ({
      attachments: state.attachments.filter((_, i) => i !== index),
    })),
  resetSignup: () =>
    set({
      step: 1,
      userType: null,
      name: "",
      profileImage: null,
      attachments: [],
    }),
}));

export default useSignupStore;
