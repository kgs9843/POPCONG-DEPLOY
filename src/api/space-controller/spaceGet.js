import { get } from "./../index";
// 장소 데이터 가져오기
export const getPlaces = async (latitude, longitude) => {
  try {
    console.log(latitude, longitude);
    const response = await get("/api/v1/popup/space/markers", {
      params: {
        lat: latitude,
        lng: longitude,
        "nw-lat": 32,
        "nw-lng": 126,
        "se-lat": 38,
        "se-lng": 132,
        sort: "MOST_POPULAR",
      },
    });

    return response.data;
  } catch (error) {
    console.error("getPlaces API 실패:", error);
    throw error;
  }
};
