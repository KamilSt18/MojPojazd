import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ADDITIONAL_COLORS} from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 16,
    margin: 15,
    textAlign: 'center',
  },
  mainText: {
    color: ADDITIONAL_COLORS.TEXT.PRIMARY,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

const TextButton = ({
  label,
  TouchableOpacityProps = {},
  ViewProps = {},
  sign = false,
  onPress = null,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      {...TouchableOpacityProps}
      activeOpacity={0.5}>
      <View style={[styles.container, ...ViewProps]}>
        <View />
        <Text style={styles.mainText}>{label}</Text>
        <View>
          {sign && (
            <Icon
              name="angle-right"
              size={20}
              color={ADDITIONAL_COLORS.TEXT.PRIMARY}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;
