import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Register Page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
