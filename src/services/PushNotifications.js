import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("com.simfree", {
      name: "com.simfree",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  console.log("existingStatus", existingStatus);

  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("notification access not granted");
    return;
  }
  token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  });
  // } else {
  //   alert("Must use physical device for Push Notifications");
  // }

  return token.data;
};
