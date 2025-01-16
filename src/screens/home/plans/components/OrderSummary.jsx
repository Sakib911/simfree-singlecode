import { TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { CustomText } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FastImage from "react-native-fast-image";

const OrderSummary = ({
  plan,
  image,
  country,
  promoCode,
  setPromoCode,
  handleApplyPromoCode,
  codeSuccess,
  stripeRes,
}) => {
  return (
    <View className="mb-4 space-y-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <CustomText classes="font-bold text-base">Order Summary</CustomText>
          <View className="w-6 h-6 rounded-full bg-white items-center justify-center ml-2">
            <FontAwesomeIcon size={12} color="#009AFF" icon={faChevronDown} />
          </View>
        </View>
        <CustomText classes="font-bold text-base">${plan.price}</CustomText>
      </View>

      <View className="bg-white rounded-3xl w-full p-4 space-y-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <FastImage
              source={{
                uri:
                  image ||
                  "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg",
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <CustomText classes="font-bold text-base">{country}</CustomText>
              <View className="flex-row items-center">
                <CustomText classes="text-sm text-text-4">Data</CustomText>
                <CustomText classes="text-sm text-text-2">
                  {" "}
                  : {plan.size}GB
                </CustomText>
                <CustomText classes="text-sm text-text-4">
                  {" "}
                  | Duration
                </CustomText>
                <CustomText classes="text-sm text-text-2">
                  {" "}
                  : {plan.days}Days
                </CustomText>
              </View>
            </View>
          </View>
          <CustomText classes="font-bold text-base">${plan.price}</CustomText>
        </View>
        <CustomText classes="font-bold text-sm mt-4">Apply Code</CustomText>
        <View
          className={`flex flex-row w-full border border-border-2 h-12 bg-white px-3 rounded-2xl items-center justify-between`}
        >
          <TextInput
            placeholder={"Refferal Code"}
            className={"text-sm font-bold w-4/5"}
            value={promoCode}
            onChangeText={(v) => setPromoCode(v)}
          />
          <TouchableOpacity className={""} onPress={handleApplyPromoCode}>
            <FontAwesomeIcon size={12} color="#009AFF" icon={faChevronRight} />
          </TouchableOpacity>
        </View>

        {codeSuccess &&
          (codeSuccess?.isSuccess ? (
            <View className="flex-row items-center">
              <CustomText classes="font-medium text-xs text-bg-3">
                {codeSuccess?.message}
              </CustomText>
            </View>
          ) : (
            <View className="flex-row items-center ">
              <CustomText classes="font-medium text-xs text-text-6">
                {codeSuccess?.message}
              </CustomText>
            </View>
          ))}

        {stripeRes?.discount && (
          <View className="flex-row items-center justify-between">
            <CustomText classes="font-bold text-sm text-text-7">
              {stripeRes?.isReward ? "Reward" : "Discount"}
            </CustomText>
            <CustomText classes="font-bold text-base text-text-7">
              - ${stripeRes?.discount}
            </CustomText>
          </View>
        )}

        <View className="flex-row items-center justify-between">
          <CustomText classes="font-bold text-sm">Total</CustomText>
          <CustomText classes="font-bold text-base">
            ${stripeRes?.amount || plan.price}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;
