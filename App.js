import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import LangProvider, {LangModeProvider} from './src/lang/LangProvider';
import Home from './src/views/home/Home';
import OnBoarding from './src/views/on-boarding/OnBoarding';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <LangModeProvider>
      <LangProvider>
        <NavigationContainer>
          {/* <Home /> */}
          <Stack.Navigator initialRouteName={'OnBoarding'}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
          </Stack.Navigator>
        </NavigationContainer>
      </LangProvider>
    </LangModeProvider>
  );
};

export default App;
