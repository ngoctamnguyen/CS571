import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, FlatList, TouchableHighlight } from "react-native";

import GlobalContext from '../GlobalContext';

import Food from "./Food";

const FoodList = ({ route, navigation }) => {

    const [foods, setFoods] = useState([]);
    const {token, setToken} = useContext(GlobalContext);

    const getFoods = async () => {
        try {
            const response = await fetch('http://localhost:3000/foods', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
            })
            const data = await response.json();
            setFoods(data.filter((f) => f.delete === false));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getFoods();
    }, []);

    const handleAddfood = () => {
        navigation.navigate('addfood');
    }

    //refresh list after add, edit...
    useEffect(() => {
        if (route.params && route.params.refresh) {
            getFoods();
        }
    },[route.params])

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <View >
                    <TouchableHighlight
                        onPress={handleAddfood}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Add food</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <FlatList
                data={foods}
                renderItem={({ item }) => <Food data={item} />}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

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

export default FoodList;