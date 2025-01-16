import {
  faChevronRight,
  faClose,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  Share,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../firebaseConfig";
import { useAuthStore } from "../../store";
import {
  AnimatedScreen,
  ConfirmationModal,
  CustomText,
  EditProfile,
  LinearComp,
  ReferComp,
  ShowImage,
} from "../../components";
import { deleteAccount } from "../../utils";
import Modal from "react-native-modal";

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuthStore();

  const [password, setPassword] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const userName = user?.firstName
    ? user?.firstName + " " + user?.lastName
    : null;

  const liveChatUrl = process.env.EXPO_PUBLIC_LIVE_CHAT_URL;
  const sharePlayStoreUrl = process.env.EXPO_PUBLIC_PLAYSTORE_URL;
  const shareAppStoreUrl = process.env.EXPO_PUBLIC_APPSTORE_URL;
  const helpUrl = process.env.EXPO_PUBLIC_HELP_URL;
  const privacyUrl = process.env.EXPO_PUBLIC_PRIVACY_URL;
  const termsUrl = process.env.EXPO_PUBLIC_TERMS_URL;

  const buttons = [
    // {
    //   name: "Live chat",
    //   icon: "msgIcon",
    //   onPress: () => Linking.openURL(liveChatUrl),
    // },
    // {
    //   name: "Languages",
    //   icon: "languageIcon",
    //   onPress: () => alert("Languages"),
    // },
    // {
    //   name: "Change your password",
    //   icon: faComments,
    //   onPress: () => navigation.push("ChangePassword"),
    // },
    // {
    //   name: "Edit your Profile",
    //   icon: faComments,
    //   onPress: () => navigation.push("EditProfile"),
    // },
    {
      name: "Share app",
      icon: "shareIcon",
      onPress: () => setShareModal(true),
    },
    // {
    //   name: "Help",
    //   icon: "helpIcon",
    //   onPress: () => Linking.openURL(helpUrl),
    // },
    {
      name: "Privacy",
      icon: "privacyIcon",
      onPress: () => Linking.openURL(privacyUrl),
    },
    {
      name: "Terms",
      icon: "TermsIcon",
      onPress: () => Linking.openURL(termsUrl),
    },
    {
      name: "Delete Account",
      icon: "delIcon",
      onPress: () => setDeleteModal(true),
    },
    {
      name: "Sign out",
      icon: faRightFromBracket,
      onPress: () => setIsModal(true),
    },
  ];

  return (
    <>
      <ConfirmationModal
        title={"Logout"}
        message={"Are you sure you want to signout?"}
        onConfirm={() => auth.signOut()}
        onCancel={() => setIsModal(false)}
        visible={isModal}
      />
      <AnimatedScreen>
        <ScrollView
          className={"w-full space-y-6 mt-4"}
          showsVerticalScrollIndicator={false}
          //  stickyHeaderIndices={[0]}
        >
          <View className="flex flex-row items-center justify-between w-full">
            <CustomText classes="font-bold text-3xl text-text-1">
              Profile
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setProfileModal(true);
                // navigation.push("EditProfile")
              }}
            >
              <ShowImage imageName={"editIcon"} classes="w-6 h-6" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row space-x-4 mb-4 items-center p-2 w-full bg-white rounded-3xl">
            <ShowImage
              imageName="profileIcon"
              classes="w-24 h-24 rounded-full"
            />
            <View className={"flex flex-col"}>
              <CustomText
                classes={"font-bold text-lg text-text-4 w-[80%]"}
                numberOfLines={1}
              >
                {userName ? userName : ""}
              </CustomText>
              <View className="flex flex-row items-center space-x-2">
                <CustomText
                  classes={"font-medium text-sm text-text-5 w-[80%]"}
                  numberOfLines={1}
                >
                  {user?.email}
                </CustomText>
                {/* <TouchableOpacity
                  onPress={() => alert("Verify Email")}
                  className="bg-bg-3 px-2 py-1 rounded-full"
                >
                  <CustomText classes={"font-medium text-xs text-white"}>
                    Verify
                  </CustomText>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <ReferComp />
          <View className="flex flex-col space-y-5 items-start justify-between w-full">
            <CustomText classes="font-bold text-xl text-text-1">
              Settings
            </CustomText>

            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={button.onPress}
                className="flex flex-row w-full justify-between items-center bg-white rounded-3xl p-4"
              >
                <View className="flex flex-row items-center space-x-4">
                  {button.name === "Sign out" ? (
                    <FontAwesomeIcon
                      icon={button.icon}
                      color={"black"}
                      size={24}
                    />
                  ) : (
                    <ShowImage imageName={button.icon} classes="w-6 h-6" />
                  )}
                  <CustomText classes="ml-2 font-bold text-base">
                    {button.name}
                  </CustomText>
                </View>
                <View className="">
                  <FontAwesomeIcon
                    size={12}
                    color="#009AFF"
                    icon={faChevronRight}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </AnimatedScreen>

      <Modal
        isVisible={profileModal}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onBackdropPress={() => setProfileModal(false)}
      >
        <View className="h-[90%]">
          <EditProfile handleClose={() => setProfileModal(false)} />
        </View>
      </Modal>

      <Modal
        isVisible={deleteModal}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onBackdropPress={() => setDeleteModal(false)}
      >
        <View className="h-[30%]">
          <View className="p-4 bg-bg-2 space-y-4 h-full rounded-t-3xl">
            <TouchableOpacity
              className="items-end"
              onPress={() => setDeleteModal(false)}
            >
              <FontAwesomeIcon size={24} icon={faClose} />
            </TouchableOpacity>
            <CustomText classes="text-base font-bold">
              Enter your password
            </CustomText>
            <TextInput
              className={`text-sm font-medium w-full rounded-2xl px-4 h-14 bg-white`}
              onChangeText={(v) => setPassword(v)}
              value={password}
              placeholder={"Enter your password"}
              placeholderTextColor="#BDBDBD"
              secureTextEntry
            />
            <LinearComp classes={"mt-4"}>
              <TouchableOpacity
                onPress={() => deleteAccount(user, updateUser, password)}
                className="w-full flex items-center justify-center h-14 rounded-2xl"
              >
                <CustomText classes="font-bold text-base">Delete</CustomText>
              </TouchableOpacity>
            </LinearComp>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={shareModal}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onBackdropPress={() => setShareModal(false)}
      >
        <View className="h-[30%]">
          <View className="p-4 bg-bg-2 space-y-4 h-full rounded-t-3xl">
            <LinearComp classes={"mt-4"}>
              <TouchableOpacity
                onPress={() => Share.share({ message: sharePlayStoreUrl })}
                className="w-full flex items-center justify-center h-14 rounded-2xl"
              >
                <CustomText classes="font-bold text-base">
                  Play Store URL
                </CustomText>
              </TouchableOpacity>
            </LinearComp>
            <LinearComp classes={"mt-4"}>
              <TouchableOpacity
                onPress={() => Share.share({ message: shareAppStoreUrl })}
                className="w-full flex items-center justify-center h-14 rounded-2xl"
              >
                <CustomText classes="font-bold text-base">
                  APP Store URL
                </CustomText>
              </TouchableOpacity>
            </LinearComp>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;
