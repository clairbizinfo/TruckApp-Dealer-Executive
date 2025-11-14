import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/index';
import Dashboard from '../../screens/Dashboard/Dashboard';

const DashboardScreenStack = createNativeStackNavigator<RootStackParamList>();

export default function DashboardScreenNavigator() {
    return (
        <DashboardScreenStack.Navigator
            initialRouteName="DashboardScreen"
            screenOptions={{
                headerShown: true,
                headerTintColor: '#2196f3', // <-- Title + back button color
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: '600',
                },
                 headerShadowVisible: false,
            }}
        >
            <DashboardScreenStack.Screen
                name="DashboardScreen"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                }}
            />
        </DashboardScreenStack.Navigator>
    );
}
