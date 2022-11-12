import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {appStyles} from '../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const Box = ({children, marginVertical = null, margin = null}) => {
  return <View style={[styles.section, {marginVertical: marginVertical, margin}]}>{children}</View>;
};

export default Box;
