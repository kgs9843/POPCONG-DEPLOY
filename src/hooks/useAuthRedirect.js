import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const useAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const { setTokens } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // zustand 상태에도 저장
      setTokens(accessToken, refreshToken);
    }
  }, [searchParams, setTokens]);
};

export default useAuthRedirect;
