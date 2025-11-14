import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Modal,
} from 'react-native';
import { registerMobile, validateOtp } from '../../services/AuthenticationService/authService';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
    visible: boolean;
    onClose: () => void;
}


const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
    const [mobileNo, setMobileNo] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const { setAuthToken } = useAuth();
    const otpRefs = useRef<Array<TextInput | null>>([]);

    const handleSendOtp = async () => {

        if (!mobileNo || mobileNo.length < 10) {
            Alert.alert('Invalid number', 'Please enter a valid mobile number');
            return;
        }

        try {
            setLoading(true);
            const resp = await registerMobile(`+91${mobileNo}`, name);
            console.log('Register mobile response in UI:', resp);
            if (resp && resp.id) {
                setId(resp.id);
                setOtpSent(true);
                Alert.alert('OTP Sent');
            } else {
                Alert.alert('Error', 'Failed to send OTP');
            }
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Could not send OTP');
        } finally {
            setLoading(false);
        }
    };


    const handleVerifyOtp = async () => {

        const otpValue = otp.join('');

        if (otpValue.length < 6) {
            Alert.alert('Missing OTP', 'Please enter the complete OTP');
            return;
        }

        if (!id) {
            Alert.alert('Error', 'Missing registration ID. Please resend OTP.');
            return;
        }

        try {
            setLoading(true);
            const resp = await validateOtp(id, `+91${mobileNo}`, otpValue);
            if (resp && resp.jwtToken) {
                await setAuthToken(resp.jwtToken);
                Alert.alert('Login Successful');
                setMobileNo('');
                setOtp(['', '', '', '', '', '']);
                setId(null);
                setOtpSent(false);
                onClose();
            } else {
                Alert.alert('Invalid OTP', 'Please try again');
            }
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Login</Text>

                    {/* ✅ Label full name */}
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            keyboardType="default"
                            value={name}
                            onChangeText={setName}
                            editable={!otpSent}
                        />
                    </View>

                    {/* ✅ Label for Mobile Number */}
                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.prefixContainer}>
                            <Text style={styles.prefixText}>+91</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            keyboardType="phone-pad"
                            maxLength={10}
                            value={mobileNo}
                            onChangeText={setMobileNo}
                            editable={!otpSent}
                        />
                    </View>

                    {!otpSent ? (
                        <TouchableOpacity
                            style={[styles.button, loading && styles.disabledButton]}
                            onPress={handleSendOtp}
                            disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send OTP</Text>}
                        </TouchableOpacity>
                    ) : (
                        <>
                            {/* ✅ Label for OTP */}
                            <Text style={[styles.label, { marginTop: 10 }]}>Enter OTP</Text>
                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(el) => { otpRefs.current[index] = el; }}
                                        style={styles.otpBox}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChangeText={(value) => handleOtpChange(value, index)}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0)
                                                otpRefs.current[index - 1]?.focus();
                                        }}
                                    />
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[styles.button, loading && styles.disabledButton]}
                                onPress={handleVerifyOtp}
                                disabled={loading}>
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Text style={styles.closeText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LoginModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '92%',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20
    },
    title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 20, color: "#2196f3" },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 5,
        paddingHorizontal: 2,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    prefixContainer: {
        paddingHorizontal: 6,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    prefixText: { fontWeight: '600', color: '#343a40' },
    input: { flex: 1, padding: 10, fontSize: 14, fontWeight: 600, color: "#495057" },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpBox: {
        width: 40,
        height: 45,
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 500,
        backgroundColor: '#ffffff',
        color: "#495057"
    },
    button: {
        backgroundColor: '#2196f3',
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    disabledButton: { opacity: 0.7 },
    closeBtn: { marginTop: 12, alignSelf: 'center' },
    closeText: { color: '#2196f3', fontWeight: '600', fontSize: 15 },
});
