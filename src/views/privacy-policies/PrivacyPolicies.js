import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const PrivacyPolicies = () => {
  const source = {
    uri: 'https://deepit.pl/MojPojazd/prywatnosc_i_zasady.pdf',
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PrivacyPolicies;
