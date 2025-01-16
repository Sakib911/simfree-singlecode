// SignUpPassword.jsx
import React, { useState } from "react";
import { useAuthStore } from "../../../store";
import { signinWithEmailPass } from "../../../services/FirebaseAuthManager";
import { OnboardingComp } from "../../../components";

const SignUpPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateUser, onboardedUser } = useAuthStore();

  const validatePassword = (password) => {
    if (!password || password.trim() === "") {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Password must contain at least one letter";
    }
    return "";
  };

  const handleNext = async () => {
    const validationError = validatePassword(onboardedUser.password);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signinWithEmailPass(
        onboardedUser.email,
        onboardedUser.password,
        (userData, success) => {
          if (success) {
            updateUser(userData);
          } else {
            const errorMessage = typeof userData === 'string'
              ? userData
              : "An error occurred during sign in";
            setError(errorMessage);
          }
        }
      );
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkBtn = () => {
    navigation.navigate("SignUpEmail");
  };

  const getPasswordStrength = (password) => {
    if (!password) return "";

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

  return (
    <OnboardingComp
      fieldName="password"
      headText="Insert your Password"
      placeholder="Enter your password"
      inputText="Insert secure password linked to your account"
      linkText="Don't have an account?"
      linkBtnText="Sign Up"
      handleSubmit={handleNext}
      btnText="Sign In"
      loading={loading}
      handleLinkBtn={handleLinkBtn}
      error={error}
      secureTextEntry={true}
      autoCapitalize="none"
      passwordStrength={getPasswordStrength(onboardedUser.password)}
      helperText="Password must be at least 6 characters long and contain both letters and numbers"
    />
  );
};

export default SignUpPassword;