import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Image, StatusBar,View, Text, StyleSheet, Button } from 'react-native';

type RootStackParamList = {
    Login: undefined;
    // add other routes here if needed
};

function HomeScreen(){
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={ require('../../assets/logo/logo.jpg') } resizeMode='contain' />
            <Text style={styles.header}>Welcome to DoughGo</Text>
            <View>
                <Button title='Login' onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            alignItems:'center',
        },
        logo:{
            width: 350,
            height: 350,
            marginTop: 150,
            borderRadius: 75
        },
        header:{
            fontSize:40,
            fontWeight:'bold',
            color:'#e98621',
            marginTop: 20,
        }
    }
);

export default HomeScreen;


/*

