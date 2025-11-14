import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const EnquiryDetails = ({ route }: any) => {
    const { enquiry } = route.params;

    const dateStr = enquiry?.inquiryDate
        ? new Date(enquiry.inquiryDate).toLocaleDateString()
        : "Not Available";

    return (
        <ScrollView style={styles.container}>

            <View style={styles.card}>

                <View style={styles.row}>
                    <Text style={styles.label}>Manufacturer:</Text>
                    <Text style={styles.value}>{enquiry.vehicleDetails?.oem ?? "-"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Model:</Text>
                    <Text style={styles.value}>{enquiry.vehicleDetails?.model ?? "-"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Enquiry Type:</Text>
                    <Text style={styles.value}>{enquiry.vehicleDetails?.usedOrNew ?? "-"}</Text>
                </View>

                {/* Customer */}
                <View style={styles.row}>
                    <Text style={styles.label}>Customer Name:</Text>
                    <Text style={styles.value}>{enquiry.userDetails?.userName ?? "-"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Mobile No:</Text>
                    <Text style={styles.value}>{enquiry.userDetails?.mobileNo ?? "-"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Pin Code:</Text>
                    <Text style={styles.value}>{enquiry.userDetails?.address?.pinCode ?? "-"}</Text>
                </View>

                {/* Inquiry Info */}
                <View style={styles.row}>
                    <Text style={styles.label}>Enquiry Date:</Text>
                    <Text style={styles.value}>{dateStr}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Number of Financed Vehicle:</Text>
                    <Text style={styles.value}>{enquiry.financed ?? 0}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Number of Free Vehicle:</Text>
                    <Text style={styles.value}>{enquiry.free ?? 0}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Number of Owned Vehicle:</Text>
                    <Text style={styles.value}>{enquiry.owned ?? 0}</Text>
                </View>

            </View>

        </ScrollView>
    );
};

export default EnquiryDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },

    card: {
        backgroundColor: "#edf2fb",
        padding: 20,
        borderRadius: 12,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 8,
        color: "#6c757d",
        width: 160,
    },

    value: {
        fontSize: 15,
        color: "#6c757d",
        flexShrink: 1,
        fontWeight: "500",
    },
});
