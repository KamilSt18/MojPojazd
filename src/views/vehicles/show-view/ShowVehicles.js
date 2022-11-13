import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
  Linking,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetLocation from 'react-native-get-location';
import firestore from '@react-native-firebase/firestore';

import {appStyles} from '../../../styles/constants';
import {MAIN_COLORS} from '../../../styles/colors';
import {SCREENS} from '../../../navigation/constants';
import HeaderBox from '../../../components/HeaderBox';
import {firestoreSet, firestoreDelete} from '../../../API/API';
import {ADDITIONAL_COLORS} from '../../../styles/colors';

import DetailsTopTab from './details-top-tab/DetailsTopTab';
import AlertsTopTab from './alerts-top-tab/AlertsTopTab';
import ExpensesTopTab from './expenses-top-tab/ExpensesTopTab';
import ParkTopTab from './park-top-tab/ParkTopTab';

const styles = StyleSheet.create({
  ...appStyles,
  pickerStyles: {
    backgroundColor: MAIN_COLORS.ORANGE,
    color: MAIN_COLORS.SECONDARY,
  },
  welcomeView: {
    width: 250,
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
    marginVertical: 10,
  },
});

const Tab = createMaterialTopTabNavigator();

const ShowVehicles = ({counter, user, data, setUpdate}) => {
  const [updateParkTopTab, setUpdateParkTopTab] = useState(false);
  const [parkData, setParkData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState('');
  const [mess, setMess] = useState('');

  const mapMarkerIcon = (
    <Icon name="map-marker" size={18} color={MAIN_COLORS.SECONDARY} />
  );
  const removeIcon = (
    <Icon name="remove" size={18} color={MAIN_COLORS.SECONDARY} />
  );
  const actions = [
    {
      text: 'Dodaj/aktualizuj lokalizację',
      icon: mapMarkerIcon,
      name: 'bt_add',
      position: 1,
      color: MAIN_COLORS.ORANGE,
    },
    {
      text: 'Usuń lokalizację',
      icon: removeIcon,
      name: 'bt_rem',
      position: 2,
      color: MAIN_COLORS.ORANGE,
    },
  ];
  const [selectedVehicle, setSelectedVehicle] = useState();

  const pickers = data.map(vehicle => {
    let name = `${vehicle.Marka} ${vehicle.Model} ${vehicle['Rok produkcji']}`;
    return <Picker.Item key={vehicle.id} label={name} value={vehicle.id} />;
  });
  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.section, styles.welcomeView]}>
        <Text style={[styles.formatText, {fontSize: 18}, styles.shadowText]}>
          Witaj,{' '}
          <Text style={styles.importantText}>
            {user.displayName ? user.displayName : user.email}
          </Text>
          !
        </Text>
        <Text style={[styles.formatText, styles.shadowText]}>
          Liczba posiadanych{' '}
          <Text style={styles.importantText}>pojazdów: {counter}</Text>
        </Text>
      </View>
      <HeaderBox title="Twoje pojazdy:" icon="car" />
      {Boolean(counter) ? (
        <View style={{flex: 1}}>
          <Picker
            selectedValue={selectedVehicle}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedVehicle(itemValue);
            }}
            dropdownIconColor={MAIN_COLORS.SECONDARY}
            dropdownIconRippleColor={MAIN_COLORS.PRIMARY}
            prompt="Wybierz pojazd"
            style={styles.pickerStyles}>
            {pickers}
          </Picker>

          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {fontSize: 12},
              tabBarIndicatorStyle: {backgroundColor: MAIN_COLORS.ORANGE},
            }}>
            <Tab.Screen
              name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.DETAILS.ID}
              children={() => (
                <DetailsTopTab
                  data={data.filter(el => el.id == selectedVehicle)}
                  selectedVehicle={selectedVehicle}
                  user={user}
                  setUpdate={setUpdate}
                />
              )}
            />
            <Tab.Screen
              name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.EXPENSES.ID}
              component={ExpensesTopTab}
            />
            <Tab.Screen
              name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.ALERTS.ID}
              children={() => (
                <AlertsTopTab
                  data={data.filter(el => el.id == selectedVehicle)}
                  user={user}
                  selectedVehicle={selectedVehicle}
                />
              )}
            />
            <Tab.Screen
              name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.PARK.ID}
              children={() => {
                return (
                  <>
                    <ParkTopTab
                      user={user}
                      selectedVehicle={selectedVehicle}
                      updateParkTopTab={updateParkTopTab}
                      parkData={parkData}
                      setParkData={setParkData}
                    />
                    <FloatingAction
                      color={MAIN_COLORS.ORANGE}
                      actions={actions}
                      onPressItem={name => {
                        if (name == 'bt_add') {
                          GetLocation.getCurrentPosition({
                            enableHighAccuracy: true,
                            timeout: 15000,
                          })
                            .then(location => {
                              // console.log(location);
                              firestoreSet(
                                `users/${user.uid}/locations`,
                                selectedVehicle,
                                location,
                              )
                                .then(() => {
                                  // console.log('Ustawiono dane!');
                                  setMess('Zaaktualizowano!');
                                  setModalVisible(true);
                                  setTimeout(() => {
                                    setModalVisible(false);
                                    setUpdateParkTopTab(val => !val);
                                  }, 1500);
                                })
                                .catch(err => {
                                  console.log(err);
                                });
                              // const dateLocation = new Date(location.time);
                              // console.log(dateLocation.toLocaleString('pl'));
                              // openGps(location.latitude, location.longitude);
                            })
                            .catch(error => {
                              setErr(error);
                              setModalVisible(true);
                              setTimeout(() => {
                                setModalVisible(false);
                                setErr('');
                              }, 1500);
                              const {code, message} = error;
                              console.warn(code, message);
                            });
                        } else if (name == 'bt_rem') {
                          firestoreDelete(
                            `users/${user.uid}/locations`,
                            selectedVehicle,
                          )
                            .then(() => {
                              // console.log('Usunieto dane!');
                              setMess('Zaaktualizowano!');
                              setModalVisible(true);
                              setTimeout(() => {
                                setModalVisible(false);
                                setParkData(null);
                                setUpdateParkTopTab(val => !val);
                              }, 1500);
                            })
                            .catch(err => {
                              setErr(err);
                              setModalVisible(true);
                              setTimeout(() => {
                                setModalVisible(false);
                                setErr('');
                              }, 1500);
                              console.log(err);
                            });
                        }
                        // console.log(`selected button: ${name}`);
                      }}
                    />
                  </>
                );
              }}
            />
          </Tab.Navigator>
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
        </View>
      ) : (
        <Picker
          selectedValue={selectedVehicle}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedVehicle(itemValue);
          }}
          dropdownIconColor={MAIN_COLORS.SECONDARY}
          dropdownIconRippleColor={MAIN_COLORS.PRIMARY}
          style={styles.pickerStyles}>
          <Picker.Item
            label="Brak dodanych pojazdów na koncie!"
            enabled={false}
          />
        </Picker>
      )}
    </SafeAreaView>
  );
};

export default ShowVehicles;
