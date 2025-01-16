import React from "react";
import { Linking, ScrollView, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import FastImage from "react-native-fast-image";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-toast-message";
import CustomText from "../../components/CustomText";
import { AnimatedScreen, Header } from "../../components";

const EsimsDetailScreen = ({ navigation, route, tabNavigation }) => {
  const esim = route.params.esim;
  const userGuideUrl = process.env.EXPO_PUBLIC_USER_GUIDE_URL;

  const copyToClipboard = (val) => {
    Clipboard.setString(val);
    Toast.show({
      type: "success",
      text1: "Copied to clipboard",
    });
  };

  return (
    <AnimatedScreen classes="p-0" statusBarColor={"#fff"}>
      <Header headerText="eSIM Details" />

      <View
        className={
          "flex flex-col min-h-0 w-[90%] mt-[5%] bg-gray-100 rounded-xl ml-[5%] "
        }
      >
        <CustomText classes={"text-lg font-extra_bold ml-[5%] mt-[5%]"}>
          Scan the below QR code
        </CustomText>
        <View className={"flex flex-row w-[80%] ml-[24%] mt-[5%]"}>
          <FastImage
            source={{
              uri: esim.qrCodeImageUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{ width: 175, height: 175 }}
          />
        </View>

        <View className={"w-full h-[1px] bg-gray-200 mt-[5%]"} />

        <CustomText classes={"text-lg font-regular ml-[5%] mt-[5%]"}>
          Activation Code
        </CustomText>

        <View
          className={
            "flex flex-row items-center justify-between w-[90%] ml-[5%] mt-[2.5%] pl-[5%] pr-[5%] h-10 rounded-full border border-gray-300"
          }
        >
          <CustomText
            classes={"w-[80%] font-regular text-gray-500 truncate"}
            onPress={() => copyToClipboard(esim.matchingID)}
          >
            {esim.matchingID}
          </CustomText>
          <TouchableOpacity onPress={() => copyToClipboard(esim.SMDP)}>
            <FontAwesomeIcon icon={faCopy} color={"#000080"}></FontAwesomeIcon>
          </TouchableOpacity>
        </View>

        <View className={"w-full h-[1px] bg-gray-200 mt-[5%]"} />

        <View className={"flex h-14 flex-col items-center w-full mt-[4.5%] "}>
          <View className={"flex flex-row"}>
            <CustomText classes={"font-regular text-gray-500"}>
              You can also follow the{" "}
            </CustomText>
            <CustomText
              classes={"font-regular text-[#6495ED]"}
              onPress={() => Linking.openURL(userGuideUrl)}
            >
              User Guide
            </CustomText>
          </View>
          <CustomText classes={"font-regular text-gray-500"}>
            for a quick guide on how to install the sim.
          </CustomText>
        </View>
      </View>
    </AnimatedScreen>
  );
};

export default EsimsDetailScreen;
