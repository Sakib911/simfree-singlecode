import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { db } from "../../../firebaseConfig";
import {
  AnimatedScreen,
  CustomText,
  LinearComp,
  Loader,
  PopularDestination,
  ReferComp,
  SearchComp,
  ShowCountries,
  ShowImage,
} from "../../components";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { GiftIcon } from "../../../assets/svgs";

const HomeScreen = ({ tabNavigation }) => {
  const [allCountries, setAllCountries] = useState({});
  const [topCountries, setTopCountries] = useState([]);
  const [allLoading, setAllLoading] = useState(true);
  const [searchModal, setSearchModal] = useState(false);

  const navigation = useNavigation();

  const fetchPopular = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "popular"));
      const destinationsData = querySnapshot.docs.map((doc) => doc.data());

      const arr = destinationsData[0].countries;

      const countriesRef = collection(db, "countries-meta");

      const data = query(countriesRef, where("code", "in", arr));

      const docs = await getDocs(data);

      const popularCountries = docs.docs.map((doc) => doc.data());

      setTopCountries(popularCountries);
      setAllLoading(false);
    } catch (error) {
      setAllLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getDocs(collection(db, "countries-meta")).then((res) => {
      const countries = res.docs.map((doc) => doc.data());

      const countriesByRegion = countries.reduce((acc, country) => {
        const { region } = country;
        acc[region] = acc[region] || [];
        acc[region].push(country);
        return acc;
      }, {});

      setAllCountries(countriesByRegion);
    });

    fetchPopular();
  }, []);

  return (
    <>
      <AnimatedScreen>
        <ScrollView
          // stickyHeaderIndices={[0]}
          className={"w-full h-full space-y-4"}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-row items-center justify-between">
            <CustomText classes="font-bold text-3xl">Explore</CustomText>
            <View className="flex flex-row items-center space-x-4">
              <LinearComp width="max-content">
                <TouchableOpacity
                  onPress={() => navigation.navigate("ReferFriend")}
                  className="py-2 px-4 rounded-full flex-row items-center"
                >
                  <GiftIcon />
                  <CustomText classes="ml-2 text-xs font-medium">
                    Send Gift
                  </CustomText>
                </TouchableOpacity>
              </LinearComp>
              <TouchableOpacity
                onPress={() => tabNavigation.navigate("Profile")}
              >
                <ShowImage
                  imageName="profileIcon"
                  classes="w-12 h-12 rounded-full"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setSearchModal(true)}
            className={`flex flex-row w-full h-14 bg-white px-3 rounded-3xl items-center justify-between`}
          >
            <CustomText classes={"text-sm font-medium text-text-3 w-4/5"}>
              Where destination want to go?
            </CustomText>
            <FontAwesomeIcon size={20} icon={faMagnifyingGlass} />
          </TouchableOpacity>

          <PopularDestination data={topCountries} />

          <ReferComp />

          {Object.keys(allCountries || {}).map((key, i) => (
            <ShowCountries data={allCountries[key]} key={i} region={key} />
          ))}
        </ScrollView>

        <Loader loading={allLoading} />
      </AnimatedScreen>

      <Modal
        isVisible={searchModal}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onBackdropPress={() => setSearchModal(false)}
      >
        <View className="h-[90%]">
          <SearchComp setSearchModal={setSearchModal} />
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
