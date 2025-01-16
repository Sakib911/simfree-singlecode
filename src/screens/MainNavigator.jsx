import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileNavigator from "./profile/ProfileNavigator";
import HomeNavigator from "./home/HomeNavigator";
import EsimNavigator from "./esims/EsimNavigator";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../services/PushNotifications";
import { addNotifyToken } from "../services/FirebaseStoreManager";
import { useAuthStore } from "../store";
import { CustomText } from "../components";
import { ESimSvg, HomeSvg, ProfileSvg } from "../../assets/svgs";
import { ESimFilled } from "../../assets/svgs/ESimFilled";
import { HomeFilled } from "../../assets/svgs/HomeFilled";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const MainNavigator = () => {
  const { user } = useAuthStore();

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        try {
          console.log("token is", token);

          await addNotifyToken(user.id, token);
        } catch (error) {
          console.log("error", error);
          alert("An error occurred while registering for push notifications");
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("An error occurred while registering for push notifications");
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          const notificationResponse = response.notification.request.content;
          console.log("notificationResponse", notificationResponse);
          // navigationOnNotificationClick(notificationResponse);
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Sims") {
            return focused ? (
              <ESimFilled classes={``} color={color} />
            ) : (
              <ESimSvg classes={``} color={color} />
            );
          } else if (route.name === "Profile") {
            return <ProfileSvg classes={``} color={color} />;
          } else if (route.name === "Home") {
            return focused ? (
              <HomeFilled classes={``} color={color} />
            ) : (
              <HomeSvg classes={``} color={color} />
            );
          }
        },
        tabBarActiveTintColor: "#FFAF00",
        tabBarInactiveTintColor: "#596070",
        tabBarLabel: (
          { focused, color, size } // eslint-disable-line
        ) => {
          let name = "Home";

          if (route.name === "Sims") {
            name = "My eSim's";
          } else if (route.name === "Profile") {
            name = "Profile";
          }

          return (
            <CustomText
              classes={`text-xs p-2 font-medium ${
                focused ? "text-bg-5" : "text-text-2"
              }`}
            >
              {name}
            </CustomText>
          );
        },
        tabBarStyle: {
          height: Platform.OS === "android" ? 60 : 90,
          padding: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Sims" component={EsimNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
