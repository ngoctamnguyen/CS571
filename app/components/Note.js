import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../GlobalContext';

const Note = ({ data }) => {

  const {token} = useContext(GlobalContext);
  const { _id, date, header, comment } = data;
  const navigation = useNavigation();

  const handleView = () => {
    navigation.navigate('viewnote', { data });
  };


    //soft delet
  const handleDelete = async () => {
    const response = await fetch('http://localhost:3000/notes/delete/' + _id, {
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
      console.log('Note was deleted');
      navigation.navigate('dailynotes', { 'refresh': true });
    }
  }
  return (
    <View
      style={{ backgroundColor: '#F3F3F7' }}>
      <View style={styles.row}>
        <View style={styles.note}>
          <Text style={{ fontWeight: 'bold' }}>{header}</Text>
          <Text style={{ fontSize: 12 }}>Date: {date}</Text>
          <Text style={{ fontSize: 12 }}>Comment: {comment}</Text>
        </View>

        <View style={styles.edges}>
          <TouchableHighlight
            onPress={handleView}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>View</Text>
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
  note: {
    flexDirection: 'column',
    paddingLeft: 5,
    flex: 8,
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
  }
});

export default Note;