import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';

import {appStyles} from '../../../styles/constants';
import HeaderBox from '../../../components/HeaderBox';
import {MAIN_COLORS} from '../../../styles/colors';
import TextButton from '../../../components/TextButton';

const styles = StyleSheet.create({
  ...appStyles,
  actionButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
  },
});

const ActionsView = () => {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <HeaderBox
          title="Pomoc podczas wypadku drogowego"
          icon="handshake-o"
          fontSize={18}
          marginVertical={15}
        />
        <View style={{marginBottom: 15}}>
          <TextButton
            label={'Wezwij służby'}
            ViewProps={[styles.actionButton]}
            onPress={() => {
              Linking.openURL('tel: 112');
            }}
            sign={true}
          />
          <TextButton
            label={'Szukaj pomocy drogowej'}
            ViewProps={[styles.actionButton]}
            onPress={() => {
              Linking.openURL(
                'https://www.google.pl/maps/search/pomoc+drogowa/',
              );
            }}
            sign={true}
          />
          <TextButton
            label={'Znajdź wulkanizację'}
            ViewProps={[styles.actionButton]}
            onPress={() => {
              Linking.openURL(
                'https://www.google.pl/maps/search/wulkanizacja/',
              );
            }}
            sign={true}
          />
          <TextButton
            label={'Warsztaty w okolicy'}
            ViewProps={[styles.actionButton]}
            onPress={() => {
              Linking.openURL(
                'https://www.google.pl/maps/search/warszat+samochodowy/',
              );
            }}
            sign={true}
          />
          <TextButton
            label={'Pobliskie stacje paliw'}
            ViewProps={[styles.actionButton]}
            onPress={() => {
              Linking.openURL(
                'https://www.google.pl/maps/search/stacja+paliw/',
              );
            }}
            sign={true}
          />
          <TextButton
            label={'Stacje diagnostyczne'}
            ViewProps={[styles.actionButton]}
            onPress={() => {
              Linking.openURL(
                'https://www.google.pl/maps/search/stacja+diagnostyczna/',
              );
            }}
            sign={true}
          />
          <TextButton
            label={'Komisariat policji'}
            ViewProps={[styles.actionButton]}
            onPress={() => {
              Linking.openURL('https://www.google.pl/maps/search/komisariat/');
            }}
            sign={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActionsView;
