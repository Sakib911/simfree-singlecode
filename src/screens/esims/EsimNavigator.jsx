import { createStackNavigator } from "@react-navigation/stack";
import EsimsScreen from "./EsimsScreen";
import EsimsDetailScreen from "./EsimsDetailScreen";
import PlanScreen from "../home/plans/PlanScreen";
import PlanPurchaseScreen from "../home/plans/PlanPurchaseScreen";
import PlanConfirmationScreen from "../home/plans/PlanConfirmationScreen";

const EsimStack = createStackNavigator();

const EsimNavigator = ({ navigation }) => {
  return (
    <EsimStack.Navigator>
      <EsimStack.Screen
        name="EsimHome"
        component={EsimsScreen}
        options={{ headerShown: false }}
      />
      <EsimStack.Screen
        name="EsimDetails"
        component={EsimsDetailScreen}
        options={{ headerShown: false }}
      />
      <EsimStack.Screen
        name="Plan"
        component={PlanScreen}
        options={{ headerShown: false }}
      />
      <EsimStack.Screen name="PlanPurchase" options={{ headerShown: false }}>
        {(props) => (
          <PlanPurchaseScreen {...props} tabNavigation={navigation} />
        )}
      </EsimStack.Screen>
      <EsimStack.Screen
        name="PlanConfirmation"
        options={{ headerShown: false }}
      >
        {(props) => (
          <PlanConfirmationScreen {...props} tabNavigation={navigation} />
        )}
      </EsimStack.Screen>
    </EsimStack.Navigator>
  );
};

export default EsimNavigator;
