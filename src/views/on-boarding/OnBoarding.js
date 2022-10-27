import React from 'react';
import {View, Text, Button} from 'react-native';

const OnBoarding = ({navigation}) => {
  return (
    <View>
      <Text>Super aplikacja, dodawaj wszystko o swoich pojazdach!</Text>
      <Button
        title={'Rozpocznij!'}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default OnBoarding;
