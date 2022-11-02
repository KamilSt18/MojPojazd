import React, {useContext} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {AuthContext} from '../../navigation/AuthProvider';
import {appStyles} from '../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});

export default function HomeView({navigation}) {
  const {user} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <Text style={{fontSize: 100}}>
          {/* <FormattedMessage defaultMessage={'Hello'} id={'hello'} /> */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eius id,
          aliquid velit facilis eos, quam saepe labore, ut minus doloribus
          nulla! Facilis omnis exercitationem vitae tempore modi dolores in.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
