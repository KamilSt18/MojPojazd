import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

import {appStyles} from '../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});
const Vehicles = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>
        <Text>Pojazdy</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Vehicles;
