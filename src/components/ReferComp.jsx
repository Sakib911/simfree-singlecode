import { View, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import ShowImage from "./ShowImage";
import { useNavigation } from "@react-navigation/native";
import LinearComp from "./LinearComp";

const ReferComp = ({ classes }) => {
  const navigation = useNavigation();

  return (
    <LinearComp classes={classes}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ReferFriend")}
        className={`w-full flex-row rounded-3xl items-center justify-between overflow-hidden`}
      >
        <View className="pl-4 py-3 w-3/5">
          <CustomText classes="text-base font-bold">
            Refer Friends and Earn $3
          </CustomText>
          <CustomText classes="text-xs">Referral</CustomText>
        </View>
        <ShowImage imageName="walletIcon" classes="" />
      </TouchableOpacity>
    </LinearComp>
  );
};

export default ReferComp;
