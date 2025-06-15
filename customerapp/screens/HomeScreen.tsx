import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Image, StatusBar,View, Text, StyleSheet, Button, TextInput } from 'react-native';
import LoginScreen from './LoginScreen';

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

function HomeScreen(){
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [name, setName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [secure, setSecure] = React.useState<boolean>(true);

    const handleSubmit = () => {}

    return(
        <View>
            <LoginScreen />
            <Text style={{ marginTop:80, marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
            <Text style={{ marginTop:5, marginLeft:65, color:"black", fontSize:25, fontWeight:300 }}>Welcome to DoughGo!</Text>
            <View>
                <TextInput style={{ marginTop:20, marginLeft:65, marginRight:20, borderBottomColor:"black", borderWidth:1, borderRadius:5 }} value={name} onChangeText={setName} placeholder='username or email' />
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

export default HomeScreen;

