import React from 'react';
import {
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Header from '../../components/header';
import { Colors } from '../../constants/theme';

// Mock data for gigs
const MOCK_GIGS = [
    {
        id: '1',
        title: 'Grocery Shopping',
        description: 'Need help picking up groceries from the local store',
        price: '$15',
        postedBy: 'Emma S.',
        category: 'Shopping',
    },
    {
        id: '2',
        title: 'Lawn Mowing',
        description: 'Small front and back yard, about 30 minutes of work',
        price: '$20',
        postedBy: 'Jake M.',
        category: 'Yard Work',
    },
    {
        id: '3',
        title: 'Tech Help',
        description: 'Setting up new smartphone and email',
        price: '$25',
        postedBy: 'Sarah L.',
        category: 'Technology',
    },
    {
        id: '4',
        title: 'Dog Walking',
        description: '30 minute walk around the neighborhood',
        price: '$12',
        postedBy: 'Alex R.',
        category: 'Pet Care',
    },
    {
        id: '5',
        title: 'Light Cleaning',
        description: 'Dusting and vacuuming, 1-2 hours',
        price: '$30',
        postedBy: 'Maya P.',
        category: 'Household',
    },
];

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const handleGigPress = (gigId: string) => {
        console.log('Gig pressed:', gigId);
        // Navigate to gig details
        // router.push(`/gig/${gigId}`);
    };

    const renderGigCard = ({ item }: { item: typeof MOCK_GIGS[0] }) => (
        <TouchableOpacity
            style={[
                styles.gigCard,
                {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.border,
                },
            ]}
            onPress={() => handleGigPress(item.id)}
        >
            <View style={styles.gigCardContent}>
                <Image style={styles.gigImage} source={require('../../assets/images/icon.png')} />
                <View style={styles.gigInfo}>
                    <View style={styles.gigHeader}>
                        <Text style={[styles.gigTitle, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.gigPrice, { color: colors.primary }]}>{item.price}</Text>
                    </View>
                    <Text style={[styles.gigDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <View style={styles.gigFooter}>
                        <View style={[styles.categoryBadge, { backgroundColor: colors.background }]}>
                            <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
                                {item.category}
                            </Text>
                        </View>
                        <Text style={[styles.postedBy, { color: colors.textTertiary }]}>
                            by {item.postedBy}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

            <Header />

            <View style={styles.content}>
                {/* Browse Gigs Section */}
                <View style={styles.browseSection}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse Gigs</Text>
                    <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                        Find helpful services from teens in your community
                    </Text>
                </View>

                <FlatList
                    data={MOCK_GIGS}
                    renderItem={renderGigCard}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.gigList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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