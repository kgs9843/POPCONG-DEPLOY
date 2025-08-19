import { post } from "./../index";
// 좋아요 API 호출
export const likeSpace = async (spaceId) => {
  console.log(spaceId);
  try {
    const res = await post(`/api/v1/user/spaces/${spaceId}/like`);
    return res.data;
  } catch (err) {
    console.error("likeSpace API error:", err);
    throw err;
  }
};
