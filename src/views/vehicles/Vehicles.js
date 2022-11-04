import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {appStyles} from '../../styles/constants';
import AddVehicle from './add-view/AddVehicle';
import ShowVehicles from './show-view/ShowVehicles';
import {SCREENS} from '../../navigation/constants';
import {MAIN_COLORS} from '../../styles/colors';

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  ...appStyles,
});
const Vehicles = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME.VEHICLES.TAB_NAVIGATOR.SHOW_VEHICLES.ID}
      activeColor={MAIN_COLORS.SECONDARY}
      inactiveColor={MAIN_COLORS.PRIMARY}
      barStyle={{backgroundColor: MAIN_COLORS.ORANGE}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => <Icon name="eye" size={26} color={color} />,
        }}
        name={SCREENS.HOME.VEHICLES.TAB_NAVIGATOR.SHOW_VEHICLES.ID}
        component={ShowVehicles}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="plus-circle" size={26} color={color} />
          ),
        }}
        name={SCREENS.HOME.VEHICLES.TAB_NAVIGATOR.ADD_VEHICLE.ID}
        component={AddVehicle}
      />
    </Tab.Navigator>
  );
};

export default Vehicles;

// https://rnfirebase.io/firestore/usage#usage
//read
// firestore()
//   .collection('Users')
//   .get()
//   .then(querySnapshot => {
//     console.log('Total users: ', querySnapshot.size);

//     querySnapshot.forEach(documentSnapshot => {
//       console.log(
//         'User ID: ',
//         documentSnapshot.id,
//         documentSnapshot.data(),
//       );
//     });
//   });
//write
// firestore()
//   .collection('Users')
//   .add({
//     name: 'Ada Lovelace',
//     age: 30,
//   })
//   .then(() => {
//     console.log('User added!');
//   });
