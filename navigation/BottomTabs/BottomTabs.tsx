import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabParamList } from '../../types';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DashboardScreenNavigator from '../DashboardNavigation/DashboardNavigation';
import EnquiryScreenNavigator from '../EnquiryNavigation/EnquiryNavigation';
import AddTruckScreenNavigator from '../AddTruckNavigation/AddTruckNavigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelStyle: styles.label,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused }) => {
                    let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'circle-outline';

                    switch (route.name) {
                        case 'Home':
                            iconName = 'view-grid-outline';
                            break;
                        case 'Dashboard':
                            iconName = 'chart-box-outline';
                            break;
                        case 'Enquiry':
                            iconName = 'message-text-outline';
                            break;
                        case 'AddTruck':
                            iconName = 'plus-box-outline';
                            break;
                    }

                    return (
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons
                                name={iconName}
                                size={26}
                                color={focused ? '#1868fd' : '#8e8e93'}
                            />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreenNavigator} />
            <Tab.Screen name="Enquiry" component={EnquiryScreenNavigator} />
            <Tab.Screen name="AddTruck" component={AddTruckScreenNavigator} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        borderTopWidth: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 6,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: -2 },
    },

    label: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: '700',
    },
    iconContainer: {
        marginTop: 4,
    },
});
