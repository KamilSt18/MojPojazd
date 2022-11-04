import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

import {appStyles} from '../../styles/constants';

const styles = StyleSheet.create({
  ...appStyles,
});
const Vehicles = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>
        <Text>Pojazdy</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Vehicles;

// https://rnfirebase.io/firestore/usage#usage
//read
// firestore()
//   .collection('Users')
//   .get()
//   .then(querySnapshot => {
//     console.log('Total users: ', querySnapshot.size);

//     querySnapshot.forEach(documentSnapshot => {
//       console.log(
//         'User ID: ',
//         documentSnapshot.id,
//         documentSnapshot.data(),
//       );
//     });
//   });
//write
// firestore()
//   .collection('Users')
//   .add({
//     name: 'Ada Lovelace',
//     age: 30,
//   })
//   .then(() => {
//     console.log('User added!');
//   });
