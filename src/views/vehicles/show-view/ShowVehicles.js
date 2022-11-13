import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';

import {appStyles} from '../../../styles/constants';
import {MAIN_COLORS} from '../../../styles/colors';
import {SCREENS} from '../../../navigation/constants';
import HeaderBox from '../../../components/HeaderBox';

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
  const mapMarkerIcon = (
    <Icon name="map-marker" size={18} color={MAIN_COLORS.SECONDARY} />
  );
  const removeIcon = (
    <Icon name="remove" size={18} color={MAIN_COLORS.SECONDARY} />
  );
  const actions = [
    {
      text: 'Dodaj lokalizację',
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
                    <ParkTopTab />
                    <FloatingAction
                      color={MAIN_COLORS.PRIMARY}
                      actions={actions}
                      onPressItem={name => {
                        console.log(`selected button: ${name}`);
                      }}
                    />
                  </>
                );
              }}
            />
          </Tab.Navigator>
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
