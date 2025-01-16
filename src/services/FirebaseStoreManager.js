import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { generateUniqueCode } from "../utils/actions";
import moment from "moment";

export const createUser = async (uid, data) => {
  const response = await new Promise(async (resolve, reject) => {
    try {
      const userRef = doc(db, `users`, uid);
      await setDoc(userRef, { ...data, id: uid, isNotify: true })
        .then(async (res) => {
          const response = await getUserData(uid);
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (error) {
      reject(error);
    }
  });
  return response;
};

export const deleteUser = async (userId) => {
  const response = await new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      resolve("User Deleted Successfully");
    } catch (error) {
      reject(error);
    }
  });
  return response;
};

export const updateUserData = async (uid, data) => {
  const response = await new Promise(async (resolve, reject) => {
    const userRef = doc(db, `users`, uid);
    await updateDoc(userRef, data)
      .then(async (res) => {
        const response = await getUserData(uid);
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
  return response;
};

export const getUserData = async (uid) => {
  const data = await new Promise(async (resolve, reject) => {
    const docRef = doc(db, "users", uid);
    const userDocument = await getDoc(docRef);
    if (userDocument.exists()) {
      resolve(userDocument.data());
    } else {
      reject("User Not Exist");
    }
  });
  return data;
};

export const addNotifyToken = async (uid, token) => {
  const userData = await getUserData(uid);

  if (userData.notifyTokens) {
    const notifyTokens = userData.notifyTokens;

    if (notifyTokens.includes(token)) {
      return userData;
    }
    notifyTokens.push(token);

    return await updateUserData(uid, { notifyTokens });
  } else {
    return await updateUserData(uid, { notifyTokens: [token] });
  }
};

export const handleReferCode = async (uid) => {
  return new Promise(async (resolve, reject) => {
    const code = generateUniqueCode();

    const docRef = doc(db, "promotions", code);
    const checkCodeExists = await getDoc(docRef);

    if (checkCodeExists.exists()) {
      console.log("Code already exists");
      handleReferCode(uid);
    } else {
      console.log("Code Saving...");

      const promotionRef = doc(db, `promotions`, code);
      await setDoc(promotionRef, {
        code: code,
        receiver: 3,
        sender: 3,
        creatorId: uid,
        type: "referral",
        validity: moment().add(1, "month").toDate(),
      });

      const updateUser = await updateUserData(uid, {
        referCode: code,
      });
      resolve(updateUser);
    }
  });
};

export const handlePromoCode = async (uid, code) => {
  try {
    const userPromotionDoc = doc(db, "promotions", code);
    const userPromotionData = (await getDoc(userPromotionDoc))?.data();
    if (!userPromotionData) {
      throw new Error("Invalid Code");
    }

    if (userPromotionData.creatorId === uid) {
      throw new Error("User can't apply own code");
    }

    const userDoc = doc(db, "users", uid);
    const userData = (await getDoc(userDoc))?.data();
    if (
      userData &&
      userData.appliedVouchers &&
      userData.appliedVouchers.includes(code)
    ) {
      throw new Error("Code already applied");
    }

    return userPromotionData;
  } catch (error) {
    throw error;
  }
};
