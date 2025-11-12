import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddTruck = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add Truck</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,                     // Take full height
        justifyContent: 'center',    // Center vertically
        alignItems: 'center',        // Center horizontally
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default AddTruck;
