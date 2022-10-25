import { StyleSheet, View, Text, Image } from 'react-native';
import { useState } from 'react';

const ViewFood = ({ route, navigation }) => {


    const [food, setFood] = useState(route.params.data);
    console.log(food)

    return (
        <View>
            <View style={styles.images}>
                <Image source={{ uri: food.image }} style={{ height: 80, width: 80, borderRadius: 30 }} />
            </View>
            <View style={styles.container}>
                <Text>Food name: {food.foodname}</Text>
                <Text>Origin: {food.origine}</Text>
                <Text>Price: {food.price}</Text>
                <Text>Date: {food.date}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    images: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 20,
        paddingTop: 10,
        minWidth: 50,
    },
    container: {
        paddingLeft: 30,
        fontSize: 25,
        color: '#444',
        textAlign: 'left',
        margin: 20,
    }
});

export default ViewFood;