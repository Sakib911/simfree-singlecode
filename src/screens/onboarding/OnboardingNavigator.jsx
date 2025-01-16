import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./WelcomeScreen";
import SplashScreen from "./SplashScreen";
import React from "react";
import SignUpEmail from "./signup/SignUpEmail";
import SignInEmail from "./signin/SignInEmail";
import SignUpPassword from "./signup/SignUpPassword";
import SignInPassword from "./signin/SignInPassword";
import SignUpWithCode from "./code/SignUpWithCode";
import SignInWithCode from "./code/SignInWithCode";

const OnboardingStack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="SignInEmail"
        component={SignInEmail}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="SignInPassword"
        component={SignInPassword}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="SignUpEmail"
        component={SignUpEmail}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="SignUpPassword"
        component={SignUpPassword}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="SignUpWithCode"
        component={SignUpWithCode}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="SignInWithCode"
        component={SignInWithCode}
        options={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;