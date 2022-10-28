import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const TextButton = ({label, TouchableOpacityProps = {}, TextProps = {}}) => {
  return (
    <TouchableOpacity {...TouchableOpacityProps}>
      <Text {...TextProps}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
