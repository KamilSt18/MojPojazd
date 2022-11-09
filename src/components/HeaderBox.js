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

const HeaderBox = ({title, icon = null}) => {
  return (
    <View style={styles.section}>
      <View style={styles.headerContainer}>
        {icon && (
          <Icon
            size={18}
            name={icon}
            color={ADDITIONAL_COLORS.TEXT.PARMESEAN}
            style={styles.icon}
          />
        )}
        <Text style={[styles.formatText, styles.shadowText, styles.headerText]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBox;
