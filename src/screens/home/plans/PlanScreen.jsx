import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import {
  AnimatedScreen,
  CustomText,
  Header,
  LinearComp,
  Loader,
} from "../../../components";
import FastImage from "react-native-fast-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const PlanScreen = ({ navigation, route }) => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { iso, name, image, region } = route.params;

  useEffect(() => {
    getDocs(collection(db, "plans/" + region + "/plans")).then((res) => {
      const data = res.docs.map((doc) => doc.data());
      const plansArr = data.sort((a, b) => a.price - b.price);
      setPlans(plansArr);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex flex-col rounded-2xl space-y-2 p-4 bg-white mb-4 w-full"
      onPress={() =>
        navigation.push("PlanPurchase", {
          iso: iso,
          region: region,
          country: name,
          plan: item,
          image: image,
        })
      }
    >
      <View className="flex flex-row items-center">
        <FastImage
          source={{
            uri:
              image ||
              "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg",
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          className="w-6 h-6 rounded-full"
        />
        <CustomText classes="ml-2 font-bold text-base text-text-2">
          {name}
        </CustomText>
      </View>
      <View className="flex flex-row justify-between items-center">
        <View className="flex-row items-center">
          <CustomText classes="font-bold text-3xl">{item.size}GB</CustomText>
          <CustomText classes="ml-2 font-bold text-sm text-text-2">
            | {item.days} days
          </CustomText>
        </View>
        <LinearComp width="max-content">
          <View className="px-4 py-2 rounded-2xl flex-row items-center">
            <CustomText classes="font-bold text-base mr-1">
              ${item.price}
            </CustomText>
            <FontAwesomeIcon size={12} color="#1B2638" icon={faChevronRight} />
          </View>
        </LinearComp>
      </View>
    </TouchableOpacity>
  );

  return (
    <AnimatedScreen classes="p-0" statusBarColor={"#fff"}>
      <Header headerText="Plans" />
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={isLoading ? <Loader /> : <></>}
        className={"mt-2 p-4 w-full"}
      />
      <Loader loading={isLoading} />
    </AnimatedScreen>
  );
};

export default PlanScreen;
