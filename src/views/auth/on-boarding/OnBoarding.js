import React from 'react';
import {View, Text, Button} from 'react-native';

import {SCREENS} from '../../../navigation/constants';

const OnBoarding = ({navigation}) => {
  return (
    <View>
      <Text>MojPOJAZD :: Statystyki twoich pojazdów!</Text>
      <Button
        title={'Zaloguj'}
        onPress={() => navigation.navigate(SCREENS.AUTH.LOGIN.ID)}
      />
      <Button
        title={'Zarejestruj'}
        onPress={() => navigation.navigate(SCREENS.AUTH.SING_UP.ID)}
      />
    </View>
  );
};

export default OnBoarding;
