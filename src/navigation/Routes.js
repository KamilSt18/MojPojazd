import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './auth-stack/AuthStack';
import HomeStack from './home-stack/HomeStack';
import {AuthContext} from './AuthProvider';

const Routes = () => {
  const {user} = useContext(AuthContext);

  // useEffect onAuthStateChange -> setUser -> isInitialization -> setLoading

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
