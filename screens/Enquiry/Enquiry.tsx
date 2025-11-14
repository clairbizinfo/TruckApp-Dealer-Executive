import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../Login/Login';
import { useNavigation } from '@react-navigation/native';
import { getAllEnquiries } from '../../services/EnquiryService/enquiryService';
import NetInfo from '@react-native-community/netinfo';
import { MaterialIcons } from '@expo/vector-icons';


type EnquiryItem = {
    id: string | number;
    vehicleDetails?: {
        oem?: string;
        model?: string;
    };
    userDetails?: {
        mobileNo?: string;
        userName?: string;
    };
    inquiryDate?: string;
};

const Enquiry = () => {

    const { token, isLoading: authLoading } = useAuth();
    const [loginVisible, setLoginVisible] = useState(false);
    const navigation = useNavigation<any>();

    const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
    const [listLoading, setListLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isConnected, setIsConnected] = useState<boolean | null>(null);

    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        const unsubscribe = NetInfo.addEventListener(state => {
            if (mountedRef.current) setIsConnected(state.isConnected);
        });

        NetInfo.fetch().then(state => {
            if (mountedRef.current) setIsConnected(state.isConnected);
        });

        return () => {
            mountedRef.current = false;
            unsubscribe();
        };
    }, []);

    const fetchEnquiries = async (showLoader = true) => {
        if (!token) return;

        // don't call API if offline
        if (isConnected === false) {
            Alert.alert('No Internet', 'Please check your network connection and try again.');
            return;
        }

        try {
            if (showLoader) setListLoading(true);
            const response = await getAllEnquiries();

            // defensive checks: ensure array
            if (Array.isArray(response)) {
                if (mountedRef.current) setEnquiries(response);
            } else {
                // sometimes API can send wrapped object
                if (response && Array.isArray((response as any).data)) {
                    if (mountedRef.current) setEnquiries((response as any).data);
                } else {
                    // unexpected shape
                    if (mountedRef.current) setEnquiries([]);
                }
            }
        } catch (error: any) {
            console.log('[Enquiry] fetchEnquiries error ->', error);
            Alert.alert('Error', 'Unable to load enquiries. Please try again.');
        } finally {
            if (showLoader && mountedRef.current) setListLoading(false);
        }
    };

    useEffect(() => {
        // fetch when token becomes available
        if (token) fetchEnquiries(true);
        else {
            // clear data when logged out
            setEnquiries([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const onRefresh = async () => {
        if (!token) return;
        setRefreshing(true);
        await fetchEnquiries(false);
        if (mountedRef.current) setRefreshing(false);
    };

    if (authLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );
    }

    if (!token) {
        return (
            <View style={styles.container}>
                <View style={styles.alertBox}>
                    <Text style={styles.alertText}>Login to access enquiries</Text>
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={() => setLoginVisible(true)}>
                    <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>

                <LoginModal visible={loginVisible} onClose={() => setLoginVisible(false)} />
            </View>
        );
    }

    const renderItem = ({ item }: { item: EnquiryItem }) => {
        const dateStr = item.inquiryDate
            ? (() => {
                try {
                    const d = new Date(item.inquiryDate);
                    if (isNaN(d.getTime())) return 'Not Available';
                    return d.toLocaleDateString();
                } catch {
                    return item.inquiryDate?.substring(0, 10) ?? 'Not Available';
                }
            })()
            : 'Not Available';

        return (

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("EnquiryDetails", { enquiry: item })}
            >
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {item.vehicleDetails?.oem ?? ''} {item.vehicleDetails?.model ?? ''}
                        </Text>

                        <Text style={styles.cardDateRight}>{dateStr}</Text>
                    </View>

                    <View style={styles.row}>
                        <MaterialIcons name="person" size={18} color="#6c757d" />
                        <Text style={styles.cardDate}>{item.userDetails?.userName ?? '-'}</Text>
                    </View>

                    <View style={styles.row}>
                        <MaterialIcons name="call" size={18} color="#6c757d" />
                        <Text style={styles.cardDate}>{item.userDetails?.mobileNo ?? '-'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    };

    const keyExtractor = (item: EnquiryItem, index: number) => {
        return (item.id !== undefined && item.id !== null ? String(item.id) : String(index));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddEnquiry')}>
                <Text style={styles.addBtnText}>Add Enquiry</Text>
            </TouchableOpacity>

            {listLoading ? (
                <View style={{ paddingTop: 20 }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    data={enquiries}
                    keyExtractor={keyExtractor}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
                    renderItem={renderItem}
                    ListEmptyComponent={() => (
                        <View>
                            <Text style={styles.noData}>No enquiries found</Text>
                        </View>
                    )}
                />
            )}

            <LoginModal visible={loginVisible} onClose={() => setLoginVisible(false)} />
        </View>
    );
};

export default Enquiry;

const styles = StyleSheet.create({


    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16, paddingBottom: 25 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loading: { fontSize: 18, fontWeight: '600', color: '#555' },

    alertBox: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#FFF8E1',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
    },

    alertText: { color: '#B8860B', fontSize: 15, fontWeight: '400' },

    loginBtn: {
        width: "100%",
        backgroundColor: '#0066ff',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 8,
        textAlign: 'center',
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
    },

    loginBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

    addBtn: {
        backgroundColor: '#0066ff',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 4.6,
        elevation: 6,
    },

    addBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#f1f3f4',
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#212529',
        flex: 1,
    },

    cardDateRight: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6c757d',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6,
    },

    cardDate: {
        fontSize: 13,
        color: '#6c757d',
        fontWeight: '500',
    },

    noData: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#777' },
});
