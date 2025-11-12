import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


interface HeaderProps {
    title?: string;
    onMenuPress?: () => void;
    onProfilePress?: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({ onMenuPress, onProfilePress }) => {

    return (
        <View style={styles.container}>
            {/* Left Menu Icon */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onMenuPress}
                style={styles.iconButton}
            >
                <MaterialIcons name="menu" size={26} color="black" />
            </TouchableOpacity>


            {/* Right Profile Icon */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onProfilePress}
                style={styles.iconButton}
            >
                <Image
                    source={require('../assets/user.png')}
                    style={styles.profileImage}
                />
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
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 50,
    },
    iconButton: {
        padding: 0,
        fontSize: 20,
    },
    profileImage: {
        width: 29,
        height: 29,
        borderRadius: 16,
    },
});
