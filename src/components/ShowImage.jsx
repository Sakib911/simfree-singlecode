import React from "react";
import { Image } from "react-native";

const ShowImage = ({ imageName, classes }) => {
  const getImage = () => {
    switch (imageName) {
      case "timerIcon":
        return require("../../assets/image/timerIcon.png");
      case "appleWhite":
        return require("../../assets/image/appleWhite.png");
      case "googleIcon":
        return require("../../assets/image/googleIcon.png");
      case "profileIcon":
        return require("../../assets/image/profile.png");
      case "TermsIcon":
        return require("../../assets/image/TermsIcon.png");
      case "msgIcon":
        return require("../../assets/image/msgIcon.png");
      case "helpIcon":
        return require("../../assets/image/helpIcon.png");
      case "languageIcon":
        return require("../../assets/image/languageIcon.png");
      case "privacyIcon":
        return require("../../assets/image/privacyIcon.png");
      case "shareIcon":
        return require("../../assets/image/shareIcon.png");
      case "delIcon":
        return require("../../assets/image/delIcon.png");
      case "editIcon":
        return require("../../assets/image/editIcon.png");
      case "walletIcon":
        return require("../../assets/image/walletIcon.png");
      case "device":
        return require("../../assets/image/device.png");
      case "network":
        return require("../../assets/image/network.png");
      case "planType":
        return require("../../assets/image/planType.png");
      case "topup":
        return require("../../assets/image/topup.png");
      case "signal":
        return require("../../assets/image/signal.png");
      case "EmptyIcon":
        return require("../../assets/image/emptyCartIcon.png");
      case "referImage":
        return require("../../assets/image/referImage.png");
      default:
        return require("../../assets/image/timerIcon.png");
    }
  };
  return <Image source={getImage()} className={`${classes || ""}`} />;
};

export default ShowImage;
