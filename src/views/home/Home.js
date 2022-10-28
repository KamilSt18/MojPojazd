import React from 'react';
import {View, Text} from 'react-native';
import {FormattedMessage} from 'react-intl';

export default function HomeView({navigation}) {
  return (
    <View>
      <Text>
        <FormattedMessage defaultMessage={'Hello'} id={'hello'} />
      </Text>
    </View>
  );
}
