import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../constants/firebase";

type Gig = {
    id: string;
    title: string;
    description: string;
    date?: string;
    location?: string;
    creatorId?: string;
};

export default function MyGigs() {
    const [gigs, setGigs] = useState<Gig[]>([]);

    useEffect(() => {
        const fetchGigs = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const gigsRef = collection(db, "gigs");
            const q = query(gigsRef, where("creatorId", "==", user.uid));

            const snapshot = await getDocs(q);

            const list: Gig[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Gig, "id">),
            }));

            setGigs(list);
        };

        fetchGigs();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Gigs</Text>

            {gigs.length === 0 ? (
                <Text style={styles.empty}>You haven’t posted any gigs yet.</Text>
            ) : (
                <FlatList
                    data={gigs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.gigCard}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.meta}>Date: {item.date || "Not set"}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60, paddingHorizontal: 24 },
    header: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
    empty: { fontSize: 16, color: "#777" },
    gigCard: {
        backgroundColor: "#f4f4f4",
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
    },
    title: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
    description: { fontSize: 14, color: "#555", marginBottom: 6 },
    meta: { fontSize: 12, color: "#888" },
});
