import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Linking,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import Header from "../../components/header";
import { auth, db } from "../../constants/firebase";
import { Colors } from "../../constants/theme";

interface Gig {
    id: string;
    title: string;
    description: string;
    price: string;
    postedBy: string;
    email?: string;
    category: string;
    location?: string;
    date?: string;
    status?: string;
}

export default function EldersHome() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];

    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "gigs"),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const list: Gig[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Gig, "id">),
            }));
            setGigs(list);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    // 📩 OPEN EMAIL APP
    const contactTeen = (email?: string) => {
        if (!email) return Alert.alert("No email provided");
        const url = `mailto:${email}?subject=Gig%20Request&body=Hi!%20I'm%20interested%20in%20your%20gig.`;
        Linking.openURL(url);
    };

    // 📌 BOOK A GIG
    const bookGig = async (gigId: string) => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            await updateDoc(doc(db, "gigs", gigId), {
                status: "booked",
                bookedBy: user.uid,
            });

            Alert.alert("Gig Booked!", "You can see it in your upcoming gigs.");
        } catch (error) {
            console.log("Booking error:", error);
            Alert.alert("Error", "Unable to book this gig.");
        }
    };

    const renderGigCard = ({ item }: { item: Gig }) => (
        <View
            style={[
                styles.gigCard,
                {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.border,
                },
            ]}
        >
            <Text style={[styles.gigTitle, { color: colors.text }]}>
                {item.title}
            </Text>

            <Text style={[styles.gigDescription, { color: colors.textSecondary }]}>
                {item.description}
            </Text>

            <Text style={[styles.gigPrice, { color: colors.primary }]}>
                {item.price}
            </Text>

            {/* 📞 Contact Button */}
            <TouchableOpacity
                style={[styles.emailButton, { backgroundColor: colors.primary }]}
                onPress={() => contactTeen(item.email)}
            >
                <Text style={styles.emailButtonText}>Contact Senior</Text>
            </TouchableOpacity>

            {/* 📌 Book Button */}
            {item.status !== "booked" ? (
                <TouchableOpacity
                    style={[styles.bookButton, { backgroundColor: colors.primary }]}
                    onPress={() => bookGig(item.id)}
                >
                    <Text style={styles.bookButtonText}>Book Gig</Text>
                </TouchableOpacity>
            ) : (
                <Text style={[styles.bookedTag, { color: colors.primary }]}>
                    Already booked
                </Text>
            )}
        </View>
    );

    if (loading) {
        return (
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                <Text style={{ color: colors.text }}>Loading…</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar
                barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
            />

            <Header />

            <FlatList
                data={gigs}
                keyExtractor={(item) => item.id}
                renderItem={renderGigCard}
                contentContainerStyle={{ padding: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    gigCard: {
        padding: 16,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 16,
    },
    gigTitle: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
    gigDescription: { fontSize: 15, marginBottom: 8 },
    gigPrice: { fontSize: 18, fontWeight: "600", marginBottom: 12 },

    emailButton: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    emailButtonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },

    bookButton: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    bookButtonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },

    bookedTag: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: "700",
    },
});
