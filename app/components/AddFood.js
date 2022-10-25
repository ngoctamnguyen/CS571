import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalContext from '../GlobalContext';

const AddFood = ({ navigation }) => {

  const { token } = useContext(GlobalContext);

  const [food, setFood] = useState({
    foodname: '',
    origine: '',
    price: '',
    date: '',
    image: '',
    delete: false
  });

  const hanldeAddFood = async () => {
    const response = await fetch('http://localhost:3000/foods/add', {
      method: 'POST',
      headers: {
        Accept: 'application/lson',
        'Content-type': 'application/json',
        'Authorization': 'bearer ' + token
      },
      body: JSON.stringify(food)
    });
    console.log(response)
    if (response.status === 200) {
      console.log('Save food success!');
      navigation.navigate('foodlist', { 'refresh': true });
    }
  }

  return (
    <View style={styles.addReview}>
      <Text>Add Food</Text>
      <DatePicker
        style={styles.datePicker}
        selected={food.date}
        popperPlacement="top-end"
        onSelect={(string) => setFood({ ...food, date: string })} //when day is clicked
        //onChange={(string) => setFood({ ...food, date: string })} //only when value has changed
        placeholderText='select date...'
      />
      <TextInput
        style={styles.input}
        onChangeText={(string) => setFood({ ...food, foodname: string })}
        value={food.foodname}
        placeholder="food name..."
      />
      <TextInput
        style={styles.input}
        onChangeText={(string) => setFood({ ...food, origine: string })}
        value={food.origine}
        placeholder="origine..."
      />
      <TextInput
        style={styles.input}
        onChangeText={(string) => setFood({ ...food, price: string })}
        value={food.price}
        placeholder="price..."
      />
      <TextInput
        style={styles.input}
        onChangeText={(string) => setFood({ ...food, date: string })}
        value={food.date}
        placeholder="date..."
      />
      <TextInput
        style={styles.input}
        onChangeText={(string) => setFood({ ...food, image: string })}
        value={food.image}
        placeholder="image link..."
      />

      <TouchableHighlight
        onPress={hanldeAddFood}
        style={styles.button}
        underlayColor="#5398DC">
        <Text style={styles.buttonText}>Add food</Text>
      </TouchableHighlight>
    </View>

  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 10,
  },
  addReview: {
    fontSize: 25,
    color: '#444',
    textAlign: 'center',
    margin: 20,
  },
  datePicker: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    fontSize: 12
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
  },
  rating: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    marginVertical: 40,
  },
  stars: {
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    padding: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0066cc',
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  }
});

export default AddFood;