import axios from "axios";

export const getDongFromCoords = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      "https://dapi.kakao.com/v2/local/geo/coord2address.json",
      {
        params: { x: longitude, y: latitude },
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
        },
      }
    );

    return res.data.documents[0]?.address?.region_3depth_name || null;
  } catch (err) {
    console.error("카카오 API 요청 실패:", err);
    return null;
  }
};
