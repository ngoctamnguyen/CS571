import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import FoodList from './FoodList';
import AddFood from './AddFood';
import EditFood from './EditFood';
import ViewFood from './ViewFood';
import DailyNotes from './DailyNotes';
import ViewNote from './ViewNote';
import AddNotes from './AddNotes';
import Users from './Users';
import EditUser from './EditUser';
import AddUser from './Signup';


export default function Home() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const getToken = async () => {
            try {
                const data = await AsyncStorage.getItem('@USER');
                if (data !== null) {
                    setToken(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getToken();
    }, []);

    const Tab = createMaterialBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    const Foods_Home = () => {
        return (
            <Stack.Navigator initialRouteName='foods' options={{ title: 'Foods' }}>
                <Stack.Screen name={'foodlist'} component={FoodList} options={{ headerShown: false }} />
                <Stack.Screen name={'addfood'} component={AddFood} options={{ title: 'Add food' }} />
                <Stack.Screen name={'editfood'} component={EditFood} options={{ title: 'Edit food' }} />
                <Stack.Screen name={'viewfood'} component={ViewFood} options={{ title: 'View food' }} />
            </Stack.Navigator>
        );
    }

    const DailyNotes_Home = () => {
        return (
            <Stack.Navigator initialRouteName='dailynotes'>
                <Stack.Screen name='dailynotes' component={DailyNotes} options={{ headerShown: false }} />
                <Stack.Screen name='addnote' component={AddNotes} options={{ title: 'Add note' }} />
                <Stack.Screen name='viewnote' component={ViewNote} options={{ title: 'View note' }} />
            </Stack.Navigator>
        )
    }

    const Profile = () => {
        return (
            <Stack.Navigator initialRouteName='users'>
                <Stack.Screen name='users' component={Users} options={{ headerShown: false }}/>
                <Stack.Screen name='edituser' component={EditUser} />
            </Stack.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <View style={{ width: 250, height: 500 }}>
                <Tab.Navigator initialRouteName='foodList'>
                    <Tab.Screen name={'foods_home'} component={Foods_Home}
                        options={{
                            title: 'Foods',
                            tabBarIcon: (tabBarInfo) => <MaterialCommunityIcons name='home' size={24} color={tabBarInfo.color} />
                        }} />
                    <Tab.Screen name={'dailynotes_home'} component={DailyNotes_Home}
                        options={{
                            title: 'Daily Notes',
                            tabBarIcon: tabBarInfo => <MaterialCommunityIcons name='information' size={24} color={tabBarInfo.color} />
                        }} />
                    <Tab.Screen name={'profile'} component={Profile}
                        options={{
                            title: 'Profile',
                            tabBarIcon: tabBarInfo => <MaterialCommunityIcons name='information' size={24} color={tabBarInfo.color} />
                        }} />
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
