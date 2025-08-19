import { del } from "./../index";
// 좋아요 취소
export const unlikeSpace = async (spaceId) => {
  try {
    const res = await del(`/api/v1/user/spaces/${spaceId}/like`);
    return res.data;
  } catch (err) {
    console.error("unlikeSpace API error:", err);
    throw err;
  }
};
