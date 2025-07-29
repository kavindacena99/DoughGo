import React, { useState } from 'react';
import API from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [accessCode, setAccessCode] = useState<string>('');



  const handleLogin = async () => {
    /*
    try{
      const response = await API.post("/driver/logindriver", { accessCode });
      const { token, driver } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("driver", JSON.stringify(driver));
      navigation.navigate('Home');

    }catch(error){

    }
    */
    if (accessCode === '123456' || accessCode === '12321') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid Code', 'Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
      <Text style={styles.title}>🚚 Driver Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Access Code"
        placeholderTextColor="#aaa"
        value={accessCode}
        onChangeText={setAccessCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    paddingHorizontal: 24,
  } as ViewStyle,

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 40,
  } as TextStyle,

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  } as ViewStyle,

  button: {
    backgroundColor: "orange",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  } as ViewStyle,

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
});
