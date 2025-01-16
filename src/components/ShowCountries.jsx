import { FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "./CustomText";

const ShowCountries = ({ data, region }) => {
  const navigation = useNavigation();
  return (
    <View className="space-y-4 my-4">
      <View className="flex flex-row items-center space-x-2">
        <CustomText classes="font-bold text-xl">{region}</CustomText>
        <View className="bg-white rounded-full p-1">
          <FontAwesomeIcon size={12} color="#009AFF" icon={faChevronRight} />
        </View>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push("Plan", {
                iso: item.code,
                region: item.region,
                name: item.name,
                image: item.flagUrl,
              })
            }
            className="mr-2 justify-between bg-white w-24 h-24 p-4 rounded-2xl"
          >
            <FastImage
              source={{
                uri: item.flagUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              className="w-6 h-6 rounded-3xl"
            />
            <CustomText classes="font-bold text-base" numberOfLines={1}>
              {item.name}
            </CustomText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ShowCountries;
