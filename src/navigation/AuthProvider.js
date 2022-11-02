import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState('');

  return (
    <AuthContext.Provider
      value={{
        modalVisible,
        err,
        setModalVisible,
        user,
        setUser,
        login: async (email, password, resetField) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
