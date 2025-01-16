import React, { useEffect } from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import { Color, CustomText } from "../../components";
import { useNavigation } from "@react-navigation/native";
import AppJson from "../../../app.json";
import { SimfreeLogo } from "../../../assets/svgs";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);
  }, []);

  const appVersion = AppJson.expo.version;

  return (
    <View style={styles.splashScreenOptA} className="relative">
      <View
        style={{ ...styles.splashScreenOptAChild, ...styles.viewPosition }}
      />
      <Image
        style={{
          ...styles.splashScreenOptAItem,
          ...styles.homeIndicatorLightPosition,
        }}
        contentFit="cover"
        source={require("../../../assets/image/Vector3.png")}
      />
      <Image
        style={styles.maskGroupIcon}
        contentFit="cover"
        source={require("../../../assets/image/plane.png")}
      />
      <View style={{ ...styles.logo, ...styles.logoPosition }}>
        <SimfreeLogo />
      </View>
      <View
        style={{
          ...styles.homeIndicatorLight,
          ...styles.homeIndicatorLightPosition,
        }}
      >
        <View style={{ ...styles.homeIndicator, ...styles.logoPosition }} />
      </View>

      <CustomText classes="absolute bottom-10 w-full text-center">
        v.{appVersion}
      </CustomText>

      <CustomText classes="absolute bottom-32 w-full text-center text-xl font-bold">
        Stay Connected
      </CustomText>
      <CustomText classes="absolute bottom-24 w-full text-center text-xl font-bold">
        Wherever You Go!
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPosition: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  homeIndicatorLightPosition: {
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  logoPosition: {
    left: "50%",
    position: "absolute",
  },
  splashScreenOptAChild: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  splashScreenOptAItem: {
    width: "100%",
    height: Platform.OS === "ios" ? "80%" : "70%",
  },
  maskGroupIcon: {
    top: 311,
    left: 81,
    width: 230,
    height: 230,
    position: "absolute",
  },
  vectorIcon2: {
    width: 37,
    height: 32,
  },
  logo: {
    marginTop: -306,
    marginLeft: -76.5,
    top: "50%",
    paddingHorizontal: 0,
    paddingVertical: 7,
    overflow: "hidden",
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: 100,
    backgroundColor: Color.grayscaleBlack,
    width: 134,
    height: 5,
  },
  homeIndicatorLight: {
    height: 34,
    width: 393,
  },
  splashScreenOptA: {
    backgroundColor: Color.grayscaleBackground,
    height: "100vh",
    overflow: "hidden",
    width: "100vw",
    flex: 1,
  },
});

export default SplashScreen;
