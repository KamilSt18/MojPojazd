import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {appStyles} from '../../../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const StatisticsTopTab = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          <View>
            <Text>Statystyki</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default StatisticsTopTab;
