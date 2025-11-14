import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    RefreshControl
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getAllEnquiries } from '../../services/EnquiryService/enquiryService';

const Dashboard = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [inquiries, setInquiries] = useState([]);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token) {
            setLoading(false); // Stop loading immediately
            return;
        }
        fetchInquiries();
    }, [token]);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const response = await getAllEnquiries();
            setInquiries(response);
        } catch (err) {
            console.log(err);
            setError("Something went wrong while fetching enquiries.");
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        if (!token) return; // do nothing if not logged in
        setRefreshing(true);
        await fetchInquiries();
        setRefreshing(false);
    }, [token]);

    // --------------- NOT LOGGED IN UI ---------------
    if (!token) {
        return (
            <View style={styles.center}>
                <Text style={styles.blockedText}>
                    Dashboard cannot be accessed without login
                </Text>
            </View>
        );
    }

    // ---------------- LOADING UI ----------------
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // ---------------- DASHBOARD UI ----------------
    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Total Enquiries</Text>
                <Text style={styles.cardValue}>{inquiries.length}</Text>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#ffffff"
    },
    blockedText: {
        fontSize: 14,
        color: "#2196f3",
        fontWeight: "400",
        textAlign: "center"
    },
    card: {
        backgroundColor: "#edf2fb",
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        borderLeftWidth: 5,
        borderLeftColor: "#2196f3",
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2196f3"
    },
    cardValue: {
        fontSize: 40,
        fontWeight: "500",
        marginTop: 10,
        color: "#2196f3"
    },
    error: {
        marginTop: 10,
        color: "red",
        textAlign: "center",
    }
});

export default Dashboard;
