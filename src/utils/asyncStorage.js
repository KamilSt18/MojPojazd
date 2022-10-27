import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.log(err);
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

export const removeItem = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};
