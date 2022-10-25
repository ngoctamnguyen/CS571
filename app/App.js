import { useEffect, useState, createContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './components/Header.android';
import Login from './components/Login';
import Home from './components/Home';
import GlobalContext from './GlobalContext';


export default function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await AsyncStorage.getItem('@USER');
        if (data !== null) {
          setToken(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getToken();
  }, []);

  return (
    <GlobalContext.Provider value={{token, setToken}}>
      <View style={styles.container}>
        {token ? <Header setToken={setToken} /> : null}
        {token ? <Home /> : <Login setToken={setToken} />}
      </View>
    </GlobalContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
