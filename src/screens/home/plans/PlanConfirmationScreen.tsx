import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import tw from "twrnc";
import ConfettiCannon from "react-native-confetti-cannon";
import CustomText from "../../../components/CustomText";

const PlanConfirmationScreen: React.FC<any> = ({
  navigation,
  route,
  tabNavigation,
}) => {
  const viewRef = useRef<Animatable.View & View>(null);
  const xDimension = Dimensions.get("screen").width;

  useFocusEffect(
    React.useCallback(() => {
      viewRef!.current!.fadeIn!(500);
    }, [])
  );

  useEffect(() => {
    setTimeout(() => {
      navigation.popToTop();
      tabNavigation.navigate("Sims");
    }, 6000);
  }, []);

  return (
    <Animatable.View
      ref={viewRef}
      animation="fadeIn"
      className={"flex flex-grow bg-white"}
    >
      <ScrollView className={"h-screen flex flex-grow bg-white"}>
        <ConfettiCannon
          count={35}
          origin={{ x: 0, y: 0 }}
          autoStart={true}
          autoStartDelay={3}
          explosionSpeed={1000}
          fallSpeed={4000}
        />
        <ConfettiCannon
          count={35}
          origin={{ x: xDimension, y: 0 }}
          autoStart={true}
          autoStartDelay={3}
          explosionSpeed={1000}
          fallSpeed={4000}
        />
        <View
          className={
            "h-screen w-full flex flex-col justify-center items-center"
          }
        >
          <Image
            source={require("../../../../assets/images/airplane.png")}
            style={tw`w-20 h-20`}
          />
          <CustomText classes={"text-lg text-black font-light pt-5"}>
            We are generating your eSIM...
          </CustomText>
        </View>
      </ScrollView>
    </Animatable.View>
  );
};

export default PlanConfirmationScreen;
