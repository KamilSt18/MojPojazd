import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {AuthContext} from '../../navigation/AuthProvider';
import {appStyles} from '../../styles/constants';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../styles/colors';
import {MockupData} from '../../API/mockupData';

const styles = StyleSheet.create({
  ...appStyles,
});

export default function HomeView({navigation}) {
  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={[styles.section, {width: 320}]}>
          <Text style={[styles.formatText, {fontSize: 22}, styles.shadowText]}>
            Witaj,{' '}
            <Text style={styles.importantText}>
              {user.displayName ? user.displayName : user.email}
            </Text>
            !
          </Text>
          <Text style={[styles.formatText, styles.shadowText]}>
            Posiadasz u nas <Text style={styles.importantText}>5 pojazdów</Text>
            .
          </Text>
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.formatText,
              {textAlign: 'center'},
              styles.shadowText,
            ]}>
            Oś czasu twoich pojazdów:
          </Text>
        </View>

        {MockupData}
      </ScrollView>
    </SafeAreaView>
  );
}
{
  /* <FormattedMessage defaultMessage={'Hello'} id={'hello'} /> */
}
