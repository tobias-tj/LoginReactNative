/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function App() {
  const [usuario, setUsuario] = useState<string>('');
  const [fcmKey, setFcmKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logoImage = require('./assets/securityNew.png');

  const BASE_URL = 'http://10.0.2.2:5080/api/v1';

  const login = async (usuario: string, fcmKey: string) => {
    try {
      console.log(usuario, fcmKey);
      const response = await axios.post(`${BASE_URL}/Usuario/LoginUsuario`, {
        usuario,
        fcmKey,
      });
      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        setIsAuthenticated(true);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login error', 'Something went wrong');
      console.error('Login error:', error);
    }
  };

  if (isAuthenticated) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to the Home Screen!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImage} style={styles.headerImg} />
          <Text style={styles.title}>Login App</Text>
          <Text style={styles.subtitle}>
            Ingresar a la app a través del usuario
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Usuario</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="CI: 54309..."
              placeholderTextColor="#6b7280"
              value={usuario}
              onChangeText={text => setUsuario(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="*******"
              placeholderTextColor="#6b7280"
              value={fcmKey}
              onChangeText={password => setFcmKey(password)}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                login(usuario, fcmKey);
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 0,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#075eec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
