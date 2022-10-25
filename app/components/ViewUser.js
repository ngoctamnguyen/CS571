import { StyleSheet, View, Text, Image } from 'react-native';
import { useState } from 'react';

const ViewUser = ({ route, navigation }) => {


    const [note, setNote] = useState(route.params.data);

    return (
        <View>
            <View style={styles.container}>
                <Text>Date: {note.date}</Text>
                <Text>Header: {note.header}</Text>
                <Text>Price: {note.comment}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        fontSize: 25,
        color: '#444',
        textAlign: 'left',
        margin: 20,
    }
});

export default ViewUser;