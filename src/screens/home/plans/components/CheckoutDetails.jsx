import { TouchableOpacity, View } from "react-native";
import React from "react";
import { CustomText, ShowImage } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const CheckoutDetails = ({ openNetwork, openDevice }) => {
  const dataArr = [
    // {
    //   icon: "network",
    //   name: "Network",
    //   value: "View all",
    //   onPress: () => openNetwork(),
    // },
    {
      icon: "planType",
      name: "Plan type",
      value: "Data only",
    },
    {
      icon: "topup",
      name: "Topup",
      value: "Available",
    },
    // {
    //   icon: "device",
    //   name: "Device Compability",
    //   value: "Check",
    //   onPress: () => openDevice(),
    // },
  ];
  return (
    <View className="mb-4 space-y-4">
      <View className="flex-row items-center">
        <CustomText classes="font-bold text-base">Details</CustomText>
        <View className="w-6 h-6 rounded-full bg-white items-center justify-center ml-2">
          <FontAwesomeIcon size={12} color="#009AFF" icon={faChevronDown} />
        </View>
      </View>

      <View className="bg-white rounded-3xl w-full p-4 space-y-4">
        {dataArr.map((item, index) => (
          <View key={index} className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-2">
              <ShowImage imageName={item.icon} />
              <CustomText classes="font-bold text-sm ml-2">
                {item.name}
              </CustomText>
            </View>
            <TouchableOpacity onPress={item.onPress ? item.onPress : () => {}}>
              <CustomText
                classes={`font-medium ${
                  ["network", "device"].includes(item.icon) &&
                  "underline text-bg-4"
                }`}
              >
                {item.value}
              </CustomText>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CheckoutDetails;
