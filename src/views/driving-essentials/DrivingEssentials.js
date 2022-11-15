import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {appStyles} from '../../styles/constants';
import CardImg from '../../components/CardImg';
import TextButton from '../../components/TextButton';
import {MAIN_COLORS} from '../../styles/colors';
import HeaderBox from '../../components/HeaderBox';
import {tips} from '../../API/tips';
import {useState} from 'react';

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  nextButton: {
    backgroundColor: MAIN_COLORS.PRIMARY,
    width: 300,
  },
});
const DrivingEssentials = () => {
  const [displayTip, setDisplayTip] = useState(0);
  const tipsList = tips.map(tip => (
    <CardImg title={tip.title} desc={tip.desc} img={tip.img} />
  ));
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <HeaderBox title="Porada..." icon="lightbulb-o" fontSize={20} />
        {tipsList[displayTip]}
        <TextButton
          label={'Pokaż następną'}
          ViewProps={[styles.nextButton]}
          sign={true}
          onPress={() => {
            if (displayTip < tipsList.length - 1) {
              setDisplayTip(counter => counter + 1);
            } else {
              setDisplayTip(0);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DrivingEssentials;
