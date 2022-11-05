import React from 'react';
import {Text, View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {appStyles} from '../../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const AddVehicle = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          <Text>Dodaj</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddVehicle;
