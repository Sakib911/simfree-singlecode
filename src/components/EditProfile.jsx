import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useAuthStore } from "../store";
import { handleUpdateProfile } from "../utils";
import CustomText from "./CustomText";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import ShowImage from "./ShowImage";
import LinearComp from "./LinearComp";

const EditProfile = ({ handleClose }) => {
  const { user, updateUser } = useAuthStore();

  const navigation = useNavigation();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const buttons = [
    {
      fieldName: "firstName",
      placeholder: "First Name",
    },
    {
      fieldName: "lastName",
      placeholder: "Last Name",
    },
    {
      fieldName: "email",
      placeholder: "Email",
    },
  ];

  const handleChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    handleUpdateProfile(updateUser, data);
  };

  return (
    <ScrollView
      className="bg-bg-2 space-y-4 rounded-t-3xl"
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <Header
        headerText="Edit Profile"
        handleBack={handleClose}
        classes="rounded-t-3xl"
      />
      <View className="bg-bg-2 p-2 flex items-center h-full">
        <ShowImage
          imageName="profileIcon"
          classes="w-24 my-10 h-24 rounded-full"
        />
        <View className="w-full p-2 space-y-4">
          {buttons.map((button, index) => (
            <View key={index} className="w-full items-start flex space-y-2">
              <CustomText classes="text-base font-bold">
                {button.placeholder}
              </CustomText>
              {button.fieldName == "email" ? (
                <View className="flex px-4 w-full h-14 items-center flex-row justify-between bg-border-1">
                  <CustomText classes="text-text-2 text-sm">
                    {data.email}
                  </CustomText>
                  <TouchableOpacity
                    className=" bg-white rounded-2xl px-4 py-2"
                    onPress={() => {
                      handleClose();
                      navigation.push("ChangePassword");
                    }}
                  >
                    <CustomText classes="text-bg-4 text-xs font-medium">
                      Change Password
                    </CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <TextInput
                  className={`text-sm font-medium w-full rounded-2xl px-4 h-14 bg-white`}
                  onChangeText={(v) => handleChange(button.fieldName, v)}
                  value={data[button.fieldName]}
                  placeholder={button.placeholder}
                  placeholderTextColor="#BDBDBD"
                />
              )}
            </View>
          ))}
          <LinearComp classes="mt-4">
            <TouchableOpacity
              onPress={handleSave}
              className="w-full flex items-center justify-center h-14 rounded-2xl"
            >
              <CustomText classes="font-bold text-base">Save</CustomText>
            </TouchableOpacity>
          </LinearComp>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
