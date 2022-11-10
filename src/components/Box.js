import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {appStyles} from '../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const Box = ({children, marginVertical = null}) => {
  return <View style={[styles.section, {marginVertical: marginVertical}]}>{children}</View>;
};

export default Box;
