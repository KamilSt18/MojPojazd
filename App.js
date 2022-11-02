import GestureHandlerRootView from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import React from 'react';

import LangProvider, {LangModeProvider} from './src/lang/LangProvider';
import AppRouter from './src/navigation';

const App = () => {
  return (
    <LangModeProvider>
      <LangProvider>
        <AppRouter />
      </LangProvider>
    </LangModeProvider>
  );
};

export default App;
