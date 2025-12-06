import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header({ username = "User" }) {
    const handleProfilePress = () => {
        console.log('Profile button pressed');
    };

    return (
        <SafeAreaView style={styles.header}>
            <View style={styles.textContainer}>
                <Text style={styles.greetingbold}>Welcome back!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#0A5C27',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    textContainer: {
        flexDirection: 'column',
    },
    greetingbold: {
        fontWeight: '700',
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'System',
        //marginBottom: -2,
    },
    greeting: {
        fontWeight: '400',
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'System',
    },
    profileButton: {
        padding: 5,
    },
});
