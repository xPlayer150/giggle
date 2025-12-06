import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";
import Header from "../../components/header";
import { auth, db } from "../../constants/firebase";
import { Colors } from "../../constants/theme";

// Type for gigs
interface Gig {
    id: string;
    title: string;
    description: string;
    date: string;
    price: string;
    location?: string;
    category: string;
    postedBy: string | null;
}

export default function BookedGigs() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];

    const [gigs, setGigs] = useState<Gig[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
            collection(db, "gigs"),
            where("status", "==", "booked"),
            where("bookedBy", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Gig, "id">),
            }));
            setGigs(list);
        });

        return () => unsub();
    }, []);

    const renderGig = ({ item }: { item: Gig }) => (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.border,
                },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>
                {item.title}
            </Text>
            <Text style={[styles.desc, { color: colors.textSecondary }]}>
                {item.description}
            </Text>

            <View style={styles.row}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Date:
                </Text>
                <Text style={[styles.value, { color: colors.text }]}>
                    {item.date}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Price:
                </Text>
                <Text style={[styles.value, { color: colors.primary }]}>
                    {item.price}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Location:
                </Text>
                <Text style={[styles.value, { color: colors.textSecondary }]}>
                    {item.location || "—"}
                </Text>
            </View>
        </View>
    );

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <StatusBar
                barStyle={
                    colorScheme === "dark" ? "light-content" : "dark-content"
                }
            />

            <Header />

            <Text style={[styles.header, { color: colors.text }]}>
                Your Upcoming Gigs
            </Text>

            {gigs.length === 0 ? (
                <Text
                    style={{
                        color: colors.textSecondary,
                        textAlign: "center",
                        marginTop: 40,
                    }}
                >
                    No booked gigs yet.
                </Text>
            ) : (
                <FlatList
                    data={gigs}
                    renderItem={renderGig}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 20,
        marginTop: 20,
    },
    card: {
        padding: 18,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 6,
    },
    desc: {
        fontSize: 15,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        width: 70,
    },
    value: {
        fontSize: 14,
    },
});
