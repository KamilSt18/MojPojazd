import React, {useContext} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {AuthContext} from '../../navigation/AuthProvider';
import {appStyles} from '../../styles/constants';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  formatText: {
    color: MAIN_COLORS.SECONDARY,
    fontSize: 20,
    // fontWeight: '500',
    textShadowColor: 'rgba(58,58,58, 0.25)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 0.1,
  },
  importantText: {
    fontWeight: 'bold',
    color: ADDITIONAL_COLORS.TEXT.PARMESEAN,
  },
});

export default function HomeView({navigation}) {
  const {user} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={[styles.section, {width: 320}]}>
          <Text style={[styles.formatText, {fontSize: 22}]}>
            Witaj,{' '}
            <Text style={styles.importantText}>
              {user.displayName ? user.displayName : user.email}
            </Text>
            !
          </Text>
          <Text style={styles.formatText}>
            Posiadasz u nas <Text style={styles.importantText}>5 pojazdów</Text>
            .
          </Text>
        </View>
        <View style={styles.section}>
          <Text
            style={[styles.formatText, {fontSize: 22, textAlign: 'center'}]}>
            Oś czasu twoich pojazdów:
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
{
  /* <FormattedMessage defaultMessage={'Hello'} id={'hello'} /> */
}
