import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomText from "./CustomText";

const Header = ({ headerText, handleBack, classes = "" }) => {
  const navigation = useNavigation();

  return (
    <View
      className={`flex flex-row items-center justify-between bg-white w-full p-4 ${classes}`}
    >
      <TouchableOpacity
        onPress={() => (handleBack ? handleBack?.() : navigation.goBack())}
      >
        <View className={""}>
          <FontAwesomeIcon size={20} icon={faChevronLeft} />
        </View>
      </TouchableOpacity>
      <CustomText classes="font-bold text-2xl">{headerText}</CustomText>
      <View className="w-[20px]" />
    </View>
  );
};

export default Header;
