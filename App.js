import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import LangProvider, {LangModeProvider} from './src/lang/LangProvider';
import Home from './src/view/home/Home';

const App = () => {
  return (
    <LangModeProvider>
      <LangProvider>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </LangProvider>
    </LangModeProvider>
  );
};

export default App;
