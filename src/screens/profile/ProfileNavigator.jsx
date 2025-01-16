import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import {EditProfile, ChangePassword} from "../../components";

const ProfileStack = createStackNavigator();

const ProfileNavigator = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Welcome"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
