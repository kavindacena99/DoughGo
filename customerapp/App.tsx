import "./global.css";
import { View, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View>
      <StatusBar 
        backgroundColor="orange"
        barStyle={"dark-content"}
        hidden={false}
      />
      <HomeScreen />
    </View>
  );
}
