// SignUpEmail.jsx
import React, { useState } from "react";
import { useAuthStore } from "../../../store";
import { OnboardingComp } from "../../../components";
import { emailRegex } from "../../../utils";

const SignUpEmail = ({ navigation }) => {
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
    navigation.push("SignUpPassword");
  };

  const handleLinkBtn = () => {
    navigation.navigate("SignInEmail");
  };

  return (
    <OnboardingComp
      fieldName="email"
      headText="What's your Email?"
      placeholder="Email"
      inputText="Let's create an account with your email address"
      linkText="Already have an account?"
      linkBtnText="Sign In"
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

export default SignUpEmail;
