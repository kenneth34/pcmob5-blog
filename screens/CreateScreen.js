import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import axios from "axios";

const API = "https://kennethwong.pythonanywhere.com";
const API_CREATE = "/posts";

export default function CreateScreen({ navigation, route }) {

  const [username, setUsername] = useState('')
  const [title , setTitle] = useState('')
  const [content, setContent] = useState('')

  // useEffect(() => {
  //   setUsername(route.params.username)
  // }, [])

  function savePost(){
    axios
    .post(API + API_CREATE, {
      "author": username,
      "text": content,
      "title": title
    })
    .then(response => {
      console.log(response.data)
      navigation.navigate("posts", { posts: response.data["Data"] })
    })
    .catch(error => {
      if (error.response.status == 400) {
        console.log("Wrong data format")
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Blog</Text>
        <Text style={styles.label}>Enter Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Text style={styles.label}>Enter Content:</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={text => setContent(text)}
        />
        
        <TouchableOpacity onPress={() => navigation.navigate("Account")} style={styles.loginButton}>
        <Text style={styles.buttonText}>Save Blog Post</Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 24,
    padding: 10,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 24,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: "purple",
    width: 180,
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
    height: 40,
  },
  newText: {
    color: "blue",
    height: 30,
  },
});
