import React, {useContext} from 'react';
import {SafeAreaView, Text, Button, StyleSheet} from 'react-native';

import {AuthContext} from '../../../navigation/AuthProvider';
import {appStyles} from '../../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

const LoginScreen = () => {
  const {setUser, login} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.root}>
      <Text>Logowanie</Text>
      <Button title={'Login'} onPress={() => login('test@test.pl', 'test12')} />
    </SafeAreaView>
  );
};

export default LoginScreen;
