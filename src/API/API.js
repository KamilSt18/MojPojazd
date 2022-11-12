import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export const firestoreDelete = (collection, doc) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .doc(doc)
      .delete()
      .then(() => {
        resolve('Usunięto dane!');
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const firestoreSet = (collection, doc, set) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .doc(doc)
      .set(set)
      .then(() => {
        resolve('Ustawiono dane!');
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const firestoreUpdate = (collection, doc, update) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .doc(doc)
      .update(update)
      .then(() => {
        resolve('Zaktualizowano dane!');
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getVehicleData = async (
  registration_plate,
  vin,
  date_first_reg,
) => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.deepit.pl:2053/api/vehicles', {
        params: {
          registration_plate: registration_plate,
          vin: vin,
          date_first_reg: date_first_reg,
        },
      })
      .then(function (response) {
        response.data['Numer rejestracyjny'] = registration_plate.toUpperCase();
        response.data['Data pierwszej rejestracji'] = date_first_reg;
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
