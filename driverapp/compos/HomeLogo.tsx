import { View, Text } from 'react-native';

function HomeLogo() {
  return (
    <View>
      <View>
          <Text style={{ marginTop:80, marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
          <Text style={{ marginTop:5, marginLeft:65, color:"black", fontSize:25, fontWeight:300 }}>Welcome to DoughGo!</Text>
      </View>
    </View>
  );
}

export default HomeLogo;