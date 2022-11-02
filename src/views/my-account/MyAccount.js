import React, {useContext} from 'react';
import {SafeAreaView, Text, Button, StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {AuthContext} from '../../navigation/AuthProvider';
import {appStyles} from '../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

export default function MyAccount({navigation}) {
  const {logout, user} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.root}>
      <Text>
        {/* <FormattedMessage defaultMessage={'Hello'} id={'hello'} /> */}
        {JSON.stringify(user)}
        <Button
          title={'Wyloguj'}
          onPress={() => {
            logout();
          }}
        />
      </Text>
    </SafeAreaView>
  );
}
