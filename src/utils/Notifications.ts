/* eslint-disable prettier/prettier */
// utils/notifications.ts
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import axios from 'axios';

export async function requestUserPermission(): Promise<boolean> {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  } else {
    Alert.alert(
      'Permiso de Notificaciones',
      'Es necesario permitir las notificaciones para recibir actualizaciones.',
    );
    return false;
  }
}

export async function getDeviceToken(): Promise<string | null> {
  try {
    const token = await messaging().getToken();
    console.log('Device FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error al obtener el token del dispositivo:', error);
    return null;
  }
}

export async function sendTokenToBackend(token: string) {
  try {
    const response = await axios.post(
      'http://10.0.2.2:5080/api/v1/Notificacion',
      {
        Registration_ids: [token],
        Name: 'Usuario',
        FullName: 'Bienvenido a la Aplicación',
        Notificacion: {
          Title: '¡Bienvenido!',
          Body: 'Gracias por unirte a nuestra aplicación.',
        },
      },
    );
    console.log('Respuesta del backend:', response.data);
  } catch (error) {
    console.error('Error al enviar token:', error);
  }
}
