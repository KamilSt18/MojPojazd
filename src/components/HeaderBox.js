import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {appStyles} from '../styles/constants';
import {ADDITIONAL_COLORS} from '../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {alignSelf: 'center'},
  headerText: {textAlign: 'center', marginHorizontal: 10},
});

const HeaderBox = ({
  title,
  icon = null,
  fontSize = 15,
  marginVertical = null,
}) => {
  return (
    <View style={[styles.section, {marginVertical}]}>
      <View style={styles.headerContainer}>
        {icon && (
          <Icon
            size={fontSize}
            name={icon}
            color={ADDITIONAL_COLORS.TEXT.PARMESEAN}
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.formatText,
            styles.shadowText,
            styles.headerText,
            {fontSize},
          ]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBox;
