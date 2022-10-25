import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import DialogButton from "react-native-dialog/lib/Button";

import GlobalContext from '../GlobalContext';

import Note from "./Note";

const DailyNotes = ({ route, navigation }) => {

    const [notes, setNotes] = useState([]);
    const {token} = useContext(GlobalContext);

    const getNotes = async () => {
        try {
            const response = await fetch('http://localhost:3000/notes', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
            })
            const data = await response.json();
            setNotes(data.filter((item) => item.delete === false));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNotes();
    }, []);

    const handleAdd = () => {
        navigation.navigate('addnote');
    }

    //refresh list after add, edit...
    useEffect(() => {
        if (route.params && route.params.refresh) {
            getNotes();
        }
    },[route.params])

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <View >
                    <TouchableHighlight
                        onPress={handleAdd}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Add note</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <FlatList
                data={notes}
                renderItem={({ item }) => <Note data={item} />}
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

export default DailyNotes;