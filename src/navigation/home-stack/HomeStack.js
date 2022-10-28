import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeView from '../../views/home/Home';
import {SCREENS} from '../constants';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.HOME.DASHBOARD.ID}>
      <Stack.Screen name={SCREENS.HOME.DASHBOARD.ID} component={HomeView} />
    </Stack.Navigator>
  );
};

export default HomeStack;
