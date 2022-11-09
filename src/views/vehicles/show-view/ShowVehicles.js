import React, {useState, useContext, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

import {appStyles} from '../../../styles/constants';
import {MAIN_COLORS} from '../../../styles/colors';
import {SCREENS} from '../../../navigation/constants';
import HeaderBox from '../../../components/HeaderBox';
import {AuthContext} from '../../../navigation/AuthProvider';

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

const ShowVehicles = ({update, setUpdate}) => {
  const {user} = useContext(AuthContext);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setData([]);
    firestore()
      .collection(`users/${user.uid}/vehicles`)
      .get()
      .then(collectionSnapshot => {
        setCounter(collectionSnapshot.size);
        collectionSnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data();
          data['id'] = documentSnapshot.id;
          setData(arr => [...arr, data]);
          // setDidLoad(true);
        });
      });
  }, [user.uid, update]);

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
          <Text style={styles.importantText}>pojazdów: {counter}</Text>.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <HeaderBox title="Twoje pojazdy:" icon="car" />

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
              />
            )}
          />
          <Tab.Screen
            name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.EXPENSES.ID}
            component={ExpensesTopTab}
          />
          <Tab.Screen
            name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.ALERTS.ID}
            component={AlertsTopTab}
          />
          <Tab.Screen
            name={SCREENS.HOME.VEHICLES.TOP_TAB_NAVIGATOR.PARK.ID}
            component={ParkTopTab}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default ShowVehicles;
