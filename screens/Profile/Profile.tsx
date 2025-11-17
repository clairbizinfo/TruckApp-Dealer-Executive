import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TextInput, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../screens/Login/Login';

import { getProfileDetails, updateProfileDetails } from '../../services/ProfileServices/profileServices';

const Profile = () => {
    const { token, logout, isLoading } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        pincode: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);

    // =============================
    //   FETCH PROFILE DETAILS
    // =============================
    const loadProfile = async () => {
        try {
            setLoadingProfile(true);
            const response = await getProfileDetails();

            setFormData({
                fullName: response?.userName || "",
                mobile: response?.mobileNo || "",
                pincode: response?.address?.pinCode || ""
            });
        } catch (err: any) {
            Alert.alert("Error", err?.message || "Failed to load profile");
        } finally {
            setLoadingProfile(false);
        }
    };

    useEffect(() => {
        if (token) loadProfile();
    }, [token]);

    // =============================
    //   UPDATE PROFILE DETAILS
    // =============================
    const handleUpdateOrSave = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        try {
            const payload = {
                userName: formData.fullName,
                address: {
                    pinCode: formData.pincode
                }
            };

            await updateProfileDetails(payload);

            Alert.alert("Success", "Profile updated successfully");
            setIsEditing(false);
        } catch (err: any) {
            Alert.alert("Update Failed", err?.message || "Could not update profile");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            Alert.alert("Logout Successful");
        } catch (err: any) {
            Alert.alert("Logout failed", err?.message || "Could not logout");
        }
    };

    if (isLoading || loadingProfile) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const avatarLetter = formData.fullName?.charAt(0)?.toUpperCase() || "U";

    return (
        <View style={styles.container}>
            {token ? (
                <>
                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarCircle}>
                            <Text style={styles.avatarText}>{avatarLetter}</Text>
                        </View>
                        <Text style={styles.avatarName}>{formData.fullName}</Text>
                    </View>

                    {/* Profile Form */}
                    <View style={styles.form}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={[styles.input, !isEditing && styles.disabledInput]}
                            value={formData.fullName}
                            editable={isEditing}
                            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                        />

                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={formData.mobile}
                            editable={false} // NOT editable as per API rules
                        />

                        <Text style={styles.label}>Pin Code</Text>
                        <TextInput
                            style={[styles.input, !isEditing && styles.disabledInput]}
                            value={formData.pincode}
                            editable={isEditing}
                            keyboardType="number-pad"
                            onChangeText={(text) => setFormData({ ...formData, pincode: text })}
                        />

                        {/* Update / SaveButton */}
                        <TouchableOpacity style={styles.primaryButton} onPress={handleUpdateOrSave}>
                            <Text style={styles.primaryButtonText}>
                                {isEditing ? "Save" : "Update"}
                            </Text>
                        </TouchableOpacity>

                        {/* Logout Button */}
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>

                    </View>
                </>
            ) : (
                <>
                    <View style={styles.form}>
                        <Text style={styles.info}>You are not logged in.</Text>

                        {/* Login Button */}
                        <TouchableOpacity style={styles.primaryButton} onPress={() => setShowLoginModal(true)}>
                            <Text style={styles.primaryButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerDeveloped}>Developed by</Text>
                <Image
                    source={require('../../assets/clairvoyant_logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

export default Profile;

/* ================================
                STYLES
================================ */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingTop: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    /* Avatar Section */
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    avatarCircle: {
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 40,
        color: 'white',
        fontWeight: '500',
    },
    avatarName: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: '600',
        color: '#495057',
    },
    form: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 14,
        color: '#495057',
        marginTop: 12,
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        color: '#495057',
        backgroundColor: '#ffffff',
        fontWeight: '600',
        paddingVertical: 16,
    },
    disabledInput: {
        backgroundColor: '#ffffff',
        color: '#6c757d'
    },
    info: {
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
        color: '#495057',
        fontWeight: "400"
    },

    /* FOOTER */
    footer: {
        position: 'absolute',
        bottom: 50,
        width: "100%",
        alignItems: 'center',

    },
    footerDeveloped: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 5,
    },
    logo: {
        width: 100,
        height: 40,
    },

    primaryButton: {
        backgroundColor: '#2196f3',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 18,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },

    logoutButton: {
        backgroundColor: '#2196f3',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
