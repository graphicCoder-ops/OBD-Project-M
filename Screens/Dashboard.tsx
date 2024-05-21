import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Page!</Text>
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

export default DashboardScreen;
