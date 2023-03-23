import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import {ForrmattedMessage} from 'react-intl';

import {SCREENS} from '../../../navigation/constants';
import TextButton from '../../../components/TextButton';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../../styles/colors';
import logoNew from '../../../assets/img/logo.svg';
import {appStyles} from '../../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
  logoText: {
    fontSize: 40,
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontWeight: '500',
  },
  helloSection: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
  registerButton: {
    backgroundColor: MAIN_COLORS.ORANGE,
  },
  hrContainer: {flexDirection: 'row', width: 200, padding: 20},
  hr: {
    flex: 1,
    height: 10,
    backgroundColor: MAIN_COLORS.ORANGE,
    borderRadius: 10,
  },
  welcomeText: {
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
  },
  footerText: {
    textAlign: 'center',
    margin: 10,
    color: ADDITIONAL_COLORS.TEXT.HINT,
  },
});

const OnBoarding = ({navigation}) => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.helloSection}>
        <SvgXml width="200" height="200" xml={logoNew} />
        <Text style={styles.logoText}>Moj Pojazd</Text>
        <View style={styles.hrContainer}>
          <View style={styles.hr} />
        </View>
        <Text style={styles.welcomeText}>
          Zarządzaj swoimi pojazdami jedną aplikacją!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TextButton
          label={'Zaloguj się'}
          ViewProps={[styles.loginButton]}
          TouchableOpacityProps={{
            onPress: () => navigation.navigate(SCREENS.AUTH.LOGIN.ID),
          }}
          sign={true}
        />
        <TextButton
          label={'Zarejestruj się'}
          ViewProps={[styles.registerButton]}
          TouchableOpacityProps={{
            onPress: () => navigation.navigate(SCREENS.AUTH.SING_UP.ID),
          }}
          sign={true}
        />
      </View>
      <Text style={styles.footerText}>Wersja aplikacji: 1.0.1</Text>
    </SafeAreaView>
  );
};

export default OnBoarding;
