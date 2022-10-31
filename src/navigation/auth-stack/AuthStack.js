import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SCREENS} from '../constants';
import OnBoarding from '../../views/auth/on-boarding';
import LoginScreen from '../../views/auth/login';
import SingupScreen from '../../views/auth/singup';
import ResetPassword from '../../views/auth/reset-password/ResetPassword';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.AUTH.ONBOARDING.ID}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.AUTH.ONBOARDING.ID} component={OnBoarding} />
      <Stack.Screen name={SCREENS.AUTH.LOGIN.ID} component={LoginScreen} />
      <Stack.Screen name={SCREENS.AUTH.SING_UP.ID} component={SingupScreen} />
      <Stack.Screen
        name={SCREENS.AUTH.RESET_PASSWORD.ID}
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
