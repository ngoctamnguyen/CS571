import { Text, View, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import { useState } from "react";

const Signup = ({ setSigning }) => {
    const [user, setUser] = useState({ fullname: '', email: '', password: '', phone: '', address: '' });
    const [message, setMessage] = useState("");
    const [showMessage, setshowMessage] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);

    const handleSubmit = async () => {
        if (user.email === "" && user.password === "") {
            setMessage("Must enter email and password");
            setshowMessage(true);
            return
        }
        console.log(user);
        const response = await fetch('http://localhost:3000/users/add', {
            method: 'POST',
            headers: {
                Accept: 'application/lson',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        console.log(response)
        if (response.status === 200) {
            setSigning(true);
        }

    }

    const hanldeSignup = () => {
        setSigning(true);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sign Up</Text>
            <TextInput
                style={styles.input}
                onChangeText={(string) => setUser({ ...user, fullname: string })}
                placeholder="full name..."
            />
            <TextInput
                style={styles.input}
                onChangeText={(string) => setUser({ ...user, email: string })}
                placeholder="email..."
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
                placeholder="phone..."
            />
            <TextInput
                style={styles.input}
                onChangeText={(string) => setUser({ ...user, address: string })}
                placeholder="address..."
            />
            <TouchableHighlight
                onPress={handleSubmit}
                style={styles.button}
                underlayColor="#5398DC">
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
            <Text style={styles.warning}>
                {showMessage && message}
            </Text>
            <Text>
                Have an account?
                <TouchableHighlight style={styles.signup_btn}
                    onPress={hanldeSignup}
                    //style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableHighlight>
            </Text>
        </View>

    )
}

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

export default Signup;