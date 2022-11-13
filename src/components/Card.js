import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

import {appStyles} from '../styles/constants';
import {ADDITIONAL_COLORS, MAIN_COLORS} from '../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  vehicleLogoView: {
    justifyContent: 'center',
  },
  carImage: {
    width: 50,
    height: 50,
    marginEnd: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
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
    fontSize: 12,
  },
  carDetailsColorText: {
    color: MAIN_COLORS.SECONDARY,
    fontSize: 12,
  },
  carHeaderText: {fontSize: 18, marginBottom: 1},
  cardInfoCar: {flex: 1, flexDirection: 'row'},
  carDateText: {textAlign: 'right', marginTop: 5, fontSize: 10},
});

const Card = ({
  name,
  img,
  operation = null,
  field1 = null,
  field2 = null,
  date = null,
}) => {
  return (
    <View style={[styles.section, {marginTop: 10}]}>
      <View style={styles.cardInfoCar}>
        <View style={styles.vehicleLogoView}>
          <Image source={img} style={styles.carImage} />
        </View>
        <View style={styles.carInfoView}>
          <Text
            style={[
              styles.formatText,
              styles.carHeaderText,
              styles.shadowText,
            ]}>
            <Text style={styles.importantText}>{name}</Text>
            {operation && `: ${operation}`}
          </Text>
          {field1 && (
            <Text style={[styles.carDetailsText, styles.shadowText]}>
              Długość geograficzna:{' '}
              <Text style={styles.carDetailsColorText}>{field1}</Text>
            </Text>
          )}
          {field2 && (
            <Text style={[styles.carDetailsText, styles.shadowText]}>
              Szerokość geograficzna:{' '}
              <Text style={styles.carDetailsColorText}>{field2}</Text>
            </Text>
          )}
          {date && (
            <Text style={[styles.carDetailsColorText, styles.carDateText]}>
              {date}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Card;
