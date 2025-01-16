import React from "react";
import { CustomText, ShowImage } from "../../../../components";
import { TouchableOpacity, View } from "react-native";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const BottomSheetNetwork = ({ handleClose }) => {
  const dataArr = [
    {
      icon: faCheck,
      value: "Vodafone Espana S.A.U",
    },
    {
      icon: faCheck,
      value: "Orange Espagne S.A.U",
    },
    {
      icon: faCheck,
      value: "Telefonica de Espana S.A.U",
    },
    {
      icon: faCheck,
      value: "Xfera Moviles-- A.U",
    },
  ];
  return (
    <View className="bg-white h-full rounded-t-3xl">
      <View className="p-4 flex-row items-center justify-between">
        <CustomText classes="font-bold text-xl">Supported Network</CustomText>
        <TouchableOpacity onPress={handleClose}>
          <FontAwesomeIcon icon={faX} size={24} color={"black"} />
        </TouchableOpacity>
      </View>
      <View className="h-[1px] mb-1 w-full bg-black" />
      <View className="space-y-2 px-4">
        <ShowImage imageName="signal" classes={"my-2"} />
        <CustomText classes="font-bold text-base">Support</CustomText>

        {dataArr.map((item, index) => (
          <View key={index} className="flex-row items-center">
            <FontAwesomeIcon icon={item.icon} size={16} color={"#009AFF"} />
            <CustomText classes="font-medium ml-2 text-sm text-text-5">
              {item.value}
            </CustomText>
          </View>
        ))}

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
