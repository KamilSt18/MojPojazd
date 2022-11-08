import React, {useState, useContext, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, StyleSheet, View} from 'react-native';
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
});

const Tab = createMaterialTopTabNavigator();

const ShowVehicles = () => {
  const {user} = useContext(AuthContext);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [data, setData] = useState([]);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      firestore()
        .collection(`users/${user.uid}/vehicles`)
        .get()
        .then(collectionSnapshot => {
          collectionSnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data();
            data['id'] = documentSnapshot.id;
            setData(arr => [...arr, data]);
            setDidLoad(true);
          });
        });
    }
  }, [didLoad, user.uid]);

  const pickers = data.map(vehicle => {
    let name = `${vehicle.Marka} ${vehicle.Model} ${vehicle['Rok produkcji']}`;
    return <Picker.Item key={vehicle.id} label={name} value={vehicle.id} />;
  });

  return (
    <SafeAreaView style={styles.root}>
      <View style={{flex: 1}}>
        <HeaderBox title="Twoje pojazdy:" />

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
