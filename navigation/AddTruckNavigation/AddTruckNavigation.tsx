import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/index';
import AddTruck from '../../screens/AddTruck/AddTruck';

const AddTruckScreenStack = createNativeStackNavigator<RootStackParamList>();

export default function AddTruckScreenNavigator() {
    return (
        <AddTruckScreenStack.Navigator initialRouteName="AddTruck" screenOptions={{ headerShown: false }}>
            <AddTruckScreenStack.Screen name="AddTruck" component={AddTruck} />
        </AddTruckScreenStack.Navigator>
    );
}