import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Loginscreen";
import RegisterScreen from "./Screens/Registerscreen";
import OtpAnimationScreen from "./Screens/OtpAnimationScreen";
import WelcomeScreen from "./Screens/welcomescreen";
import DashboardScreen from "./Screens/Dashboardscreen";
import FinancialNewsScreen from "./Screens/news";
import RecommendationScreen from "./Screens/RecommendationScreen";
import DetailsScreen from "./Screens/DetailsScreen";
import StockOrderScreen from "./Screens/stockorderscree";
import UserDashboard from "./Screens/Learningstream";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="News" component={FinancialNewsScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpAnimationScreen"
          component={OtpAnimationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HDFCBANK"
          component={StockOrderScreen}
          options={{
            headerTitle: "HDFCBANK",
            headerRight: () => (
              <Text
                style={{ marginRight: 15, fontSize: 16, fontWeight: "bold" }}
              >
                ₹1600
              </Text>
            ),
          }}
        />
        <Stack.Screen name="Recommendation" component={RecommendationScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
