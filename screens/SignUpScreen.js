import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import axios from "axios";

const API = "https://kennethwong.pythonanywhere.com";
const API_SIGNUP = "/newuser";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  function signup() {
    console.log("---- Signup time ----");
    Keyboard.dismiss();

    try {
      axios.post(API + API_SIGNUP, {
        username,
        password,
      });
      console.log("Success sign up!");
      navigation.navigate("SignIn");
    } catch (error) {
      console.log("User already exists");
      console.log(error.response);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Page</Text>
      <Text style={styles.fieldTitle}>Username</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
        keyboardType="email-address"
        value={username}
        onChangeText={(input) => setUsername(input)}
      />
      <Text style={styles.fieldTitle}>Password</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="password"
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={(input) => setPassword(input)}
      />
      <TouchableOpacity onPress={signup} style={styles.signUpButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "whitesmoke",
  },
  signUpButton: {
    backgroundColor: "brown",
    width: "60%",
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
  },
});
