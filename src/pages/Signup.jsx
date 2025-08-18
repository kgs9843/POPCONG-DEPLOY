import styled from "styled-components";
import AccountSelection from "../components/AccountSelection";
import HostInfoForm from "../components/HostInfoForm";
import GuestInfoForm from "../components/GuestInfoForm";
import SignupSuccess from "../components/SignupSuccess";
import useSignupStore from "../stores/useSignupStore";

const SignupContainer = styled.div`
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
  justify-content: center;
  align-items: center;
`;

const SignupPage = () => {
  // Zustant 스토어에서 step, userType 가져오기
  const { step, userType } = useSignupStore();

  return (
    <SignupContainer>
      {/* step 상태에 따라 다른 컴포넌트를 조건부 렌더링 */}
      {step === 1 && <AccountSelection />}
      {step === 2 && userType === "host" && <HostInfoForm />}
      {step === 2 && userType === "guest" && <GuestInfoForm />}
      {step === 3 && <SignupSuccess />}
    </SignupContainer>
  );
};

export default SignupPage;
