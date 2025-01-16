import { auth } from "../../firebaseConfig";
import {
  deleteAppleLoginUser,
  deleteFacebookLoginUser,
  deleteGoogleLoginUser,
  deleteUser,
  signinWithAppleID,
  signinWithFacebook,
  signinWithGoogle,
} from "../services/FirebaseAuthManager";
import {
  createUser,
  getUserData,
  updateUserData,
} from "../services/FirebaseStoreManager";

export const googleSignIn = async (updateUser) => {
  var response;
  try {
    response = await signinWithGoogle();

    const userData = await getUserData(response.user.uid);
    updateUser(userData);
  } catch (error) {
    if (error == "User Not Exist") {
      console.log("User Not Exist. Creating new user...");

      try {
        const userData = await createUser(response.user.uid, {
          email: response.user.email,
          admin: false,
          provider: "google",
        });
        updateUser(userData);
      } catch (updateError) {
        console.error("Error creating user:", updateError);
      }
    } else {
      console.error("Error signing in with Google:", error);
    }
  }
};

export const facebookSignIn = async (updateUser) => {
  var response;
  try {
    response = await signinWithFacebook();

    const userData = await getUserData(response.user.uid);
    updateUser(userData);
  } catch (error) {
    if (error == "User Not Exist") {
      console.log("User Not Exist. Creating new user...");

      try {
        const userData = await createUser(response.user.uid, {
          email: response.user.email,
          admin: false,
          provider: "facebook",
        });
        updateUser(userData);
      } catch (updateError) {
        console.error("Error creating user:", updateError);
      }
    } else {
      console.error("Error signing in with Facebook:", error);
    }
  }
};

export const appleSignIn = async (updateUser) => {
  var response;
  try {
    response = await signinWithAppleID();

    // const userData = await getUserData(response.uid);
    // updateUser(userData);
  } catch (error) {
    if (error == "User Not Exist") {
      console.log("User Not Exist. Creating new user...");

      try {
        const userData = await createUser(response.uid, {
          email: response.user.email,
          admin: false,
          provider: "apple",
        });
        updateUser(userData);
      } catch (updateError) {
        console.error("Error creating user:", updateError);
      }
    } else {
      console.error("Error signing in with Apple:", error);
    }
  }
};

export const handleUpdateProfile = async (updateUser, data) => {
  try {
    const response = await updateUserData(auth.currentUser.uid, data);
    // const response = await updateUserData(auth.currentUser.uid, {
    //   firstName,
    //   lastName,
    //   isNotify: notificationEnabled,
    // });
    updateUser(response);
    alert("Updated Successfully");
  } catch (e) {
    alert(e.message || "Something went wrong");
  }
};

export const deleteAccount = async (user, updateUser, password) => {
  try {
    switch (user.provider) {
      case "apple":
        await deleteAppleLoginUser(user.id);
        break;
      case "google":
        await deleteGoogleLoginUser(user.id);
        break;
      case "facebook":
        await deleteFacebookLoginUser(user.id);
        break;
      default:
        await deleteUser(password);
        break;
    }
    console.log("account deleted");
    updateUser(null);
  } catch (error) {
    if (error.code) {
      if (error.code == "auth/too-many-requests") {
        alert("Failed on many Attempts");
      } else if (error.code == "auth/invalid-login-credentials") {
        alert("Invalid Password");
      } else {
        alert("Something went wrong");
      }
    }
  }
};
