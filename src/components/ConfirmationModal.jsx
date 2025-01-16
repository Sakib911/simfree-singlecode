import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import LinearComp from "./LinearComp";

const ConfirmationModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  visible = false,
}) => {
  const handleClose = () => {
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal isVisible={visible}>
      <View className="flex items-center justify-center p-4 w-full h-full">
        <View className="bg-white rounded-2xl p-4">
          <Text className="text-xl font-bold mb-4">{title}</Text>
          <Text className="text-base mb-8">{message}</Text>
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={handleClose}
              className="px-4 py-2 bg-gray-200 rounded-2xl"
            >
              <Text className="text-gray-700 text-base font-bold">Cancel</Text>
            </TouchableOpacity>
            <LinearComp width="max-content">
              <TouchableOpacity
                onPress={handleConfirm}
                className="px-4 py-2 rounded-2xl"
              >
                <Text className="text-base font-bold">Confirm</Text>
              </TouchableOpacity>
            </LinearComp>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
