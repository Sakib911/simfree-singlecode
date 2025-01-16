import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store";
import { LinearComp, Loader, CustomText, AnimatedScreen } from "./index";

const OnboardingComp = ({
  fieldName,
  headText,
  placeholder,
  inputText,
  linkText,
  linkBtnText,
  handleSubmit,
  btnText,
  loading,
  handleLinkBtn,
  error,
}) => {
  const navigation = useNavigation();
  const { onboardedUser, setOnboardedUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState("");

  const borderAnimation = new Animated.Value(0);

  const animateBorder = (toValue) => {
    Animated.timing(borderAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animateBorder(1);
    setValidationError(""); // Clear validation error on focus
  };

  const handleBlur = () => {
    setIsFocused(false);
    animateBorder(0);
    validateField(); // Validate on blur
  };

  const validateField = () => {
    if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!onboardedUser.email) {
        setValidationError("Email is required");
      } else if (!emailRegex.test(onboardedUser.email)) {
        setValidationError("Please enter a valid email address");
      } else {
        setValidationError("");
      }
    } else if (fieldName === "password") {
      if (!onboardedUser.password) {
        setValidationError("Password is required");
      } else if (onboardedUser.password.length < 8) {
        setValidationError("Password must be at least 8 characters long");
      } else {
        setValidationError("");
      }
    }
  };

  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [(error || validationError) ? '#FF3B30' : '#BDBDBD', '#007AFF']
  });

  const getPasswordStrength = (password) => {
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    return {
      strength,
      message: strength < 2 ? "Weak" : strength < 4 ? "Medium" : "Strong",
      color: strength < 2 ? "#FF3B30" : strength < 4 ? "#FF9500" : "#34C759"
    };
  };

 const getInputProps = () => {
   const baseProps = {
     onFocus: handleFocus,
     onBlur: handleBlur,
     value: onboardedUser[fieldName],
     onChangeText: (text) => {
       setOnboardedUser({ ...onboardedUser, [fieldName]: text });
       setValidationError(""); // Clear validation error while typing
       // Dynamically validate field as the user types
       if (fieldName === "email") {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!text) {
           setValidationError("Email is required");
         } else if (!emailRegex.test(text)) {
           setValidationError("Please enter a valid email address");
         } else {
           setValidationError("");
         }
       } else if (fieldName === "password") {
         if (!text) {
           setValidationError("Password is required");
         } else if (text.length < 8) {
           setValidationError("Password must be at least 8 characters long");
         } else {
           setValidationError("");
         }
       }
     },
   };

   if (fieldName === "email") {
     return {
       ...baseProps,
       keyboardType: "email-address",
       autoCapitalize: "none",
       autoComplete: "email",
       autoCorrect: false,
     };
   }

   if (fieldName === "password") {
     return {
       ...baseProps,
       secureTextEntry: !showPassword,
       autoCapitalize: "none",
       autoComplete: "password",
       autoCorrect: false,
     };
   }

   return baseProps;
 };


  return (
    <AnimatedScreen classes="space-y-6 relative">
      {/* Back Button */}
      <View className="w-full items-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-5 w-10 h-10"
        >
          <FontAwesomeIcon size={20} icon={faChevronLeft} />
        </TouchableOpacity>
      </View>

      {/* Header Text */}
      <CustomText classes="font-bold text-xl text-text-1">
        {headText}
      </CustomText>

      {/* Input Container */}
      <View className="relative w-full">
        <Animated.View
          style={[
            styles.inputContainer,
            { borderColor: borderColor }
          ]}
        >
          <TextInput
            className="text-2xl font-bold w-full h-14 text-bg-4 p-2 text-center"
            placeholder={placeholder}
            placeholderTextColor="#BDBDBD"
            {...getInputProps()}
          />

          {fieldName === "password" && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Error Messages */}
        {(error || validationError) && (
          <CustomText classes="text-red-500 text-sm mt-2 text-center">
            {error || validationError}
          </CustomText>
        )}

        {/* Password Strength Indicator */}
        {fieldName === "password" && onboardedUser.password && !validationError && (
          <View style={styles.passwordStrengthContainer}>
            <CustomText classes="text-sm text-gray-600">
              Strength: {getPasswordStrength(onboardedUser.password)?.message}
            </CustomText>
            <View style={styles.strengthBar}>
              <Animated.View
                style={[
                  styles.strengthIndicator,
                  {
                    width: `${(getPasswordStrength(onboardedUser.password)?.strength / 5) * 100}%`,
                    backgroundColor: getPasswordStrength(onboardedUser.password)?.color
                  }
                ]}
              />
            </View>
          </View>
        )}
      </View>

      {/* Input Description */}
      <CustomText classes="font-medium text-sm text-center text-text-2">
        {inputText}
      </CustomText>

      {/* Link Section */}
      <View className="flex flex-row items-center">
        <CustomText classes="text-xs font-medium">
          {linkText}
        </CustomText>
        <TouchableOpacity onPress={handleLinkBtn}>
          <CustomText classes="text-xs font-medium text-bg-5 ml-2">
            {linkBtnText}
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <View className="absolute w-full items-end justify-end bottom-4">
        <LinearComp>
          <TouchableOpacity
            className="flex justify-center w-full h-14 rounded-xl"
            onPress={handleSubmit}
            disabled={loading || !!error || !!validationError}
          >
            <CustomText
              classes={`font-bold text-lg text-center ${
                loading || error || validationError ? 'text-gray-400' : 'text-bg-4'
              }`}
            >
              {btnText}
            </CustomText>
          </TouchableOpacity>
        </LinearComp>
      </View>

      <Loader loading={loading} />
    </AnimatedScreen>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderBottomWidth: 2,
    borderRadius: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  passwordStrengthContainer: {
    marginTop: 8,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  strengthIndicator: {
    height: '100%',
    borderRadius: 2,
  }
});

export default OnboardingComp;
