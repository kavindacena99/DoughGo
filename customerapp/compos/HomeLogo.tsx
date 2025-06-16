import { Image, StatusBar,View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    Items: undefined;
};

function HomeLogo() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <View>
          <View>
            <Text onPress={() => navigation.navigate('Items')} style={{ marginTop:80, marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
          </View>
          <Text style={{ marginTop:5, marginLeft:65, color:"black", fontSize:25, fontWeight:300 }}>Welcome to DoughGo!</Text>
      </View>
    </View>
  );
}

export default HomeLogo;