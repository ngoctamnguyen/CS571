import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState, useContext, useEffect } from 'react';

import GlobalContext from '../GlobalContext';

const Users = ({ route, navigation }) => {

    const [user, setUser] = useState({});
    const { token } = useContext(GlobalContext);

    const getUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
            })
            const data = await response.json();
            console.log(data);
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    //refresh list after add, edit...
    useEffect(() => {
        if (route.params && route.params.refresh) {
            getUser();
        }
    }, [route.params]);

    const handleEdit = () => {
        navigation.navigate('edituser', {user})
    }

    return (
        <View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontWeight: 'bold', margin: 10    }}>User Profile</Text>
                <View >
                    <TouchableOpacity
                        onPress={handleEdit}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Edit user</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text>Fullname: {user.fullname}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phone}</Text>
                <Text>Address: {user.address}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        fontSize: 25,
        color: '#444',
        textAlign: 'left',
        margin: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        margin: 10,
        backgroundColor: '#fff',
        height: 20,
        width: 70,
      },
      buttonText: {
        color: '#0066CC',
        fontSize: 12,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }
});

export default Users;