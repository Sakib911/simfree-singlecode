import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import ShowImage from "./ShowImage";
import { LogoSvg } from "../../assets/svgs";

const WelcomeHeader = () => {
  return (
    <View className={`flex items-center mt-8`}>
      <LogoSvg />
      <CustomText classes={`font-bold text-3xl text-text-1 mt-4`}>
        Almost There
      </CustomText>
      <CustomText classes={`text-text-2 text-sm font-medium`}>
        Sign up or login to continue, it only take 1 mins
      </CustomText>
    </View>
  );
};

export default WelcomeHeader;
