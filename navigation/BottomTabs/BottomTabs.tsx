import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabParamList } from '../../types';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DashboardScreenNavigator from '../DashboardNavigation/DashboardNavigation';
import EnquiryScreenNavigator from '../EnquiryNavigation/EnquiryNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,

                // Active & inactive tint colors (applies to both icon + label)
                tabBarActiveTintColor: '#2196f3',
                tabBarInactiveTintColor: '#6c757d',

                tabBarLabelStyle: styles.label,

                tabBarStyle: {
                    ...styles.tabBar,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom > 0 ? insets.bottom - 2 : 6,
                },

                tabBarIcon: ({ focused, color }) => {
                    let iconName: keyof typeof MaterialCommunityIcons.glyphMap =
                        'circle-outline';

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
                                color={color}
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
        borderTopWidth: 1,
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,

        // REMOVE ALL SHADOWS
        elevation: 0,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        borderTopColor: "#e9ecef",
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
