import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState('');
  const [afterLogin, setAfterLogin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        modalVisible,
        err,
        setModalVisible,
        user,
        setUser,
        afterLogin,
        setAfterLogin,
        login: async (email, password, resetField) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            setAfterLogin(true);
          } catch (e) {
            console.log(e);

            setModalVisible(true);
            setErr(e);
            setTimeout(() => {
              setModalVisible(false);
              setErr('');
              resetField('password');
            }, 1500);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);

            setModalVisible(true);
            setErr(e);
            setTimeout(() => {
              setModalVisible(false);
              setErr('');
            }, 1500);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        resetPassword: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            console.log(e);
          }
        },
        updateProfile: async update => {
          try {
            if (update['displayName'] == user.displayName) {
              throw 'Dane się nie zmieniły!';
            }
            await auth().currentUser.updateProfile(update);

            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 1500);
          } catch (e) {
            console.log(e);

            setModalVisible(true);
            setErr(e);
            setTimeout(() => {
              setModalVisible(false);
              setErr('');
            }, 1500);
          }
        },
        addVehicle: async props => {
          try {
            console.log(props);

            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 1500);
          } catch (e) {
            console.log(e);

            setModalVisible(true);
            setErr(e);
            setTimeout(() => {
              setModalVisible(false);
              setErr('');
            }, 1500);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
