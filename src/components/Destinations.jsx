import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import FastImage from "react-native-fast-image";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const Destinations = ({ heading, data, handleSelect }) => {
  const navigation = useNavigation();
  return (
    <>
      <View className="flex-row items-center space-x-2 my-4">
        <CustomText classes="font-bold text-xl ">{heading}</CustomText>
        <View className="bg-white rounded-full p-1">
          <FontAwesomeIcon size={12} color="#009AFF" icon={faChevronRight} />
        </View>
      </View>
      <FlatList
        scrollEnabled={false}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name.toString()}
        className=""
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row my-2 bg-white p-4 rounded-3xl items-center justify-between`}
            onPress={() => {
              handleSelect();
              navigation.push("Plan", {
                iso: item.code,
                region: item.region,
                name: item.name,
                image: item.flagUrl,
              });
            }}
          >
            <View className={`flex flex-row items-center justify-center`}>
              <FastImage
                source={{
                  uri: item.flagUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                className="w-6 h-6 rounded-2xl"
              />
              <CustomText classes="font-bold text-lg ml-4">
                {item.name}
              </CustomText>
            </View>

            <View className="bg-white rounded-full p-1">
              <FontAwesomeIcon
                size={12}
                color="#009AFF"
                icon={faChevronRight}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default Destinations;
