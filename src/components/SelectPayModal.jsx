import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { LinearComp, CustomText } from "./index";
import Modal from "react-native-modal";
import { functions } from "../../firebaseConfig";
import { httpsCallable } from "firebase/functions";

const SelectPayModal = ({
  open,
  handleClose,
  cardPay,
  setPayUrl,
  metadata,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const createPayment = await httpsCallable(
        functions,
        "createCryptomusPayment"
      )(metadata);

      const url = createPayment?.data?.result?.url || "";

      if (url) {
        setPayUrl(url);
      } else {
        alert("Something went wrong, please try again");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setPayUrl("");
      alert("Something went wrong, please try again");
      console.error("Error creating payment:", error);
    }
    handleClose();
  };

  const buttons = [
    {
      name: "Pay with card",
      handleClick: () => {
        cardPay();
        handleClose();
      },
    },
    {
      name: "Pay with crypto",
      handleClick: handlePayment,
    },
    {
      name: "Cancel",
      handleClick: handleClose,
    },
  ];

  return (
    <Modal isVisible={open} onBackdropPress={handleClose}>
      <View className="bg-white rounded-3xl p-4 ">
        {buttons.map((v, i) => (
          <LinearComp key={i} classes={"mt-4"}>
            <TouchableOpacity
              onPress={v.handleClick}
              className="rounded-2xl w-full items-center py-4"
              disabled={isLoading}
            >
              <CustomText classes="">{v.name}</CustomText>
            </TouchableOpacity>
          </LinearComp>
        ))}
      </View>
    </Modal>
  );
};

export default SelectPayModal;
