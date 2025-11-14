import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabParamList } from '../../types';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DashboardScreenNavigator from '../DashboardNavigation/DashboardNavigation';
import EnquiryScreenNavigator from '../EnquiryNavigation/EnquiryNavigation';

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
                    }

                    return (
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons
                                name={iconName}
                                size={26}
                                color={focused ? '#0066ff' : '#6c757d'}
                            />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreenNavigator} />
            <Tab.Screen name="Enquiry" component={EnquiryScreenNavigator} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 6,
    },

    label: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: '600',
    },
    iconContainer: {
        marginTop: 4,
    },
});
