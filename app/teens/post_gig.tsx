import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../constants/firebase";

interface PostGigProps {
    visible: boolean;
    onClose: () => void;
}

export default function PostGig({ visible, onClose }: PostGigProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pay, setPay] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Date picker state
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);

    const handleConfirmDate = (selectedDate: Date) => {
        // store readable & ISO
        const formatted = selectedDate.toDateString(); // Example: "Mon Jan 20 2025"
        setDate(formatted);
        hideDatePicker();
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPay("");
        setLocation("");
        setDate("");
        setError("");
    };

    const handleClose = () => {
        // optionally prevent closing while loading
        if (loading) return;
        resetForm();
        onClose();
    };

    const handlePostGig = async () => {
        setError("");

        // Basic validation
        if (!title.trim() || !description.trim() || !pay.trim() || !location.trim() || !date.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        const numericPay = Number(pay);
        if (isNaN(numericPay) || numericPay < 0) {
            setError("Pay must be a valid non-negative number (e.g. 20).");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            setError("You must be logged in.");
            return;
        }

        try {
            setLoading(true);

            const docRef = await addDoc(collection(db, "gigs"), {
                title: title.trim(),
                description: description.trim(),
                // store price as string like "$20" so elders UI matches
                price: `$${numericPay}`,
                postedBy: user.displayName,
                category: "General",
                location: location.trim(),
                date,
                userId: user.uid,
                email: auth.currentUser?.email,
                createdAt: serverTimestamp(),
                status: "open",
            });

            console.log("✅ Gig posted, id:", docRef.id);

            // Success alert — wait for user to acknowledge before closing/resetting
            Alert.alert(
                "Gig posted",
                "Your gig was posted successfully and will appear for elders.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            resetForm();
                            onClose();
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (e: any) {
            console.log("❌ Failed to post gig:", e);

            // Show friendly messages for common Firebase errors if available
            let friendly = "Failed to post gig. Try again.";

            if (e?.code === "permission-denied") {
                friendly = "Permission denied. Check your Firestore rules.";
            } else if (e?.code === "unavailable") {
                friendly = "Network error. Please check your connection.";
            }

            setError(friendly);
            Alert.alert("Error", friendly);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={handleClose}
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.modalHeader}>
                    <Text style={styles.header}>Post a Gig</Text>
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#000" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scroll}>
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    {/* Title */}
                    <TextInput
                        style={styles.input}
                        placeholder="Gig Title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    {/* Description */}
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Gig Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    {/* Pay */}
                    <TextInput
                        style={styles.input}
                        placeholder="Pay (numbers only, e.g. 20)"
                        value={pay}
                        onChangeText={setPay}
                        keyboardType="numeric"
                    />

                    {/* Location */}
                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        value={location}
                        onChangeText={setLocation}
                    />

                    {/* Date Picker Button */}
                    <TouchableOpacity style={styles.input} onPress={showDatePicker} disabled={loading}>
                        <Text style={{ color: date ? "#000" : "#888" }}>
                            {date || "Select Date"}
                        </Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />

                    <TouchableOpacity
                        style={[styles.button, loading ? { opacity: 0.6 } : {}]}
                        onPress={handlePostGig}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Posting..." : "Post Gig"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
    },
    closeButton: {
        padding: 4,
    },
    scroll: {
        padding: 20,
        paddingBottom: 40,
    },
    error: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    textArea: {
        height: 120,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#0A5C27",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
});