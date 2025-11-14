import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/index';
import Enquiry from '../../screens/Enquiry/Enquiry';
import AddEnquiry from '../../screens/Enquiry/AddForm';
import EnquiryDetails from '../../screens/Enquiry/EnquiryDetails';

const EnquiryScreenStack = createNativeStackNavigator<RootStackParamList>();

export default function EnquiryScreenNavigator() {
    return (
        <EnquiryScreenStack.Navigator initialRouteName="EnquiryScreen" screenOptions={{
            headerShown: true,
            headerTintColor: '#2196f3',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: '600',
            },
            headerShadowVisible: false,
        }}>
            <EnquiryScreenStack.Screen name="EnquiryScreen" component={Enquiry} options={{ title: "Enquiries" }} />
            <EnquiryScreenStack.Screen name="AddEnquiry" component={AddEnquiry} options={{ headerShown: true, title: "Add Enquiry" }} />
            <EnquiryScreenStack.Screen name='EnquiryDetails' component={EnquiryDetails} options={{ headerShown: true, title: "Enquiry Details" }} />
        </EnquiryScreenStack.Navigator>
    );
}