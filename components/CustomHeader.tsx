import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
    onMenuPress?: () => void;
    onProfilePress?: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({ onMenuPress, onProfilePress }) => {

    const { user } = useAuth();

    const userName = user?.name || "User";
    const firstLetter = userName.charAt(0).toUpperCase();

    return (
        <View style={styles.container}>

            <View style={styles.leftSection}>

                <TouchableOpacity activeOpacity={0.7} onPress={onProfilePress}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{firstLetter}</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={styles.welcomeText}>Hi, Welcome Back!</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onMenuPress}
                style={styles.iconButton}
            >
                <MaterialIcons name="menu" size={30} color="#ffffff" />
            </TouchableOpacity>

        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        paddingHorizontal: 0,
    },

    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: "#2196f3",
        justifyContent: "center",
        alignItems: "center",
    },

    avatarText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },

    welcomeText: {
        fontSize: 16,
        color: "#2196f3",
    },

    userName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#495057",
        marginTop: -2,
    },

    iconButton: {
        padding: 10,
        backgroundColor: "#2196f3",
        borderRadius: 50,
    },
});
