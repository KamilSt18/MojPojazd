import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {appStyles} from '../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const TextBox = ({title, important = false, children = null}) => {
  return (
    <Text
      style={[
        styles.formatText,
        styles.shadowText,
        important && styles.importantText,
      ]}>
      {title}
      {children}
    </Text>
  );
};

export default TextBox;
