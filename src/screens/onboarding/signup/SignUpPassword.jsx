
// SignUpPassword.jsx
import React, { useState } from "react";
import { useAuthStore } from "../../../store";
import { createUserWithEmailPass } from "../../../services/FirebaseAuthManager";
import { OnboardingComp } from "../../../components";

const SignUpPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateUser, onboardedUser } = useAuthStore();

  const validatePassword = (password) => {
    if (!password || password.trim() === "") {
      return "Password is required";
    }
    if (password.length < 5) {
      return "Password must be at least 5 characters long";
    }
    return "";
  };

  const handleNext = async () => {
    const validationError = validatePassword(onboardedUser.password);

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      email: onboardedUser.email,
      admin: false,
    };

    await createUserWithEmailPass(
      onboardedUser.email,
      onboardedUser.password,
      data,
      (response, success) => {
        if (success) {
          updateUser(response);
        } else {
          setError(typeof response === 'string' ? response : "An error occurred during sign up");
        }
        setLoading(false);
      }
    );
  };

  const handleLinkBtn = () => {
    navigation.navigate("SignInEmail");
  };

  const getPasswordStrength = (password) => {
    if (!password) return "";

    let strength = 0;
    if (password.length >= 5) strength++;
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

  return (
    <OnboardingComp
      fieldName="password"
      headText="Insert your Password"
      placeholder="Password"
      inputText="Insert secure password linked to your account"
      linkText="Already have an account?"
      linkBtnText="Sign In"
      handleSubmit={handleNext}
      btnText="Sign Up"
      loading={loading}
      handleLinkBtn={handleLinkBtn}
      error={error}
      secureTextEntry={true}
      autoCapitalize="none"
      passwordStrength={getPasswordStrength(onboardedUser.password)}
      helperText="Password must be at least 5 characters long"
    />
  );
};

export default SignUpPassword;
