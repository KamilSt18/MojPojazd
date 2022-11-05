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
import HeaderBox from '../../components/HeaderBox';

const styles = StyleSheet.create({
  ...appStyles,
  welcomeView: {
    width: 250,
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
    marginVertical: 10,
  },
});

export default function HomeView({navigation}) {
  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={[styles.section, styles.welcomeView]}>
          <Text style={[styles.formatText, {fontSize: 18}, styles.shadowText]}>
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
        <HeaderBox title="Oś czasu twoich pojazdów:" />

        {MockupData}
      </ScrollView>
    </SafeAreaView>
  );
}
{
  /* <FormattedMessage defaultMessage={'Hello'} id={'hello'} /> */
}
