import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import HomeLogo from '../compos/HomeLogo';

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

function RegisterScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
  const [firstname, setFirstName] = React.useState<string>('');
  const [lastname, setLastName] = React.useState<string>('');
  const [mail, setMail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmpassword, setConfirmPassword] = React.useState<string>('');
  const [secure, setSecure] = React.useState<boolean>(true);

  const handleSubmit = () => {}
  return (
    <View>
      <HomeLogo />
      <View>
          <TextInput style={{ marginTop:20, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={firstname} onChangeText={setFirstName} placeholder='First Name' />
          <TextInput style={{ marginTop:10, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={lastname} onChangeText={setLastName} placeholder='Last Name' />
          <TextInput style={{ marginTop:10, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={mail} onChangeText={setMail} placeholder='Email' />
          <TextInput secureTextEntry={secure} style={{ marginTop:10, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={password} onChangeText={setPassword} placeholder='Password' />
          <TextInput secureTextEntry={secure} style={{ marginTop:10, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={confirmpassword} onChangeText={setConfirmPassword} placeholder='Confirm Password' />
          <View style={{ width:70 , marginLeft:65, marginTop:15 }}>
              <Button color="orange" title="Register" onPress={handleSubmit} />
          </View>
      </View>
    </View>
  );
}

export default RegisterScreen;