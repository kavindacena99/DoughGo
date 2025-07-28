import { Image, StatusBar,View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import HomeLogo from '../compos/HomeLogo';
import API from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home:undefined;
    Items: undefined;
};

function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [secure, setSecure] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>('');

  const handleSubmit = async () => {
  try {
    const response = await API.post('/customer/logincustomer', { email, password });
    const { token, customer } = response.data;

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("customer", JSON.stringify(customer)); 

    navigation.navigate("Items");
  } catch (err) {
    setMessage('Login failed. Please check your credentials.');
  }
};


  return (
    <View>
      <HomeLogo />
      <View>
          <TextInput style={{ marginTop:20, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={email} onChangeText={setEmail} placeholder='username or email' />
          <TextInput secureTextEntry={secure} style={{ marginTop:10, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={password} onChangeText={setPassword} placeholder='password' />
          <View style={{ width:70 , marginLeft:65, marginTop:15 }}>
              <Button color="orange" title="Login" onPress={handleSubmit} />
          </View>
      </View>
      <View style={{ marginLeft:65, marginTop:15, flexDirection:"row" }}>
          <Text style={{ fontSize:20 }}>Don't have an account?</Text>
          <View style={{ marginLeft:10 }}><Button color="orange" title='Register' onPress={() => navigation.navigate('Register')} /></View>
      </View>
    </View>
  );
}

export default LoginScreen;