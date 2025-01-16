import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <View
      className={`absolute bg-black/50 w-screen h-screen justify-center items-center`}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default Loader;
