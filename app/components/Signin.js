import { StyleSheet, View, Text, TouchableHighlight, TextInput } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../GlobalContext';

const Signin = ({ setSigning }) => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [message, setMessage] = useState("");
    const [showMessage, setshowMessage] = useState(false)
    const { token, setToken } = useContext(GlobalContext);

    const hanldeSubmit = async () => {
        console.log('cs571 ', user)
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/lson',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        console.log(response)
        if (response.status === 200) {
            const data = await response.json();
            await AsyncStorage.setItem('@USER', data);
            setToken(data);
        } else {
            if (response.status === 400) {
                setMessage("Invalid email and password");
                setshowMessage(true);
            } else {
                if (response.status === 401) {
                    setMessage("Please input email and password");
                    setshowMessage(true);
                }
            }
        }
    }

    useEffect(() => {
        console.log(' login ', user)
    }, [])
    const hanldeSignup = () => {
        setSigning(false);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontWeight: 'bold'}}>Login</Text>
            <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={(string) => setUser({ ...user, email: string })}
                placeholder="email.."
            />
            <TextInput
                style={styles.input}
                value={user.password}
                secureTextEntry={passwordVisible}
                right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                onChangeText={(string) => setUser({ ...user, password: string })}
                placeholder="password..."
            />
            <TouchableHighlight
                onPress={hanldeSubmit}
                style={styles.button}
                underlayColor="#5398DC">
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
            <Text style={styles.warning}>
                {showMessage && message}
            </Text>
            <Text>
                Don't have an account?
                <TouchableHighlight style={styles.signup_btn}
                    onPress={hanldeSignup}
                    //style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableHighlight>
            </Text>
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
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 20,
        width: 200,
    },
    signup_btn: {
        paddingLeft: 5,
        color: 'blue'
    },
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
    },
    warning: {
        color: 'red'
    }
});

export default Signin;