import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useContext, useState } from 'react';
import GlobalContext from '../GlobalContext';

const AddNote = ({ navigation }) => {

    const { token } = useContext(GlobalContext);

    const [note, setNote] = useState({
        date: '',
        header: '',
        comment: '',
        delete: false
    });

    const hanldeAdd = async () => {
        const response = await fetch('http://localhost:3000/notes/add', {
            method: 'POST',
            headers: {
                Accept: 'application/lson',
                'Content-type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(note)
        });
        console.log(response)
        if (response.status === 200) {
            navigation.navigate('dailynotes', { 'refresh': true });
        }
    }

    return (
        <View style={styles.addReview}>
            <Text>Add note</Text>
            <TextInput
                style={styles.input}
                onChangeText={(string) => setNote({ ...note, date: string })}
                value={note.date}
                placeholder="date..."
            />
            <TextInput
                style={styles.input}
                onChangeText={(string) => setNote({ ...note, header: string })}
                value={note.header}
                placeholder="header..."
            />
            <TextInput
                style={styles.input}
                onChangeText={(string) => setNote({ ...note, comment: string })}
                multiline
                numberOfLines={7}
                value={note.comment}
                placeholder="comnent..."
            />
            <TouchableHighlight
                onPress={hanldeAdd}
                style={styles.button}
                underlayColor="#5398DC">
                <Text style={styles.buttonText}>Add note</Text>
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
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
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

export default AddNote;