import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { updateUserPassword } from "../services/FirebaseAuthManager";
import { useNavigation } from "@react-navigation/native";
import AnimatedScreen from "./AnimatedScreen";
import CustomText from "./CustomText";
import Header from "./Header";
import LinearComp from "./LinearComp";

const ChangePassword = () => {
  const [data, setData] = useState({});

  const navigation = useNavigation();

  const buttons = [
    {
      fieldName: "oldPassword",
      placeholder: "Current Password",
    },
    {
      fieldName: "newPassword",
      placeholder: "New password",
    },
    {
      fieldName: "confirmPassword",
      placeholder: "Confirm new password",
    },
  ];

  const handleChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = data;

    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        try {
          const updatePass = await updateUserPassword(oldPassword, newPassword);
          Alert.alert("Success", "Password changed successfully");
          setData({});
          navigation.goBack();
        } catch (error) {
          if (error.code == "auth/invalid-login-credentials") {
            alert("Invalid Credentials");
          }
        }
      } else {
        alert("Password not matched");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <AnimatedScreen classes="p-0" statusBarColor={"#fff"}>
      <Header
        headerText="Change Password"
        handleBack={() => navigation.goBack()}
      />
      {/* <CustomText classes="text-base text-text-2 p-4 font-bold">
        Your email will not change until you’ve verified the new email code
      </CustomText> */}
      <View className="w-full px-4 mt-4">
        {buttons.map((button, index) => (
          <View key={index} className="w-full items-start flex space-y-2 mb-4">
            <CustomText classes="text-base font-bold">
              {button.placeholder}
            </CustomText>

            <TextInput
              className={`text-sm font-medium w-full rounded-2xl px-4 h-14 bg-white`}
              onChangeText={(v) => handleChange(button.fieldName, v)}
              value={data[button.fieldName]}
              placeholder={button.placeholder}
              placeholderTextColor="#BDBDBD"
              secureTextEntry
            />
          </View>
        ))}

        <LinearComp>
          <TouchableOpacity
            onPress={handleChangePassword}
            className="w-full flex items-center justify-center h-14 rounded-2xl"
          >
            <CustomText classes="font-bold text-base">Save</CustomText>
          </TouchableOpacity>
        </LinearComp>
      </View>
    </AnimatedScreen>
  );
};

export default ChangePassword;
