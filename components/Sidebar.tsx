import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const { width } = Dimensions.get('window');

interface SidebarProps {
    visible: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClose }) => {
    const navigation = useNavigation();
    const slideAnim = React.useRef(new Animated.Value(-width)).current;
    const { token, logout } = useAuth();

    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const handleNavigate = (route: string) => {
        onClose();
        navigation.navigate(route as never);
    };

    const handleLogout = async () => {
        onClose();
        await logout();
        navigation.navigate('Login' as never);
    };

    return (
        <>
            {/* Overlay */}
            {visible && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* Sidebar */}
            <Animated.View
                style={[
                    styles.sidebar,
                    {
                        transform: [{ translateX: slideAnim }],
                    },
                ]}
            >
                <View style={styles.menuContainer}>
                    <Text style={styles.title}>Menu</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Profile')}
                    >
                        <Feather name="user" size={20} color="#212529" />
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Dashboard')}
                    >
                        <MaterialCommunityIcons name="chart-box-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Dashboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Used')}
                    >
                        <MaterialCommunityIcons name="message-text-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Enquiry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Sell')}
                    >
                        <MaterialCommunityIcons name="plus-box-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Add Truck</Text>
                    </TouchableOpacity>


                    {token && (
                        <TouchableOpacity
                            style={[styles.menuItem, styles.logoutButton]}
                            onPress={handleLogout}
                        >
                            <Feather name="log-out" size={20} color="#e63946" />
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>
        </>
    );
};

export default Sidebar;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 9999,
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width * 0.75,
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 70,
        paddingHorizontal: 20,
        zIndex: 10000,
    },
    menuContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 30,
        color: '#212529',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
        color: '#212529',
    },
    logoutButton: {
        marginTop: 10, // ✅ space below last link
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 14,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e63946',
        marginLeft: 10,
    },
});
