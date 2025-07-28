import "./global.css";
import { View, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ItemsScreen from "./screens/ItemsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <StatusBar 
        backgroundColor="orange"
        barStyle={"dark-content"}
        hidden={false}
      />

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: true, title: 'Login' }} 
        />

        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: true, title: 'Register' }}
        />

        <Stack.Screen 
          name="Items" 
          component={ItemsScreen} 
          options={{ headerShown: false, title: 'Item' }}
        />

        <Stack.Screen name="Checkout" component={CheckoutScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
