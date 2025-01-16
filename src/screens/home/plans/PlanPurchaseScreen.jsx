import { useStripe } from "@stripe/stripe-react-native";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { db, functions } from "../../../../firebaseConfig";
import { handlePromoCode } from "../../../services/FirebaseStoreManager";
import { useAuthStore } from "../../../store";
import CustomText from "../../../components/CustomText";
import {
  AnimatedScreen,
  CryptoModal,
  Header,
  LinearComp,
  Loader,
  SelectPayModal,
} from "../../../components";
import {
  OrderSummary,
  CheckoutDetails,
  BottomSheetDevice,
  BottomSheetNetwork,
} from "./components";
import Modal from "react-native-modal";
import {
  collection,
  deleteDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const PlanPurchaseScreen = ({ navigation, route }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isStripeLoading, setStripeLoading] = useState(true);
  const [networkModal, setNetworkModal] = useState(false);
  const [selectPay, setSelectPay] = useState(false);
  const [payUrl, setPayUrl] = useState("");
  const [deviceModal, setDeviceModal] = useState(false);

  const { user } = useAuthStore();

  const { iso, country, image, plan, region } = route.params;

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeData, setPromoCodeData] = useState(null);
  const [codeSuccess, setCodeSuccess] = useState(null);
  const [stripeRes, setStripeRes] = useState(null);

  useEffect(() => {
    const uid = user?.id;

    const contactsCollectionRef = collection(
      db,
      "users/" + uid + "/cryptoEvents"
    );
    const q = query(
      contactsCollectionRef,
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const latestDoc = snapshot.docs[0];

      if (latestDoc) {
        setPromoCodeData(null);
        setPromoCode("");
        setPayUrl("");
        navigation.push("PlanConfirmation");

        deleteDoc(latestDoc.ref)
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error deleting document:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setStripeLoading(true);
    initializePaymentSheet().finally(() => setStripeLoading(false));
  }, [promoCodeData]);

  const handleApplyPromoCode = async () => {
    try {
      console.log("promoCode", promoCode);
      const res = await handlePromoCode(user.id, promoCode);

      const { validity, type, receiver, code } = res;

      if (validity.toDate() > new Date()) {
        setPromoCodeData({
          discountType: type,
          discount: receiver,
          validity: validity.toDate(),
          promoCode: code,
        });

        setCodeSuccess({
          isSuccess: true,
          message: `Code successfully applied`,
        });
      } else {
        setPromoCodeData(null);
        setCodeSuccess(null);
      }
    } catch (error) {
      setPromoCodeData(null);
      setCodeSuccess({
        isSuccess: false,
        message: `Enter valid promo code`,
      });
      console.error(`Promo Code Error ${error}`);
    }
  };

  const fetchPaymentSheetParams = async () => {
    let data = {
      iso: iso,
      region: region,
      planID: plan.id,
      channel: Platform.OS === "ios" ? "ios" : "android",
    };

    if (promoCodeData) {
      data = {
        ...data,
        ...promoCodeData,
      };
    }

    const response = await httpsCallable(functions, "checkout")(data);

    return response.data;
  };

  const initializePaymentSheet = async () => {
    try {
      const res = await fetchPaymentSheetParams();

      const { paymentIntent, ephemeralKey, customer, publishableKey } = res;

      setStripeRes(res);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "BroSim, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
      });
    } catch (error) {
      setStripeRes(null);
      alert("Error initializing payment sheet");
      console.error(`Payment Initilzation Error ${error}`);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setPromoCodeData(null);
      setPromoCode("");
      navigation.push("PlanConfirmation");
    }
  };

  const classText = "text-text-5 underline text-xs";

  const privacyUrl = process.env.EXPO_PUBLIC_PRIVACY_URL;
  const termsUrl = process.env.EXPO_PUBLIC_TERMS_URL;

  return (
    <>
      <AnimatedScreen classes="p-0" statusBarColor={"#fff"}>
        <Header headerText="Checkout" />
        <Loader isLoading={isStripeLoading} />

        <ScrollView
          className="p-4 w-full h-max"
          showsVerticalScrollIndicator={false}
        >
          <OrderSummary
            plan={plan}
            image={image}
            country={country}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            handleApplyPromoCode={handleApplyPromoCode}
            codeSuccess={codeSuccess}
            stripeRes={stripeRes}
          />

          <CheckoutDetails
            openNetwork={() => setNetworkModal(true)}
            openDevice={() => setDeviceModal(true)}
          />

          <CustomText classes="text-xs font-bold text-text-2">
            Activation Policy
          </CustomText>
          <CustomText classes="font-medium text-xs text-text-3 truncate">
            The validity periods starts when the SIM connects to any supported
            networks
          </CustomText>
          <View className="w-4 h-4" />
        </ScrollView>
        <View className="relative space-y-2 bottom-0 w-full bg-white rounded-t-2xl p-4">
          <LinearComp>
            <TouchableOpacity
              onPress={() => setSelectPay(true)}
              disabled={!stripeRes?.amount}
              className="rounded-2xl w-full items-center py-4"
            >
              {!stripeRes ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <CustomText classes="">
                  Buy - ${stripeRes?.amount || plan.price || 0}
                </CustomText>
              )}
            </TouchableOpacity>
          </LinearComp>
          <View className="flex-row items-center justify-center">
            <TouchableOpacity onPress={() => Linking.openURL(termsUrl)}>
              <CustomText classes={`${classText} text-bg-5`}>
                Terms of Service
              </CustomText>
            </TouchableOpacity>
            <CustomText classes={"text-text-5"}> & </CustomText>
            <TouchableOpacity onPress={() => Linking.openURL(privacyUrl)}>
              <CustomText classes={`${classText} text-bg-5`}>
                {" "}
                Privacy Policy
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedScreen>

      <CryptoModal handleClose={() => setPayUrl("")} payUrl={payUrl} />

      <SelectPayModal
        open={selectPay}
        handleClose={() => setSelectPay(false)}
        cardPay={openPaymentSheet}
        setPayUrl={setPayUrl}
        metadata={stripeRes?.metadata}
      />

      <Modal
        isVisible={networkModal}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onBackdropPress={() => setNetworkModal(false)}
      >
        <View className="h-[50%]">
          <BottomSheetNetwork handleClose={() => setNetworkModal(false)} />
        </View>
      </Modal>

      <Modal
        isVisible={deviceModal}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onBackdropPress={() => setDeviceModal(false)}
      >
        <View className="h-[50%]">
          <BottomSheetDevice handleClose={() => setDeviceModal(false)} />
        </View>
      </Modal>
    </>
  );
};

export default PlanPurchaseScreen;
