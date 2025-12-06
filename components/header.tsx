import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
    const handleProfilePress = () => {
        console.log('Profile button pressed');
    };

    return (
        <SafeAreaView style={styles.header}>
            <View style={styles.textContainer}>
                <Text style={styles.greetingbold}>Good morning,</Text>
                <Text style={styles.greeting}>Sriyan!</Text>
            </View>

            <TouchableOpacity
                style={styles.profileButton}
                onPress={handleProfilePress}
                activeOpacity={0.7}
            >
                <Ionicons name="person-sharp" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 20,
        backgroundColor: '#0A5C27',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    textContainer: {
        flexDirection: 'column',      // ⬅️ stack vertically
    },
    greetingbold: {
        fontWeight: '700',
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'System',
        marginBottom: -2,             // small tweak for spacing
    },
    greeting: {
        fontWeight: '400',
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'System',
    },
    profileButton: {
        padding: 5,
    },
});
