import React from "react";
import { CustomText } from "../../../../components";
import { TouchableOpacity, View } from "react-native";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const BottomSheetNetwork = ({ handleClose }) => {
  const normalText = "font-sm text-text-5";
  return (
    <View className="bg-white h-full rounded-t-3xl">
      <View className="p-4 flex-row items-center justify-between">
        <CustomText classes="font-bold text-xl">Device Support</CustomText>
        <TouchableOpacity onPress={handleClose}>
          <FontAwesomeIcon icon={faX} size={24} color={"black"} />
        </TouchableOpacity>
      </View>
      <View className="h-[1px] mb-1 w-full bg-black" />
      <View className="space-y-4 px-4">
        <CustomText classes={normalText}>
          iPhone XS and newer{" "}
          <CustomText classes="font-bold">support eSIM</CustomText> to confirm
          that your device support eSIM, follow the steps below
        </CustomText>

        <CustomText classes="text-base font-bold">Option 1</CustomText>

        <CustomText classes={normalText}>Figma ipsum </CustomText>
        <CustomText classes={normalText}>component variant</CustomText>

        <CustomText classes="text-base font-bold">Option 2</CustomText>

        <CustomText classes={normalText}>
          Figma ipsum component variant main layer. Share bold edit background
          selection layer shadow. Image team outline export opacity.
        </CustomText>

        <TouchableOpacity
          onPress={handleClose}
          className="items-center justify-center h-14 bg-border-1 rounded-2xl"
        >
          <CustomText classes="text-base font-bold">Got it</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomSheetNetwork;
