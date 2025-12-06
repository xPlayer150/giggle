import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import Header from '../../components/header';
import { auth, db } from "../../constants/firebase";
import { Colors } from '../../constants/theme';
import PostGig from './post_gig';

export default function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];

    const [gigs, setGigs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const fetchMyGigs = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const gigsRef = collection(db, "gigs");
            const q = query(gigsRef, where("userId", "==", user.uid));
            const snapshot = await getDocs(q);

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setGigs(data);
        } catch (e) {
            console.log("Error loading my gigs:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyGigs();
    }, []);

    const renderGig = ({ item }: any) => (
        <View
            style={[
                styles.card,
                { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }
            ]}
        >
            <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text
                    style={[
                        styles.status,
                        {
                            color:
                                item.status === "open"
                                    ? "#16a34a"
                                    : item.status === "booked"
                                        ? "#2563eb"
                                        : "#6b7280",
                        },
                    ]}
                >
                    .
                    {item.status}
                </Text>
            </View>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
                {item.description}
            </Text>

            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                    📍 {item.location}
                </Text>
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                    📅 {item.date}
                </Text>
            </View>

            <Text style={[styles.pay, { color: colors.primary }]}>${item.pay}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading your gigs…</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
            <Header />

            <View style={styles.content}>

                {/* Create Gig Button */}
                <TouchableOpacity
                    style={[styles.createButton, { backgroundColor: colors.buttonPrimary }]}
                    onPress={() => setIsModalVisible(true)}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add-circle-outline" size={32} color="#FFFFFF" />
                    <Text style={styles.createButtonText}>Post a Gig</Text>
                </TouchableOpacity>

                <Text style={[styles.title, { color: colors.text }]}>My Gigs</Text>

                {gigs.length === 0 ? (
                    <View style={styles.center}>
                        <Text style={{ color: colors.textSecondary }}>
                            You haven't posted any gigs yet.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={gigs}
                        keyExtractor={(item) => item.id}
                        renderItem={renderGig}
                        contentContainerStyle={{ paddingBottom: 50 }}
                    />
                )}
            </View>

            <PostGig visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 20 },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginTop: 20,
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
    }, title: {
        fontSize: 24,
        fontWeight: "700",
        marginVertical: 18,
    },
    card: {
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    cardTitle: { fontSize: 20, fontWeight: "700" },
    status: { fontSize: 16, fontWeight: "600", textTransform: "capitalize" },
    description: { fontSize: 14, marginBottom: 12 },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footerText: { fontSize: 14 },
    pay: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: "700",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
