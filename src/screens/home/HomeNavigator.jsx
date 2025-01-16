import { createStackNavigator } from "@react-navigation/stack";
import PlanScreen from "./plans/PlanScreen";
import PlanConfirmationScreen from "./plans/PlanConfirmationScreen";
import PlanPurchaseScreen from "./plans/PlanPurchaseScreen";
import HomeScreen from "./HomeScreen";
import ReferFriend from "../referFriend";

const HomeStack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome" options={{ headerShown: false }}>
        {(props) => <HomeScreen {...props} tabNavigation={navigation} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Plan"
        component={PlanScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="PlanPurchase" options={{ headerShown: false }}>
        {(props) => (
          <PlanPurchaseScreen {...props} tabNavigation={navigation} />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="PlanConfirmation"
        options={{ headerShown: false }}
      >
        {(props) => (
          <PlanConfirmationScreen {...props} tabNavigation={navigation} />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="ReferFriend"
        component={ReferFriend}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
