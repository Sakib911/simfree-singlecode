import React, { useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView, StatusBar } from "react-native";

const AnimatedScreen = ({
  children,
  classes = "",
  statusBarColor = "#F6F6F6",
}) => {
  const viewRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      viewRef.current?.fadeIn?.(500);
    }, [])
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={statusBarColor} />

      <SafeAreaView style={{ flex: 1, backgroundColor: statusBarColor }}>
        <Animatable.View
          ref={viewRef}
          animation="fadeIn"
          className={`flex h-full p-4 items-center w-screen bg-bg-2 ${classes}`}
        >
          {children}
        </Animatable.View>
      </SafeAreaView>
    </>
  );
};

export default AnimatedScreen;
