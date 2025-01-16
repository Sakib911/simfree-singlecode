import {
  View,
  TouchableOpacity,
  Share,
  ScrollView,
  FlatList,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import React, { useEffect } from "react";
import {
  AnimatedScreen,
  CustomText,
  Header,
  LinearComp,
  ShowImage,
} from "../../components";
import { useAuthStore } from "../../store";
import { generateReferCode } from "../../utils";
import { LinkSvg, ShareSvg } from "../../../assets/svgs";
import Toast from "react-native-toast-message";

const ReferFriend = () => {
  const { user, updateUser } = useAuthStore();

  useEffect(() => {
    generateReferCode(user, updateUser);
  }, []);

  const code = user?.referCode;
  const rewards = user?.referReward || [];

  const referText = `Join me on simfree app and get 3$ off on your first purchase. Use my referral code ${code} to get the discount.`;

  // const isUsedRewards = rewards.filter((reward) => reward.isUsed).length;
  // const totalRewards = rewards.length;

  return (
    <AnimatedScreen classes="p-0" statusBarColor={"#fff"}>
      <Header headerText="Refer & Earn" />
      <ScrollView showsVerticalScrollIndicator={false} className="w-full">
        <View className="w-full p-4 space-y-4">
          <ShowImage
            imageName={"referImage"}
            classes={"w-full rounded-[32px]"}
          />

          <CustomText classes="font-bold text-base text-text-2 mt-4">
            Your custom referral code :
          </CustomText>

          <View className="bg-white h-14 font-bold text-sm flex justify-center px-4 w-full rounded-2xl">
            <CustomText classes="text-text-1">{code}</CustomText>
          </View>

          <View className="flex flex-row justify-between">
            <LinearComp width={"40%"}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(referText);
                  Toast.show({
                    type: "success",
                    text1: "Copied to clipboard",
                  });
                }}
                className="flex flex-row items-center justify-center h-14 rounded-2xl"
              >
                <LinkSvg />
                <CustomText classes="font-bold text-sm ml-2">
                  Copy Link
                </CustomText>
              </TouchableOpacity>
            </LinearComp>

            <LinearComp width={"40%"}>
              <TouchableOpacity
                onPress={() => {
                  Share.share({ message: referText });
                }}
                className="flex flex-row items-center justify-center h-14 rounded-2xl"
              >
                <ShareSvg />
                <CustomText classes="font-bold text-sm ml-2">
                  Share Link
                </CustomText>
              </TouchableOpacity>
            </LinearComp>
          </View>
        </View>

        <View className="space-y-4 bg-white p-4">
          <CustomText classes="font-bold text-base mt-4">
            Reward History
          </CustomText>

          <FlatList
            data={rewards}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View className={`p-4 rounded-2xl mb-4 bg-bg-2`}>
                <CustomText classes={`text-sm font-semibold`}>
                  You don't have any rewards yet
                </CustomText>
              </View>
            )}
            renderItem={({ item }) => (
              <View
                className={`p-4 rounded-2xl mb-4 ${
                  item.isUsed ? "bg-bg-2" : "bg-bg-5"
                }`}
              >
                <CustomText classes={`text-sm font-semibold`}>
                  {item.isUsed ? "You have 1 reward" : "You used this reward"}
                </CustomText>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </AnimatedScreen>
  );
};

export default ReferFriend;
