import React from "react";
import { View, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import ShowImage from "./ShowImage";

const EmptyEsimScreen = ({ open }) => {
  return (
    <>
      <View className="items-center mt-32">
        <ShowImage imageName={"EmptyIcon"} classes={"w-20 h-20"} />
        <CustomText classes="mt-7 font-bold text-base text-text-2">
          Look’s like don’t have an eSIM
        </CustomText>
        <CustomText classes="mt-2 font-medium text-center text-sm text-text-3">
          Out of eSIMs? Like a runway with no travelers. Let's get ready to
          explore!
        </CustomText>
        <TouchableOpacity
          onPress={() => open()}
          className="mt-3 bg-border-1 py-4 px-5 rounded-2xl"
        >
          <CustomText classes="font-bold text-base">Get a Plan</CustomText>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EmptyEsimScreen;
