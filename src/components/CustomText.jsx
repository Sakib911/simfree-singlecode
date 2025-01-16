import React from "react";
import { Text } from "react-native";

const CustomText = ({ children, classes = "", ...rest }) => {
  return (
    <Text
      className={`text-bg-4 font-medium ${classes}`}
      {...rest}
      style={{
        fontFamily: "generalRegular !important",
        // fontFamily: "General Sans",
      }}
    >
      {children}
    </Text>
  );
};

export default CustomText;
