import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Workout = () => {
  return (
    <View style={styles.container}>
      <Text>Workout Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Workout;