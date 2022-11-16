import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

import {appStyles} from '../../styles/constants';
import AddVehicle from './add-view/AddVehicle';
import ShowVehicles from './show-view/ShowVehicles';
import {SCREENS} from '../../navigation/constants';
import {MAIN_COLORS} from '../../styles/colors';
import {AuthContext} from '../../navigation/AuthProvider';

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  ...appStyles,
});
const Vehicles = () => {
  const {user} = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
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
        });
      });
  }, [user.uid, update]);
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
        children={() => (
          <ShowVehicles
            update={update}
            setUpdate={setUpdate}
            counter={counter}
            setCounter={setCounter}
            user={user}
            data={data}
            setData={setData}
          />
        )}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="plus-circle" size={26} color={color} />
          ),
        }}
        name={SCREENS.HOME.VEHICLES.TAB_NAVIGATOR.ADD_VEHICLE.ID}
        children={() => <AddVehicle setUpdate={setUpdate} data={data} />}
      />
    </Tab.Navigator>
  );
};

export default Vehicles;
