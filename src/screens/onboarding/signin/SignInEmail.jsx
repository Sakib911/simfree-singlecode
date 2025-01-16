// SignInEmail.jsx
import React, { useState } from "react";
import { OnboardingComp } from "../../../components";
import { useAuthStore } from "../../../store";
import { emailRegex } from "../../../utils";

const SignInEmail = ({ navigation }) => {
  const { onboardedUser } = useAuthStore();
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleNext = () => {
    const validationError = validateEmail(onboardedUser.email);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    navigation.push("SignInPassword");
  };

  const handleLinkBtn = () => {
    navigation.navigate("SignUpEmail");
  };

  return (
    <OnboardingComp
      fieldName="email"
      headText="What's your Email?"
      placeholder="Enter your email address"
      inputText="Sign in with your email address"
      linkText="Don't have an account?"
      linkBtnText="Sign Up"
      handleSubmit={handleNext}
      btnText="Next"
      handleLinkBtn={handleLinkBtn}
      error={error}
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
    />
  );
};

export default SignInEmail;


