import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

import {appStyles} from '../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});
const Settings = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>
        <Text>Ustawienia</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
