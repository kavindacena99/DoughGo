import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import HomeLogo from "../compos/HomeLogo";
import API from "../services/api";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

function RegisterScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [secure, setSecure] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (password !== confirmpassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await API.post("/customer/registercustomer", {
        firstname,
        lastname,
        phonenumber,
        address,
        email: mail,
        password,
      });

      setMessage(response.data.message || "Registered successfully!");
      navigation.navigate("Home");
    } catch (err: any) {
      console.error("Registration error:", err);
      setMessage(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <View style={styles.container}>
      <HomeLogo />
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={mail}
        onChangeText={setMail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={phonenumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={secure}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={secure}
        value={confirmpassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
      />
      <View style={styles.buttonContainer}>
        <Button color="orange" title="Register" onPress={handleSubmit} />
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 40 },
  input: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  buttonContainer: { width: 100, alignSelf: "center", marginTop: 20 },
  message: { marginTop: 15, textAlign: "center", color: "red" },
});

export default RegisterScreen;
