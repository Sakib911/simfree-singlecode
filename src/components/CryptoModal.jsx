import { TouchableOpacity, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import Modal from "react-native-modal";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const CryptoModal = ({ payUrl, handleClose }) => {
  return (
    <Modal
      isVisible={!!payUrl}
      onBackdropPress={handleClose}
      style={{
        margin: 0,
      }}
    >
      <View className="h-full w-full bg-white">
        <TouchableOpacity onPress={handleClose} className="p-4">
          <View className={""}>
            <FontAwesomeIcon size={20} icon={faChevronLeft} />
          </View>
        </TouchableOpacity>
        <WebView source={{ uri: payUrl }} style={{ flex: 1 }} />
      </View>
    </Modal>
  );
};

export default CryptoModal;
