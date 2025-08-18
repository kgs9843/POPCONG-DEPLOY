import axios from "axios";

export const getCoordsFromDong = async (address) => {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    });

    if (res.data.documents.length > 0) {
      const { x: longitude, y: latitude } = res.data.documents[0];
      return { latitude, longitude };
    } else {
      throw new Error("No results found for the given address.");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};
