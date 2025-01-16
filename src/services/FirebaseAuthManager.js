import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  reauthenticateWithCredential,
  signInWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import * as FirebaseStoreManager from "./FirebaseStoreManager";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import * as AppleAuthentication from "expo-apple-authentication";
import { OAuthProvider } from "firebase/auth/react-native";

export const createUserWithEmailPass = async (email, password, data, cb) => {
  try {
    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userData = await FirebaseStoreManager.createUser(authUser.user.uid, {
      ...data,
      provider: "email",
    });
    cb(userData, true);
  } catch (error) {
    cb(error.message, false);
    console.error("Error during email/password sign-up:", error);
    return error;
  }
};

export const signinWithEmailPass = async (email, password, cb) => {
  try {
    const response = await signInWithCredential(
      auth,
      EmailAuthProvider.credential(email, password)
    );
    const res = await FirebaseStoreManager.getUserData(response.user.uid);
    cb(res, true);
  } catch (error) {
    cb(error.message, false);
    console.error("Error during email/password sign-in:", error);
    return error;
  }
};

export const signinWithGoogle = async () => {
  // try {
  GoogleSignin.configure({
    webClientId:
      "607499588215-js6sqpbjtt6qmd6bm7big2df5t547djl.apps.googleusercontent.com",
  });

  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();

  const googleCredential = GoogleAuthProvider.credential(idToken);

  const auth1 = getAuth();
  const response = await signInWithCredential(auth1, googleCredential);

  return response;
  // } catch (error) {
  //   console.error("Error during Google sign-in:", error);
  //   return error;
  // }
};

export const signinWithFacebook = async () => {
  // try {
  await LoginManager.logInWithPermissions(["public_profile", "email"]);
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    return;
  }
  const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
  const auth1 = getAuth();
  const response = await signInWithCredential(auth1, facebookCredential);

  return response;
  // } catch (e) {
  //   console.error("Error during Facebook sign-in:", e);
  //   return e;
  // }
};

export const signinWithAppleID = async () => {
  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });
  if (appleCredential.identityToken) {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    const credential = provider.credential({
      idToken: appleCredential.identityToken,
    });
    const { user } = await signInWithCredential(auth, credential);
    return user;
  }
};

export const updateUserPassword = async (oldPassword, newPassword) => {
  const response = await new Promise(async (resolve, reject) => {
    const email = auth.currentUser.email;
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, oldPassword);
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      updatePassword(user, newPassword)
        .then((user) => {
          resolve("Successfully Authenticate");
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

export const deleteUser = async (password) => {
  const email = auth.currentUser.email;

  const deleteUserResponse = await new Promise(async (resolve, reject) => {
    try {
      const authResponse = await reAuthenticateUser(email, password);
      const user = auth.currentUser;

      user
        .delete()
        .then(async () => {
          const deleteUserDoc = await FirebaseStoreManager.deleteUser(user.uid);
          resolve("User deleted Successfully");
        })
        .catch((error) => {
          console.log("deleteUserException1: ", error);
          reject(error);
        });
    } catch (error) {
      console.log("deleteUserException2: ", error);
      reject(error);
    }
  });
  return deleteUserResponse;
};

export const deleteFacebookLoginUser = async (uid) => {
  const response = await new Promise(async (resolve, reject) => {
    try {
      const userInfo = await FirebaseStoreManager.getUserData(uid);
      const reAuthResponse = await reAuthenticateFacebookLoginUser(userInfo);

      const user = auth.currentUser;
      user
        .delete()
        .then(async () => {
          try {
            const deleteUserDoc = await FirebaseStoreManager.deleteUser(
              user.uid
            );
            resolve("User deleted Successfully");
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
  return response;
};

export const deleteGoogleLoginUser = async (uid) => {
  const response = await new Promise(async (resolve, reject) => {
    try {
      const userInfo = await FirebaseStoreManager.getUserData(uid);
      const reAuthResponse = await reAuthenticateGoogleLoginUser(userInfo);

      const user = auth.currentUser;
      const googleUser = await GoogleSignin.getCurrentUser();
      if (googleUser) {
        await GoogleSignin.signOut();
      }

      user
        .delete()
        .then(async () => {
          try {
            const deleteUserDoc = await FirebaseStoreManager.deleteUser(
              user.uid
            );
            resolve("User deleted Successfully");
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
  return response;
};

export const deleteAppleLoginUser = async (uid) => {
  const userInfo = await FirebaseStoreManager.getUserData(uid);

  const response = await new Promise(async (resolve, reject) => {
    try {
      const reAuthResponse = await reAuthenticateAppleLoginUser(userInfo);

      const user = auth.currentUser;
      user
        .delete()
        .then(async () => {
          try {
            const deleteUserDoc = await FirebaseStoreManager.deleteUser(
              user.uid
            );
            resolve("User deleted Successfully");
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
  return response;
};

export const reAuthenticateUser = async (email, password) => {
  const reAuthResponse = await new Promise(async (resolve, reject) => {
    const email = auth.currentUser.email;
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      resolve("Authenticate Successfully");
    } catch (error) {
      console.error("Error during reauthentication:", error);
      reject(error);
    }
  });
  return reAuthResponse;
};

export const reAuthenticateGoogleLoginUser = async () => {
  const reAuthResponse = await new Promise(async (resolve, reject) => {
    GoogleSignin.configure({
      webClientId:
        "607499588215-js6sqpbjtt6qmd6bm7big2df5t547djl.apps.googleusercontent.com",
    });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(idToken);
    const user = auth.currentUser;
    reauthenticateWithCredential(user, googleCredential)
      .then((res) => {
        resolve("Authenticate Successfully");
      })
      .catch((error) => {
        reject(error);
      });
  });
  return reAuthResponse;
};

export const reAuthenticateFacebookLoginUser = async () => {
  const reAuthResponse = await new Promise(async (resolve, reject) => {
    try {
      await LoginManager.logInWithPermissions(["public_profile", "email"]);
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        return;
      }
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );
      const user = auth.currentUser;
      reauthenticateWithCredential(user, facebookCredential)
        .then((res) => {
          resolve("Authenticate Successfully");
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
  return reAuthResponse;
};

export const reAuthenticateAppleLoginUser = async () => {
  const reAuthResponse = await new Promise(async (resolve, reject) => {
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (appleCredential.identityToken) {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
      const credential = provider.credential({
        idToken: appleCredential.identityToken,
      });
      const user = auth.currentUser;
      reauthenticateWithCredential(user, credential)
        .then((res) => {
          resolve("Authenticate Successfully");
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
  return reAuthResponse;
};
