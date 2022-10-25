import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../GlobalContext';

const Food = ({ data }) => {

  const {token} = useContext(GlobalContext);
  const { _id, foodname, origine, price, date, image } = data;
  const navigation = useNavigation();

  const handleViewFood = () => {
    navigation.navigate('viewfood', { data });
  };

  const handleEdit = () => {
    navigation.navigate('editfood', { data });
  }

  const createAlert = () => {
    console.log("Delete");
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }

    //soft delet
  const handleDelete = async () => {
    const response = await fetch('http://localhost:3000/foods/delete/' + _id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/lson',
        'Content-type': 'application/json',
        'Authorization': 'bearer ' + token
      },
      body: JSON.stringify({delete: true})
    });
    console.log(response)
    if (response.status === 200) {
      console.log('Food was deleted');
      navigation.navigate('foodlist', { 'refresh': true });
    }
  }

  console.log(image)
  return (

    <View
      style={{ backgroundColor: '#F3F3F7' }}>
      <View style={styles.row}>
        <View style={styles.images}>
          <Image source={{ uri: image }} style={{ height: 50, width: 50, borderRadius: 30 }} />
        </View>

        <View style={styles.food}>
          <Text style={{ fontWeight: 'bold' }}>{foodname}</Text>
          <Text style={{ fontSize: 12 }}>Origin: {origine}</Text>
          <Text style={{ fontSize: 12 }}>Price: {price}</Text>
        </View>

        <View style={styles.edges}>
          <TouchableHighlight
            onPress={handleViewFood}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>View</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={handleEdit}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={handleDelete}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 50,
  },
  images: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 20,
    minWidth: 50,
  },
  food: {
    flexDirection: 'column',
    paddingLeft: 5,
    flex: 8,
  },
  faculty: {
    color: 'grey',
  },
  button: {
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
    height: 20,
    width: 60,
  },
  buttonText: {
    color: '#0066CC',
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default Food;