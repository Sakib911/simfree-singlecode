import { View, TextInput, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Destinations from "./Destinations";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Header from "./Header";

const SearchComp = ({ setSearchModal }) => {
  const [searchText, setSearchText] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filterAllCountries, setFilterAllCountries] = useState([]);
  const [filterTopCountries, setFilterTopCountries] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [allLoading, setAllLoading] = useState(false);

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
      console.error(error);
      setAllLoading(false);
    }
  };

  useEffect(() => {
    setAllLoading(true);
    getDocs(collection(db, "countries-meta")).then((res) => {
      setAllCountries(res.docs.map((doc) => doc.data()));
    });

    fetchPopular();
  }, []);

  const handleSearch = (v) => {
    setSearchText(v);
    setFilterAllCountries(
      allCountries.filter((country) =>
        country.name?.toLowerCase().includes(v.toLowerCase())
      )
    );
    setFilterTopCountries(
      topCountries.filter((country) =>
        country.name?.toLowerCase().includes(v.toLowerCase())
      )
    );
  };

  return (
    <ScrollView
      className="bg-bg-2 space-y-4 rounded-t-3xl"
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <Header
        headerText="Get a plan"
        handleBack={() => setSearchModal(false)}
        classes="rounded-t-3xl"
      />
      {allLoading ? (
        <View className="flex justify-center items-center h-96">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <View className="p-4">
          <View
            className={`flex-row w-full bg-white p-4 rounded-3xl items-center justify-between`}
          >
            <TextInput
              placeholder={"Where destination want to go?"}
              className={"text-sm font-medium w-4/5 text-text-3"}
              value={searchText}
              onChangeText={handleSearch}
            />
            <View className={""}>
              <FontAwesomeIcon size={20} icon={faMagnifyingGlass} />
            </View>
          </View>

          <Destinations
            heading={"Popular Destinations"}
            data={searchText ? filterTopCountries : topCountries}
            handleSelect={() => setSearchModal(false)}
          />
          <Destinations
            heading={"Country"}
            data={searchText ? filterAllCountries : allCountries}
            handleSelect={() => setSearchModal(false)}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default SearchComp;
