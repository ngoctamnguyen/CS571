import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

const Header = ({setToken}) => {

  const hanldelogout = () => {
    AsyncStorage.removeItem('@USER');
    setToken(null);
}

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end'}}>
      <TouchableHighlight
        onPress={hanldelogout}
        style={styles.button}
        underlayColor="#5398DC">
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableHighlight>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#0066CC',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      height: 20,
      width: 80,
  },
  input: {
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 3,
  }
});

export default Header;