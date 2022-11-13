import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {appStyles} from '../../../../styles/constants';
import Box from '../../../../components/Box';
import TextBox from '../../../../components/TextBox';
import Pin from '../../../../assets/img/pin.png';
import Card from '../../../../components/Card';
import {MAIN_COLORS} from '../../../../styles/colors';

const styles = StyleSheet.create({
  ...appStyles,
  navButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
});

const ParkTopTab = ({
  user,
  selectedVehicle,
  updateParkTopTab,
  parkData,
  setParkData,
}) => {
  useEffect(() => {
    firestore()
      .collection(`users/${user.uid}/locations`)
      .get()
      .then(collectionSnapshot => {
        collectionSnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data();
          setParkData(data);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedVehicle, updateParkTopTab]);
  const openGps = (lat, lng) => {
    Linking.openURL(`google.navigation:q=${lat}+${lng}`);
  };
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          <Box marginVertical={0}>
            <TextBox title="Sekcja pozwala na zapisanie">
              <TextBox title=" lokalizacji pojazdu " important={true} />
              <TextBox title="pobieranej z aktualnej pozycji telefonu za pomocą" />
              <TextBox title=" modułu GPS " important={true} />
              <TextBox title="i umożliwia nawigowanie do pojazdu." />
            </TextBox>
          </Box>
          <View>
            {parkData ? (
              <>
                {/* <Text>{JSON.stringify(parkData)}</Text> */}
                <TouchableOpacity
                  onPress={() => {
                    openGps(parkData.latitude, parkData.longitude);
                  }}
                  activeOpacity={0.5}>
                  <Card
                    img={Pin}
                    name={'Współrzędne geograficzne'.toUpperCase()}
                    operation="Kliknij aby nawigować"
                    field1={parkData.longitude}
                    field2={parkData.latitude}
                    date={new Date(parkData.time).toLocaleString('pl')}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <Text
                style={[styles.label, {alignSelf: 'center', marginTop: 20}]}>
                Brak zapisanej lokalizacji
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ParkTopTab;
