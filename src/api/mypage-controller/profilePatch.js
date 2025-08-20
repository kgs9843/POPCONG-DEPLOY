import { patch } from "../index";

// 프로필 업데이트
export const patchProfile = async (name, introduction, profileImage) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("introduction", introduction);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    console.log(name, introduction, profileImage);

    const response = await patch("/user/my/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.message;
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    throw error;
  }
};
