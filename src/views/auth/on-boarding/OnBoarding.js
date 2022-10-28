import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {SCREENS} from '../../../navigation/constants';
import TextButton from '../../../components/TextButton';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../../../styles/colors';
import logoNew from '../../../assets/img/logo.svg';

const styles = StyleSheet.create({
  logoText: {
    fontSize: 40,
    color: ADDITIONAL_COLORS.TEXT.BLUE,
    fontWeight: '500',
  },
  constainer: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    margin: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  loginButton: {
    color: ADDITIONAL_COLORS.TEXT.PRIMARY,
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
  registerButton: {
    color: ADDITIONAL_COLORS.TEXT.PRIMARY,
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
    <>
      <View style={styles.constainer}>
        <SvgXml width="200" height="200" xml={logoNew} />
        <Text style={styles.logoText}>Moje Pojazdy</Text>
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
          onPress={() => navigation.navigate(SCREENS.AUTH.LOGIN.ID)}
          TextProps={{style: [styles.button, styles.loginButton]}}
          TouchableOpacityProps={{
            onPress: () => navigation.navigate(SCREENS.AUTH.LOGIN.ID),
          }}
        />
        <TextButton
          label={'Zarejestruj się'}
          TextProps={{style: [styles.button, styles.registerButton]}}
          TouchableOpacityProps={{
            onPress: () => navigation.navigate(SCREENS.AUTH.SING_UP.ID),
          }}
        />
      </View>
      <Text style={styles.footerText}>Wersja aplikacji: 1.0.0</Text>
    </>
  );
};

export default OnBoarding;
