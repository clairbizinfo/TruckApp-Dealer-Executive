import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../screens/Login/Login';

const Profile = () => {
    const { token, logout, isLoading } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            Alert.alert("Logout Successful");
        } catch (err: any) {
            Alert.alert('Logout failed', err?.message || 'Could not logout');
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            {token ? (
                <>
                    <Text style={styles.info}>You are logged in.</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <>
                    <Text style={styles.info}>You are not logged in.</Text>
                    <Button title="Login" onPress={() => setShowLoginModal(true)} />
                </>
            )}

            <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
    info: { fontSize: 16, marginBottom: 12 },
});
