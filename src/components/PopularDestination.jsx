import { FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CustomText from "./CustomText";
import { useNavigation } from "@react-navigation/native";

const PopularDestination = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View className="space-y-4 my-4">
      <View className="flex flex-row items-center space-x-2">
        <CustomText classes="font-bold text-xl">
          Popular Destinations
        </CustomText>
        <View className="bg-white rounded-full p-1">
          <FontAwesomeIcon size={12} color="#009AFF" icon={faChevronRight} />
        </View>
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.name.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mr-4 bg-white rounded-2xl relative w-56"
            onPress={() =>
              navigation.push("Plan", {
                iso: item.code,
                region: item.region,
                name: item.name,
                image: item.flagUrl,
              })
            }
          >
            <FastImage
              source={{
                uri: item.thumbnail,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              className="w-56 h-24 rounded-t-2xl"
            />
            <View className="flex flex-row items-center justify-between p-2">
              <CustomText classes="font-bold text-base w-1/2" numberOfLines={1}>
                {item.name}
              </CustomText>
              <View className="items-center">
                <CustomText classes="text-xs font-medium">
                  Starts from
                </CustomText>
                <CustomText classes="font-bold text-base">
                  ${item.startingFrom || 0}
                </CustomText>
              </View>
            </View>
            <View className="absolute top-4 left-4">
              <FastImage
                source={{
                  uri: item.flagUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                className="w-6 h-6 rounded-full border border-white"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PopularDestination;
