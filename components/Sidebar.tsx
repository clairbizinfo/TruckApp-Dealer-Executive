import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Modal,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface SidebarProps {
    visible: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClose }) => {
    const navigation = useNavigation();
    const { token, logout } = useAuth();

    const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleNavigate = (route: string) => {
        onClose();
        navigation.navigate(route as never);
    };

    const handleLogout = async () => {
        onClose();
        await logout();
        Alert.alert('Logged Out Successfully ');
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            {/* Overlay */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            {/* Center Modal */}
            <View style={styles.centerContainer}>
                <Animated.View
                    style={[
                        styles.modalBox,
                        {
                            transform: [{ scale: scaleAnim }],
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <Text style={styles.title}>Menu</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Profile')}
                    >
                        <Feather name="user" size={20} color="#6c757d" />
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Dashboard')}
                    >
                        <MaterialCommunityIcons name="chart-box-outline" size={24} color="#6c757d" />
                        <Text style={styles.menuText}>Dashboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Enquiry')}
                    >
                        <MaterialCommunityIcons name="message-text-outline" size={24} color="#6c757d" />
                        <Text style={styles.menuText}>Enquiry</Text>
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
                </Animated.View>
            </View>
        </Modal>
    );
};

export default Sidebar;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.50)',
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    modalBox: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        color: '#2196f3',
        paddingBottom: 10,
        borderBottomColor: "#e9ecef",
        borderBottomWidth: 0.5
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },

    menuText: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 10,
        color: '#6c757d',
    },

    logoutButton: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 14,
    },

    logoutText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#e63946',
        marginLeft: 10,
    },
});
