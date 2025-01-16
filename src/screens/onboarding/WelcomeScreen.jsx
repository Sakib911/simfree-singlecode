import React from "react";
import { Linking, Platform, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../store";
import {
  AnimatedScreen,
  CustomText,
  LinearComp,
  ShowImage,
  WelcomeHeader,
} from "../../components";
import { appleSignIn, facebookSignIn, googleSignIn } from "../../utils";
import { FbLogo } from "../../../assets/svgs";

const WelcomeScreen = ({ navigation }) => {
  const { updateUser } = useAuthStore();

  const helpUrl = process.env.EXPO_PUBLIC_HELP_URL;
  const privacyUrl = process.env.EXPO_PUBLIC_PRIVACY_URL;
  const termsUrl = process.env.EXPO_PUBLIC_TERMS_URL;

  const classText = "text-xs font-medium text-center text-text-3";

  return (
    <AnimatedScreen classes={"justify-between"}>
      <WelcomeHeader />
      <View className={`w-full items-center`}>
        <ShowImage imageName="timerIcon" />
      </View>
      <View
        className={
          "flex flex-col justify-between items-center w-full space-y-2"
        }
      >
        <TouchableOpacity
          className={
            "flex flex-row bg-white rounded-2xl w-full h-14 items-center justify-between px-4"
          }
          onPress={() => facebookSignIn(updateUser)}
        >
          <FbLogo />

          <CustomText classes={"font-bold text-bg-4 text-lg"}>
            Continue with Facebook
          </CustomText>
          <View />
        </TouchableOpacity>

        {Platform.OS === "ios" && (
          <TouchableOpacity
            className={
              "flex flex-row bg-bg-4 rounded-2xl w-full h-14 items-center justify-between px-4"
            }
            onPress={() => appleSignIn(updateUser)}
          >
            <ShowImage imageName="appleWhite" />

            <CustomText classes={"font-bold text-white text-lg"}>
              Continue with Apple
            </CustomText>
            <View />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className={
            "flex flex-row bg-white rounded-2xl w-full h-14 items-center justify-between px-4"
          }
          onPress={() => googleSignIn(updateUser)}
        >
          <ShowImage imageName="googleIcon" />

          <CustomText classes={"font-bold text-text-1 text-lg"}>
            Continue with Google
          </CustomText>
          <View />
        </TouchableOpacity>

        <CustomText classes={`flex items-center text-text-2 text-xs`}>
          or
        </CustomText>

        <TouchableOpacity
          className={
            "flex flex-row rounded-2xl w-full h-14 items-center justify-center border border-text-1"
          }
          onPress={() => navigation.push("SignInEmail")}
        >
          <CustomText classes={"font-bold text-text-2 text-lg"}>
            Continue with Email
          </CustomText>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row flex-wrap justify-center">
        <CustomText classes={classText}>
          By signing up, you accept FreeSIM’s
        </CustomText>
        <TouchableOpacity onPress={() => Linking.openURL(termsUrl)}>
          <CustomText classes={`${classText} text-bg-5`}>
            . Terms of Service
          </CustomText>
        </TouchableOpacity>
        <CustomText classes={classText}>
          , and you acknowledge that you have read our
        </CustomText>
        <TouchableOpacity onPress={() => Linking.openURL(privacyUrl)}>
          <CustomText classes={`${classText} text-bg-5`}> Privacy Policy</CustomText>
        </TouchableOpacity>
        {/* <CustomText classes={classText}> and </CustomText>
        <TouchableOpacity onPress={() => Linking.openURL(helpUrl)}>
          <CustomText classes={`${classText} text-bg-5`}>Cookie.</CustomText>
        </TouchableOpacity> */}
      </View>
    </AnimatedScreen>
  );
};

export default WelcomeScreen;
