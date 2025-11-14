import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/index';
import Dashboard from '../../screens/Dashboard/Dashboard';

const DashboardScreenStack = createNativeStackNavigator<RootStackParamList>();

export default function DashboardScreenNavigator() {
    return (
        <DashboardScreenStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: true }}>
            <DashboardScreenStack.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard" }} />
        </DashboardScreenStack.Navigator>
    );
}