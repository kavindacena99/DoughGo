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
          <Text style={{ marginTop:80, marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
          <View style={{ flexDirection:"row" }}>
            <Text style={{ marginTop:5, marginLeft:65, color:"black", fontSize:25, fontWeight:300 }}>Welcome to DoughGo!</Text>
            <Button color="orange" title='Explore' onPress={() => navigation.navigate('Items')} />
          </View>
      </View>
    </View>
  );
}

export default HomeLogo;