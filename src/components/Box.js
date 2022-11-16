import React from 'react';
import {View, StyleSheet} from 'react-native';

import {appStyles} from '../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const Box = ({
  children,
  marginVertical = null,
  margin = null,
  marginTop = null,
}) => {
  return (
    <View style={[styles.section, {marginVertical, margin, marginTop}]}>
      {children}
    </View>
  );
};

export default Box;
