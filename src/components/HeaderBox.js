import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {appStyles} from '../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const HeaderBox = ({title}) => {
  return (
    <View style={styles.section}>
      <Text
        style={[styles.formatText, {textAlign: 'center'}, styles.shadowText]}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderBox;
