import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import Header from '../../components/header';
import { Colors } from '../../constants/theme';
import PostGig from './post_gig';

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreateGig = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleGigPress = (gigId: string) => {
        console.log('Gig pressed:', gigId);
        // Navigate to gig details
        // router.push(`/gig/${gigId}`);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

            <Header />

            <View style={styles.content}>
                {/* Create Gig Button */}
                <TouchableOpacity
                    style={[styles.createButton, { backgroundColor: colors.buttonPrimary }]}
                    onPress={handleCreateGig}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add-circle-outline" size={32} color="#FFFFFF" />
                    <Text style={styles.createButtonText}>Create a Gig</Text>
                </TouchableOpacity>

            </View>

            <PostGig
                visible={isModalVisible}
                onClose={handleCloseModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    createButtonText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 12,
    },
    browseSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 6,
    },
    sectionSubtitle: {
        fontSize: 15,
        lineHeight: 20,
    },
    gigList: {
        paddingBottom: 20,
    },
    gigCard: {
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    gigCardContent: {
        flexDirection: 'row',
        gap: 14,
    },
    gigImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    gigInfo: {
        flex: 1,
    },
    gigHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    gigTitle: {
        fontSize: 19,
        fontWeight: '700',
        flex: 1,
        marginRight: 12,
    },
    gigPrice: {
        fontSize: 20,
        fontWeight: '700',
    },
    gigDescription: {
        fontSize: 15,
        lineHeight: 21,
        marginBottom: 12,
    },
    gigFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '600',
    },
    postedBy: {
        fontSize: 13,
    },
});