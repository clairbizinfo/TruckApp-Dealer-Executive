import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import {
    getManufacturersWithModels,
    submitEnquiry
} from '../../services/EnquiryService/enquiryService';

const AddEnquiry = () => {
    const navigation = useNavigation<any>();

    // Form States
    const [enquiryType, setEnquiryType] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [pin, setPin] = useState('');
    const [owned, setOwned] = useState('');
    const [finance, setFinance] = useState('');
    const [freeVehicle, setFreeVehicle] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');

    // Lists
    const [manufacturerList, setManufacturerList] = useState<any[]>([]);
    const [modelList, setModelList] = useState<string[]>([]);

    // Loading States
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const mountedRef = useRef(true);

    // Network Listener
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

    // Fetch manufacturer list
    useEffect(() => {
        fetchManufacturers();
    }, []);

    const fetchManufacturers = async () => {
        if (isConnected === false) {
            Alert.alert('No Internet', 'Please check your network connection.');
            return;
        }

        try {
            setLoading(true);
            const data = await getManufacturersWithModels();
            if (Array.isArray(data)) setManufacturerList(data);
            else setManufacturerList([]);
        } catch (err) {
            console.log('Error fetching manufacturers:', err);
            Alert.alert('Error', 'Unable to load manufacturer list.');
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    };

    // Form Submit
    const handleSubmit = async () => {
        if (!enquiryType || !name.trim() || !mobile.trim()) {
            Alert.alert('Error', 'Please fill all required fields.');
            return;
        }

        if (mobile.length !== 10) {
            Alert.alert('Error', 'Enter a valid 10-digit mobile number.');
            return;
        }

        if (pin && pin.length !== 6) {
            Alert.alert('Error', 'Enter a valid 6-digit PIN code.');
            return;
        }

        if (!manufacturer || !model) {
            Alert.alert('Error', 'Please select Manufacturer and Model.');
            return;
        }

        if (isConnected === false) {
            Alert.alert('No Internet', 'Cannot submit enquiry without internet.');
            return;
        }

        const payload = {
            financed: Number(finance) || 0,
            free: Number(freeVehicle) || 0,
            owned: Number(owned) || 0,

            vehicleDetails: {
                oem: manufacturer,
                model: model,
                usedOrNew: enquiryType,
            },

            userDetails: {
                mobileNo: mobile,
                userName: name,
                address: {
                    pinCode: pin,
                }
            }
        };

        try {
            setSubmitting(true);
            await submitEnquiry(payload);
            Alert.alert('Success', 'Enquiry submitted successfully!');
            navigation.goBack();
        } catch (err) {
            console.log('Submit Error:', err);
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            if (mountedRef.current) setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    {loading ? (
                        <View style={{ marginTop: 20 }}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                        <>
                            {/* Enquiry Type */}
                            <Text style={styles.label}>Enquiry Type</Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={enquiryType}
                                    onValueChange={setEnquiryType}
                                >
                                    <Picker.Item label="Select Type" value="" />
                                    <Picker.Item label="New" value="New" />
                                    <Picker.Item label="Used" value="Used" />
                                </Picker>
                            </View>

                            {/* Name */}
                            <Text style={styles.label}>Customer Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                value={name}
                                onChangeText={setName}
                            />

                            {/* Mobile */}
                            <Text style={styles.label}>Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter mobile no"
                                keyboardType="numeric"
                                maxLength={10}
                                value={mobile}
                                onChangeText={setMobile}
                            />

                            {/* PIN */}
                            <Text style={styles.label}>Pin Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter pin code"
                                keyboardType="numeric"
                                maxLength={6}
                                value={pin}
                                onChangeText={setPin}
                            />

                            {/* Owned */}
                            <Text style={styles.label}>Owned Vehicles</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                keyboardType="numeric"
                                value={owned}
                                onChangeText={setOwned}
                            />

                            {/* Finance */}
                            <Text style={styles.label}>Finance Vehicles</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                keyboardType="numeric"
                                value={finance}
                                onChangeText={setFinance}
                            />

                            {/* Free Vehicles */}
                            <Text style={styles.label}>Free Vehicles</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                keyboardType="numeric"
                                value={freeVehicle}
                                onChangeText={setFreeVehicle}
                            />

                            {/* Manufacturer */}
                            <Text style={styles.label}>Manufacturer</Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={manufacturer}
                                    onValueChange={val => {
                                        setManufacturer(val);
                                        const found = manufacturerList.find(
                                            item => item.brand === val
                                        );
                                        setModelList(found ? found.models : []);
                                        setModel('');
                                    }}
                                >
                                    <Picker.Item label="Select Manufacturer" value="" />
                                    {manufacturerList.map((item, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={item.brand}
                                            value={item.brand}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            {/* Model */}
                            <Text style={styles.label}>Model</Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={model}
                                    onValueChange={setModel}
                                >
                                    <Picker.Item label="Select Model" value="" />
                                    {modelList.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>

                            {/* Submit */}
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitText}>Submit</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddEnquiry;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 17,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#e9ecef',
        fontSize: 14,
        fontWeight: '500',
        color: '#495057',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
        paddingHorizontal: 4,
    },
    submitBtn: {
        backgroundColor: '#1868fd',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50,
    },
    submitText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});
