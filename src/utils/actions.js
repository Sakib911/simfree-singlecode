import { handleReferCode } from "../services/FirebaseStoreManager";

export const generateUniqueCode = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
};

export const compareVersions = (version1, version2) => {
  const v1 = version1.split(".");
  const v2 = version2.split(".");

  for (let i = 0; i < v1.length; i++) {
    if (Number(v1[i]) > Number(v2[i])) {
      return false;
    } else if (Number(v2[i]) > Number(v1[i])) {
      return true;
    }
  }
  if (version1 == version2) {
    return false;
  }
  return v1.length > v2.length ? false : true;
};

export const generateReferCode = async (user, updateUser) => {
  try {
    if (user.referCode) return null;
    const res = await handleReferCode(user.id);
    alert("Refer code generated successfully");
    updateUser(res);
  } catch (error) {
    console.log("Error in generating refer code", error);
    alert("Error in generating refer code");
  }
};
