import { get } from "./../index";
// 장소 데이터 가져오기
export const getProfile = async () => {
  try {
    const response = await get("/api/v1/user/mypage/me");

    return response.data;
  } catch (error) {
    console.error("getPlaces API 실패:", error);
    throw error;
  }
};
