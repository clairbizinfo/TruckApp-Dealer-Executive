import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../BottomTabs/BottomTabs';
import { RootStackParamList } from '../../types';
import Profile from '../../screens/Profile/Profile';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DashboardScreenNavigator from '../DashboardNavigation/DashboardNavigation';
import EnquiryScreenNavigator from '../EnquiryNavigation/EnquiryNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={DashboardScreenNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Enquiry" component={EnquiryScreenNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}
