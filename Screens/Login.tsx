import React, { useState } from 'react';
import {API} from '../Utilities/utility';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };
    try {
        const response = await fetch(API + '/auth/login',requestOptions);
      console.log(await response.status);
      if(response.ok){
        // temporary
        navigation.navigate('Dashboard');
        // navigation.reset({
        // index: 0,
        // routes: [{ name: 'Dashboard' }],
        // });
      }
    } catch (error) {
        console.log(error);
    }
  };
  const handleRegisterPage = () =>{
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text>OR</Text>
      <Button title="Register" onPress={handleRegisterPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default LoginScreen;
