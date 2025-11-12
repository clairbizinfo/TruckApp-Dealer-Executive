import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/index';
import Enquiry from '../../screens/Enquiry/Enquiry';

const EnquiryScreenStack = createNativeStackNavigator<RootStackParamList>();

export default function EnquiryScreenNavigator() {
    return (
        <EnquiryScreenStack.Navigator initialRouteName="Enquiry" screenOptions={{ headerShown: false }}>
            <EnquiryScreenStack.Screen name="Enquiry" component={Enquiry} />
        </EnquiryScreenStack.Navigator>
    );
}