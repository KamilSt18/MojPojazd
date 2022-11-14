import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';

import {appStyles} from '../../../../styles/constants';
import TextButton from '../../../../components/TextButton';
import {MAIN_COLORS} from '../../../../styles/colors';
import Notifications from '../../../../Notifications';
import {ADDITIONAL_COLORS} from '../../../../styles/colors';
import Box from '../../../../components/Box';
import TextBox from '../../../../components/TextBox';

const styles = StyleSheet.create({
  ...appStyles,
  alertsButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
    marginTop: 30,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});

const AlertsTopTab = ({data, user, selectedVehicle}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState('');
  const [mess, setMess] = useState('');

  const [isEnabledVehicleInspectionDate, setIsEnabledVehicleInspectionDate] =
    useState(false);
  const [isEnabledVehicleInsuranceDate, setIsEnabledVehicleInsuranceDate] =
    useState(false);

  const [dateVehicleInspectionDate, setDateVehicleInspectionDate] =
    useState(null);

  const [dateVehicleInsuranceDate, setDateVehicleInsuranceDate] = useState();

  useEffect(() => {
    // Przegląd
    firestore()
      .collection(`users/${user.uid}/alerts`)
      .doc(selectedVehicle)
      .collection('0')
      .get()
      .then(collectionSnapshot => {
        if (collectionSnapshot.size > 0) {
          collectionSnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data();
            let newDateVehicleInspectionDate = new Date(
              data.dateVehicleInspectionDate.seconds * 1000,
            );
            setDateVehicleInspectionDate(newDateVehicleInspectionDate);
            setIsEnabledVehicleInspectionDate(true);
          });
        }
      });

    // Ubezpieczenie
    firestore()
      .collection(`users/${user.uid}/alerts`)
      .doc(selectedVehicle)
      .collection('1')
      .get()
      .then(collectionSnapshot => {
        if (collectionSnapshot.size > 0) {
          collectionSnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data();
            let newDateVehicleInsuranceDate = new Date(
              data.dateVehicleInsuranceDate.seconds * 1000,
            );
            setDateVehicleInsuranceDate(newDateVehicleInsuranceDate);
            setIsEnabledVehicleInsuranceDate(true);
          });
        }
      });
  }, [selectedVehicle]);

  const onSubmit = () => {
    // Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
    try {
      let name = `${data[0].Marka} ${data[0].Model} ${data[0]['Rok produkcji']}`;
      if (dateVehicleInspectionDate) {
        // Tydzien przed
        let alertVehicleInspectionDate = new Date();
        alertVehicleInspectionDate.setDate(
          alertVehicleInspectionDate.getDate() - 7,
        );
        firestore()
          .collection(`users/${user.uid}/alerts`)
          .doc(`${data[0].VIN}`)
          .collection('0')
          .doc('dateVehicleInspectionDate')
          .set({
            id: '0',
            dateVehicleInspectionDate: dateVehicleInspectionDate,
          })
          .then(() => {
            // console.log('Ustawiono dane!');
          })
          .catch(err => {
            console.log(err);
          });
        // Alert
        Notifications.schduleNotification(
          alertVehicleInspectionDate,
          '🔔 Przegląd techniczny',
          `${name} wkrótce traci ważność przeglądu!`,
          '0',
        );
      } else {
        firestore()
          .collection(`users/${user.uid}/alerts`)
          .doc(`${data[0].VIN}`)
          .collection('0')
          .doc('dateVehicleInspectionDate')
          .delete()
          .then(() => {
            // console.log('Usunięto dane!');
          })
          .catch(err => {
            console.log(err);
          });
        Notifications.cancelNotif('0');
      }
      // Ubezpieczenie
      if (dateVehicleInsuranceDate) {
        // Tydzien przed
        let alertVehicleInsuranceDate = new Date();
        alertVehicleInsuranceDate.setDate(
          dateVehicleInsuranceDate.getDate() - 7,
        );
        firestore()
          .collection(`users/${user.uid}/alerts`)
          .doc(`${data[0].VIN}`)
          .collection('1')
          .doc('dateVehicleInsuranceDate')
          .set({
            id: '1',
            dateVehicleInsuranceDate: dateVehicleInsuranceDate,
          })
          .then(() => {
            // console.log('Ustawiono dane!');
          })
          .catch(err => {
            console.log(err);
          });
        // Alert
        Notifications.schduleNotification(
          alertVehicleInsuranceDate,
          '🔔 Ubezpieczenie',
          `${name} wkrótce traci ważność ubezpieczenia!`,
          '0',
        );
      } else {
        firestore()
          .collection(`users/${user.uid}/alerts`)
          .doc(`${data[0].VIN}`)
          .collection('1')
          .doc('dateVehicleInsuranceDate')
          .delete()
          .then(() => {
            // console.log('Usunięto dane!');
          })
          .catch(err => {
            console.log(err);
          });
        Notifications.cancelNotif('1');
      }
      setMess('Zaaktualizowano!');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1500);
    } catch (e) {
      setErr(e);

      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErr('');
      }, 1500);
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <ScrollView>
          <Box marginVertical={0}>
            <TextBox title="Sekcja pozwala na ustawienie">
              <TextBox title=" powiadomienia push" important={true} />
              <TextBox title=" na "/>
              <TextBox title="tydzień " important={true} />
              <TextBox title="przed upływem terminu przeglądu i/lub ubezpieczenia." />
            </TextBox>
          </Box>
          <View>
            <View style={styles.rowItem}>
              <View style={[styles.actionContainer, {marginHorizontal: 0}]}>
                <Text style={[styles.label, {marginTop: 0}]}>
                  Data przeglądu:
                </Text>
              </View>
              <Switch
                trackColor={{false: '#767577', true: MAIN_COLORS.PRIMARY}}
                thumbColor={
                  isEnabledVehicleInspectionDate
                    ? MAIN_COLORS.ORANGE
                    : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={status => {
                  if (status) {
                    setDateVehicleInspectionDate(new Date());
                  } else {
                    setDateVehicleInspectionDate(null);
                  }
                  setIsEnabledVehicleInspectionDate(val => !val);
                }}
                value={isEnabledVehicleInspectionDate}
              />
            </View>
            {isEnabledVehicleInspectionDate && (
              <DatePicker
                style={{alignSelf: 'center'}}
                date={dateVehicleInspectionDate}
                onDateChange={date => {
                  setDateVehicleInspectionDate(date);
                }}
                androidVariant="nativeAndroid"
                mode="date"
                locale="pl"
                textColor={MAIN_COLORS.PRIMARY}
              />
            )}
          </View>

          <View>
            <View style={styles.rowItem}>
              <View style={[styles.actionContainer, {marginHorizontal: 0}]}>
                <Text style={[styles.label, {marginTop: 0}]}>
                  Data ubezpieczenia:
                </Text>
              </View>
              <Switch
                trackColor={{false: '#767577', true: MAIN_COLORS.PRIMARY}}
                thumbColor={
                  isEnabledVehicleInsuranceDate ? MAIN_COLORS.ORANGE : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={status => {
                  if (status) {
                    setDateVehicleInsuranceDate(new Date());
                  } else {
                    setDateVehicleInsuranceDate(null);
                  }
                  setIsEnabledVehicleInsuranceDate(val => !val);
                }}
                value={isEnabledVehicleInsuranceDate}
              />
            </View>
            {isEnabledVehicleInsuranceDate && (
              <DatePicker
                style={{alignSelf: 'center'}}
                date={dateVehicleInsuranceDate}
                onDateChange={date => {
                  setDateVehicleInsuranceDate(date);
                }}
                androidVariant="nativeAndroid"
                mode="date"
                locale="pl"
                textColor={MAIN_COLORS.PRIMARY}
              />
            )}
          </View>

          <View>
            <TextButton
              label={'Ustaw przypomnienia'}
              ViewProps={[styles.alertsButton]}
              onPress={() => {
                onSubmit();
                // if (
                //   isEnabledVehicleInspectionDate ||
                //   isEnabledVehicleInsuranceDate
                // ) {
                //   onSubmit();
                // } else {
                //   console.log('Brak zaznaczonych opcji');
                // }
              }}
              sign={true}
            />
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={[
                    styles.modalText,
                    !err ? {color: ADDITIONAL_COLORS.TEXT.GREEN} : null,
                  ]}>
                  {err ? `Wystąpił błąd! (${err})` : mess}
                </Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AlertsTopTab;
