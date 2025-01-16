import React from "react";
import { View, TouchableOpacity } from "react-native";
import { CustomText, LinearComp, ReferComp } from "../../components";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress-bar-horizontal";

const EsimComponent = ({ simData, index }) => {
  const navigation = useNavigation();

  const esim = simData.data;

  const expiryDate = simData?.usage?.sim?.highestDateExpiry;

  return (
    <>
      {simData?.usage?.sim?.status === "ACTIVE" ? (
        <TouchableOpacity
          className="p-4 bg-white rounded-3xl space-y-2 mb-6"
          onPress={() =>
            navigation.push("PlanPurchase", {
              iso: simData?.country?.code,
              country: simData?.country?.name,
              region: simData?.country?.region,
              plan: {
                price: simData?.plan?.price,
                size: simData?.plan?.size,
                days: simData?.plan?.days,
                id: esim.planID,
              },
              image: simData?.country?.flagUrl,
            })
          }
        >
          <CustomText classes="text-text-3 font-bold text-sm">
            Active eSIM
          </CustomText>
          <View className="flex justify-between flex-row items-center">
            <View className={`flex flex-row items-center`}>
              <FastImage
                source={{
                  uri: simData?.country?.flagUrl || "",
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                className="w-6 h-6 rounded-full"
              />
              <CustomText classes="font-bold text-base ml-4">
                {simData?.country?.name || ""}
              </CustomText>
            </View>

            <CustomText classes="text-sm">
              {simData?.usage?.sim
                ? (simData?.usage?.sim?.consumedInBytes / 1000000000).toFixed(2)
                : 0}{" "}
              GB /{" "}
              {simData?.usage?.sim
                ? (simData?.usage?.sim?.size / 1000000000).toFixed(2)
                : 0}{" "}
              GB
            </CustomText>
          </View>

          {simData?.usage ? (
            <View className="w-full mt-4 flex justify-center flex-row">
              <ProgressBar
                progress={Number(simData.usage?.sim?.consumedPercentage) / 100}
                borderWidth={1}
                fillColor="#FFAF00"
                unfilledColor="#ECECEC"
                height={14}
                width={250}
                borderColor="#EDEDED"
              />
            </View>
          ) : null}

          <View className="flex-row items-center">
            <CustomText classes="font-bold text-sm text-text-5">
              Valid until :{" "}
            </CustomText>
            <CustomText classes="font-bold text-sm text-bg-5">
              {moment(expiryDate).format("DD MMM YYYY")} at{" "}
              {moment(expiryDate).format("hh:mm A")}
            </CustomText>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="p-4 bg-white rounded-3xl mb-4 space-y-2"
          onPress={() =>
            navigation.push("EsimDetails", {
              esim: esim,
            })
          }
        >
          <View className="flex-row justify-between items-center">
            <View
              className={`border ${
                simData?.usage?.sim ? "border-bg-3" : "border-text-6"
              } px-4 py-2 rounded-2xl`}
            >
              <CustomText
                classes={`${
                  simData?.usage?.sim ? "text-bg-3" : "text-text-6"
                } text-xs font-bold`}
              >
                {simData?.usage?.sim ? "Purchased" : "Expired"}
              </CustomText>
            </View>
            <CustomText classes="text-sm text-text-2 font-bold">
              {moment(esim.dateCreated).format("DD MMM YYYY")}
            </CustomText>
          </View>

          <View className="flex-row justify-between items-center">
            <View className={`flex flex-row items-center`}>
              <FastImage
                source={{
                  uri: simData?.country?.flagUrl || "",
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                className="w-6 h-6 rounded-full"
              />
              <CustomText classes="font-bold text-base ml-4">
                {simData?.country?.name || ""}
              </CustomText>
            </View>
            <CustomText classes="text-xs">
              {simData?.usage?.sim
                ? (simData?.usage?.sim?.consumedInBytes / 1000000000).toFixed(2)
                : 0}{" "}
              GB /{" "}
              {simData?.usage?.sim
                ? (simData?.usage?.sim?.size / 1000000000).toFixed(2)
                : 0}{" "}
              GB
            </CustomText>
          </View>

          <View className="flex justify-between flex-row items-center">
            <View className="flex-row items-center">
              <CustomText classes="font-bold text-[32px]">
                {simData?.plan?.size}GB
              </CustomText>
              <View className="w-[1px] bg-text-2 h-3 mx-2" />
              <CustomText classes="text-text-2 text-sm">
                {simData?.plan?.days} Days
              </CustomText>
            </View>

            <LinearComp width="max-content">
              <TouchableOpacity
                onPress={() =>
                  navigation.push("PlanPurchase", {
                    iso: simData?.country?.code,
                    country: simData?.country?.name,
                    region: simData?.country?.region,
                    plan: {
                      price: simData?.plan?.price,
                      size: simData?.plan?.size,
                      days: simData?.plan?.days,
                      id: esim.planID,
                    },
                    image: simData?.country?.flagUrl,
                  })
                }
                className="px-4 py-2 rounded-2xl"
              >
                <CustomText classes="text-sm font-bold">Buy Again</CustomText>
              </TouchableOpacity>
            </LinearComp>
          </View>
        </TouchableOpacity>
      )}

      {index === 0 ? <ReferComp classes="mb-4" /> : null}
    </>
  );
};

export default EsimComponent;
