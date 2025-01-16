import React from "react";
import LinearGradient from "react-native-linear-gradient";

const LinearComp = ({ children, width = "100%", classes }) => {
  return (
    <LinearGradient
      colors={["#FED98F", "#FFCA5F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className={`w-max h-max ${classes}`}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        width: width,
        height: "max-content",
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearComp;
