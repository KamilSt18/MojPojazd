import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {appStyles} from '../../../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const AlertsTopTab = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          <View>
            <Text>Alerty</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AlertsTopTab;
