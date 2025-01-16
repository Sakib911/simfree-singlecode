import { View } from "react-native";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import OnboardingNavigator from "./src/screens/onboarding/OnboardingNavigator";
import MainNavigator from "./src/screens/MainNavigator";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useAuthStore } from "./src/store";
import ConfigManager from "./src/utils/ConfigManager";
import AppJson from "./app.json";
import { compareVersions } from "./src/utils/actions";
import { CustomText } from "./src/components";

SplashScreen.preventAutoHideAsync();

async function initializeRemoteConfigs() {
  await ConfigManager.getInstance().initRemoteConfigs();
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { user, updateUser } = useAuthStore();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          generalBold: require("./assets/fonts/GeneralSans-Bold.ttf"),
          generalLight: require("./assets/fonts/GeneralSans-Light.ttf"),
          generalMedium: require("./assets/fonts/GeneralSans-Medium.ttf"),
          generalRegular: require("./assets/fonts/GeneralSans-Regular.ttf"),
          generalSemibold: require("./assets/fonts/GeneralSans-Semibold.ttf"),
        });

        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const docRef = doc(db, "users", user.uid);
            const userDocument = await getDoc(docRef);

            if (userDocument.exists()) {
              updateUser(userDocument.data());
            } else updateUser(null);
          } else {
            updateUser(null);
          }

          setAppIsReady(true);
        });
      } catch (e) {
        console.warn(e);
      }
    }

    initializeRemoteConfigs()
      .then(() => {
        // Access configurations
        console.log("Remote Configurations Successfully Initialized");
      })
      .catch((e) => {
        console.log("Error initializing remote configs", e);
      });

    prepare();
  }, []);

  const content = ConfigManager.content;
  const appVersion = AppJson.expo.version;

  useEffect(() => {
    if (content && appVersion) {
      console.log(content, "Current Version:", appVersion);
      if (
        compareVersions(appVersion?.toString(), content?.HardUpdate?.toString())
      ) {
        // alert(
        //   `Your version is ${appVersion}. Please update version ${content?.HardUpdate} to continue using the app.`
        // );
      } else if (
        compareVersions(appVersion?.toString(), content?.SoftUpdate.toString())
      ) {
        // alert(
        //   `Your version is ${appVersion}. Please update version ${content?.SoftUpdate} to continue using the app.`
        // );
      }
    }
  }, [appVersion, content]);

  const hideSplashScreen = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    hideSplashScreen();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const toastConfig = {
    error: ({ text1, text2, hide, props }) => {
      return (
        <View
          className={
            "flex flex-row w-full h-24 bg-[#d0342c] items-center justify-center"
          }
        >
          <View className={"flex flex-row w-9/12 justify-between items-center"}>
            <FontAwesomeIcon icon={faX} size={24} color={"white"} />

            <View className={"flex flex-col w-9/12"}>
              <CustomText classes={"text-xl font-regular text-white"}>
                {text1}
              </CustomText>
              <CustomText classes={"font-regular text-white"}>
                {text2}
              </CustomText>
            </View>
          </View>
        </View>
      );
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY}>
        <SafeAreaProvider>
          <NavigationContainer>
            {user !== null ? <MainNavigator /> : <OnboardingNavigator />}
          </NavigationContainer>
        </SafeAreaProvider>

        <Toast config={toastConfig} topOffset={0} />
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
