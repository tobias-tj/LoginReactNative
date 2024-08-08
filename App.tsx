/* eslint-disable prettier/prettier */
import {useEffect} from 'react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  getDeviceToken,
  requestUserPermission,
  sendTokenToBackend,
} from './src/utils/Notifications';

export default function App() {
  useEffect(() => {
    async function setUpNotifications() {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        const token = await getDeviceToken();
        if (token) {
          await sendTokenToBackend(token);
        }
      }
    }
    setUpNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a la Aplicación!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
