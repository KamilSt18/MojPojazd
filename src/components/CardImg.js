import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

import {MAIN_COLORS} from '../styles/colors';
import {appStyles} from '../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
  frame: {
    height: 350,
    width: 350,
    backgroundColor: MAIN_COLORS.SECONDARY,
    borderRadius: 3,
    marginVertical: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  containerPosition: {
    justifyContent: 'center',
    flex: 1,
  },
  imgView: {height: '50%'},
  contentView: {
    backgroundColor: MAIN_COLORS.ORANGE,
    height: '50%',
    padding: 10,
  },
  tipImage: {width: '100%', height: '100%'},
  titleTipCard: {
    color: MAIN_COLORS.SECONDARY,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  descTipCard: {color: MAIN_COLORS.SECONDARY, fontSize: 14},
});

const CardImg = ({title, desc, img}) => {
  return (
    <View style={styles.frame}>
      <View style={styles.containerPosition}>
        <View style={styles.imgView}>
          <Image source={img} style={styles.tipImage} />
        </View>
        <View style={styles.contentView}>
          <Text style={[styles.titleTipCard, styles.shadowText]}>{title}</Text>
          <Text style={[styles.descTipCard, styles.shadowText]}>{desc}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardImg;
