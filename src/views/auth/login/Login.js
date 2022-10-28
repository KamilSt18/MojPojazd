import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';

import {AuthContext} from '../../../navigation/AuthProvider';

const LoginScreen = () => {
  const {setUser} = useContext(AuthContext);
  return (
    <View>
      <Text>Logowanie</Text>
      <Button title={'Login'} onPress={() => setUser({})} />
    </View>
  );
};

export default LoginScreen;
