import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SCREENS} from '../../navigation/constants';
import {MAIN_COLORS} from '../../styles/colors';
import QaView from './qa-view/QaView';
import ActionsView from './actions-view/ActionsView';

const Tab = createMaterialBottomTabNavigator();

const Incident = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME.INCIDENT.TAB_NAVIGATOR.QA.ID}
      activeColor={MAIN_COLORS.SECONDARY}
      inactiveColor={MAIN_COLORS.PRIMARY}
      barStyle={{backgroundColor: MAIN_COLORS.ORANGE}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="lightbulb-o" size={26} color={color} />
          ),
        }}
        name={SCREENS.HOME.INCIDENT.TAB_NAVIGATOR.QA.ID}
        component={QaView}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="handshake-o" size={26} color={color} />
          ),
        }}
        name={SCREENS.HOME.INCIDENT.TAB_NAVIGATOR.ACTIONS.ID}
        component={ActionsView}
      />
    </Tab.Navigator>
  );
};

export default Incident;
