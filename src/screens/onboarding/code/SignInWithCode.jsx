import React, { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, Clipboard } from 'react-native';
import { AnimatedScreen, CustomText, Header, LinearComp } from '../../../components';
import { signInWithCode } from '../../../services/FirebaseAuthManager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuthStore } from '../../../store';

const SignInWithCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuthStore();

  const handleSignIn = async () => {
    if (!code) {
      setError('Please enter a code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userData = await signInWithCode(code.toUpperCase());
      updateUser(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardContent = await Clipboard.getString();
      setCode(clipboardContent.toUpperCase());
    } catch (error) {
      setError('Failed to paste code');
    }
  };

  return (
    <AnimatedScreen classes="p-0" statusBarColor={"#fff"}>
      <Header headerText="Sign In with Code" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Add consistent padding around the entire screen */}
        <View className="flex-1 p-6">
          {/* Input Section */}
          <View className="flex-1 justify-center">
            <TextInput
              className="bg-white w-full h-14 rounded-2xl px-4 text-lg font-bold text-center"
              placeholder="Enter your code"
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
              maxLength={8}
            />
            <TouchableOpacity
              onPress={handlePaste}
              className="mt-4 items-center"
            >
              <CustomText classes="text-blue-500 font-bold">Paste</CustomText>
            </TouchableOpacity>

            {error && (
              <CustomText classes="text-red-500 text-center mt-4">
                {error}
              </CustomText>
            )}
          </View>

          {/* Button Section */}
          <View className="w-full">
            <LinearComp>
              <TouchableOpacity
                onPress={handleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center h-14 rounded-2xl"
              >
                <CustomText classes="font-bold text-base">
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </CustomText>
              </TouchableOpacity>
            </LinearComp>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AnimatedScreen>
  );
};

export default SignInWithCode;
