import React, { useState } from 'react';
import { View, TouchableOpacity, Clipboard } from 'react-native';
import { AnimatedScreen, CustomText, Header, LinearComp } from '../../../components';
import { generateSignupCode } from '../../../services/FirebaseAuthManager';
import Toast from 'react-native-toast-message';

const SignUpWithCode = ({ navigation }) => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCode = async () => {
    setIsLoading(true);
    try {
      const code = await generateSignupCode();
      setGeneratedCode(code);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error generating code',
        text2: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    Clipboard.setString(generatedCode);
    Toast.show({
      type: 'success',
      text1: 'Code copied to clipboard'
    });
  };

  return (
    <AnimatedScreen classes="p-0" statusBarColor={"#fff"}>
      <Header headerText="Sign Up with Code" />

      <View className="flex-1 p-4 items-center justify-center">
        {!generatedCode ? (
          <LinearComp>
            <TouchableOpacity
              onPress={handleGenerateCode}
              disabled={isLoading}
              className="w-full flex items-center justify-center h-14 rounded-2xl"
            >
              <CustomText classes="font-bold text-base p-2">
                {isLoading ? 'Generating...' : 'Generate Code'}
              </CustomText>
            </TouchableOpacity>
          </LinearComp>
        ) : (
          <View className="items-center space-y-6">
            <View className="bg-white p-6 rounded-xl">
              <CustomText classes="text-2xl font-bold">{generatedCode}</CustomText>
            </View>

            <LinearComp>
              <TouchableOpacity
                onPress={handleCopyCode}
                className="w-full flex items-center justify-center h-14 rounded-2xl"
              >
                <CustomText classes="font-bold text-base p-2">Copy Code</CustomText>
              </TouchableOpacity>
            </LinearComp>

            <TouchableOpacity onPress={() => navigation.navigate('SignInWithCode')} classes="mt-2">
              <CustomText classes="text-bg-5 font-medium text-base ">
                Sign in with code
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </AnimatedScreen>
  );
};

export default SignUpWithCode;