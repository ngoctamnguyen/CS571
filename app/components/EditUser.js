import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useContext, useState } from 'react';
import GlobalContext from '../GlobalContext';



const EditUser = ({ route, navigation }) => {

    const { token } = useContext(GlobalContext);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [user, setUser] = useState(route.params.user);

    const hanldeEdit = async () => {
        const response = await fetch('http://localhost:3000/users/edit/', { //update edit by email. that get in authorization in backend
            method: 'PUT',
            headers: {
                Accept: 'application/lson',
                'Content-type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(user)
        });
        if (response.status === 200) {
            console.log('Edit user success!');
            navigation.navigate('users', { 'refresh': true });
        }
    }

    return (
        <View style={styles.addReview}>
            <Text>Edit User</Text>
            <TextInput
                style={styles.input}
                onChangeText={(string) => setUser({ ...user, fullname: string })}
                value={user.fullname}
                placeholder="full name..."
            />
            <TextInput
                style={styles.input}
                secureTextEntry={passwordVisible}
                right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                onChangeText={(string) => setUser({ ...user, password: string })}
                placeholder="password..."
            />
            <TextInput
                style={styles.input}
                onChangeText={(string) => setUser({ ...user, phone: string })}
                value={user.phone}
                placeholder="phone..."
            />
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={3}
                onChangeText={(string) => setUser({ ...user, address: string })}
                value={user.address}
                placeholder="address..."
            />
            <TouchableHighlight
                onPress={hanldeEdit}
                style={styles.button}
                underlayColor="#5398DC">
                <Text style={styles.buttonText}>Submit</Text>
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

export default EditUser;