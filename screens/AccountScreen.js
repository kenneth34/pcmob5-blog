import React from "react";
import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://kennethwong.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export default function AccountScreen({ navigation }) {

  const [username, setUsername] = useState("");

  async function getUsername() {
    console.log("---- Getting user name ----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      //console.log(response);
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
        }
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      //setUsername("");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();

    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  function Create() {
    navigation.navigate("Create");
  }

  return (
    <View style={commonStyles.container}>
      <Text style={styles.head}>Welcome Back Account</Text>
      <Text style={styles.name}>{username}</Text>
      <Button title="Add Blog" onPress={Create} />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: "red",
    fontSize: 40,
  },
  head: {
    color: "green",
    fontSize: 30,
  },
});
