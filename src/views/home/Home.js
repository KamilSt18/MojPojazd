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
import Car from '../../assets/img/car.png';
import Bus from '../../assets/img/bus.png';
import Motorcycle from '../../assets/img/motorcycle.png';

const styles = StyleSheet.create({
  ...appStyles,
  shadowText: {
    textShadowColor: 'rgba(58,58,58, 0.25)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 0.1,
  },
  formatText: {
    color: MAIN_COLORS.SECONDARY,
    fontSize: 20,
    // fontWeight: '500',
  },
  importantText: {
    fontWeight: 'bold',
    color: ADDITIONAL_COLORS.TEXT.PARMESEAN,
  },
  carImage: {
    width: 130,
    height: 130,
  },
  carInfoView: {
    padding: 3,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  carDetailsText: {
    marginVertical: 1,
    color: ADDITIONAL_COLORS.TEXT.PARMESEAN,
    fontWeight: 'bold',
  },
  carDetailsColorText: {
    color: MAIN_COLORS.SECONDARY,
  },
  carHeaderText: {fontSize: 22, marginBottom: 1},
  cardInfoCar: {flex: 1, flexDirection: 'row'},
  carDateText: {textAlign: 'right', marginTop: 5},
});

export default function HomeView({navigation}) {
  const {user} = useContext(AuthContext);
  let data = [];
  let vehicles = [Car, Bus, Motorcycle];
  for (let i = 0; i < 10; i++) {
    data.push(
      <View style={styles.section}>
        <View style={styles.cardInfoCar}>
          <View>
            <Image
              source={vehicles[Math.floor(Math.random() * vehicles.length)]}
              style={styles.carImage}
            />
          </View>
          <View style={styles.carInfoView}>
            <Text
              style={[
                styles.formatText,
                styles.carHeaderText,
                styles.shadowText,
              ]}>
              <Text style={styles.importantText}>Auto {i}</Text>: Tankowanie
            </Text>
            <Text style={[styles.carDetailsText, styles.shadowText]}>
              Marka:{' '}
              <Text style={styles.carDetailsColorText}>Mercedes-Benz</Text>
            </Text>
            <Text style={[styles.carDetailsText, styles.shadowText]}>
              Model:{' '}
              <Text style={styles.carDetailsColorText}>Klasa S (W140)</Text>
            </Text>
            <Text style={[styles.carDetailsText, styles.shadowText]}>
              VIN:{' '}
              <Text style={styles.carDetailsColorText}>VF73A9HC8DJ819035</Text>
            </Text>
            <Text style={[styles.carDetailsColorText, styles.carDateText]}>
              04.11.2022 10:28
            </Text>
          </View>
        </View>
      </View>,
    );
  }

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

        {data}
      </ScrollView>
    </SafeAreaView>
  );
}
{
  /* <FormattedMessage defaultMessage={'Hello'} id={'hello'} /> */
}
