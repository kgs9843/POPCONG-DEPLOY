import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useAuthRedirect = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    }
  }, [searchParams]);
};

export default useAuthRedirect;
