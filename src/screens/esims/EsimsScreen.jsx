import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, functions } from "../../../firebaseConfig";
import EsimComponent from "./EsimComponent";
import CustomText from "../../components/CustomText";
import { AnimatedScreen, Loader, SearchComp } from "../../components";
import { useAuthStore } from "../../store";
import EmptyEsimScreen from "../../components/EmptyEsimScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modal";
import { useIsFocused } from "@react-navigation/native";
import { httpsCallable } from "firebase/functions";

const EsimsScreen = () => {
  const [sims, setSims] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchModal, setSearchModal] = useState(false);

  const { user } = useAuthStore();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchSims = async () => {
      setSims([]);
      setLoading(true);

      if (user) {
        const userId = user.id;
        try {
          const res = await getDocs(collection(db, `users/${userId}/esims`));
          const arr = res.docs.map((doc) => doc.data());

          const sortedSims = await Promise.all(
            arr.map(async (v) => {
              const simDetails = await loadSim(v);
              return { data: v, ...simDetails };
            })
          ).then((simData) =>
            simData.sort((a, b) => {
              const aPlanActive = a.usage?.sim?.status === "ACTIVE";
              const bPlanActive = b.usage?.sim?.status === "ACTIVE";

              if (aPlanActive !== bPlanActive) {
                return aPlanActive ? -1 : 1;
              }

              const dateA = a.data?.dateCreated
                ? new Date(a.data.dateCreated).getTime()
                : -1;
              const dateB = b.data?.dateCreated
                ? new Date(b.data.dateCreated).getTime()
                : -1;

              return dateB - dateA;
            })
          );

          setSims(sortedSims);
        } catch (err) {
          console.error("Error fetching SIMs:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSims();
  }, [isFocused]);

  const loadSim = async (esim) => {
    try {
      const countryDoc = await getDoc(
        doc(db, `countries-meta/${esim.isoCode}`)
      );
      const countryData = countryDoc.exists() ? countryDoc.data() : undefined;

      let planData;
      try {
        const planDoc = await getDoc(
          doc(db, `plans/${esim.region}/plans/${esim.planID}`)
        );
        planData = planDoc.exists() ? planDoc.data() : undefined;
      } catch (err) {
        console.warn("Error fetching plan:", err);
        planData = undefined;
      }

      let esimUsage;
      try {
        const checkUsage = httpsCallable(functions, "checkUsage");
        const response = await checkUsage({ esimID: esim.iccid });
        esimUsage = response.data;
      } catch (err) {
        console.warn("Error checking usage:", err);
        esimUsage = undefined;
      }

      return {
        country: countryData,
        plan: planData,
        usage: esimUsage,
      };
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <>
      <AnimatedScreen classes="p-0">
        <View className="flex-row items-center justify-between w-full h-28 px-4">
          <CustomText classes="font-extrabold text-4xl">My eSIM</CustomText>
          <TouchableOpacity onPress={() => setSearchModal(true)}>
            <FontAwesomeIcon size={20} icon={faPlus} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={sims}
          renderItem={({ item, index }) => (
            <EsimComponent simData={item} index={index} />
          )}
          keyExtractor={(item, index) => `list-item-${index}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyEsimScreen open={() => setSearchModal(true)} />
          }
          className={"w-full h-full space-y-4 px-4"}
        />
        <Loader loading={isLoading} />
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

export default EsimsScreen;
