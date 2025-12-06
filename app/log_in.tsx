import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { db } from "../constants/firebase";

import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';

// 🔥 Add Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../constants/firebase';

export default function LogInScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogIn = async () => {
        setErrorMessage('');

        if (!email.trim() || !password.trim()) {
            setErrorMessage("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);

            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
            const user = userCredential.user;

            // 🔥 Fetch userType from Firestore
            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);

            if (!snap.exists()) {
                setErrorMessage("User profile not found.");
                return;
            }

            const { userType } = snap.data();

            // 🔥 Route based on userType
            if (userType === "teen") {
                router.push("/elders/home");
            } else {
                router.push("/teens/home");
            }

        } catch (error: any) {
            console.log(error);

            if (error.code === 'auth/invalid-credential') {
                setErrorMessage("Incorrect email or password.");
            } else if (error.code === 'auth/too-many-requests') {
                setErrorMessage("Too many attempts. Try again later.");
            } else if (error.code === 'auth/user-not-found') {
                setErrorMessage("No account found with that email.");
            } else {
                setErrorMessage("Something went wrong. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>

                    <View style={styles.content}>
                        <Text style={[styles.logo, { color: colors.primaryDark }]}>Giggle</Text>
                        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Log in to continue
                        </Text>

                        {/* 🔥 Error Message */}
                        {errorMessage ? (
                            <Text style={{ color: 'red', marginBottom: 15, textAlign: 'center' }}>
                                {errorMessage}
                            </Text>
                        ) : null}

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            borderColor: colors.border,
                                            backgroundColor: colors.backgroundSecondary,
                                            color: colors.text,
                                        },
                                    ]}
                                    placeholder="Enter your email"
                                    placeholderTextColor={colors.textSecondary}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                                <View
                                    style={[
                                        styles.passwordContainer,
                                        {
                                            borderColor: colors.border,
                                            backgroundColor: colors.backgroundSecondary,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[styles.passwordInput, { color: colors.text }]}
                                        placeholder="Enter your password"
                                        placeholderTextColor={colors.textSecondary}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                            size={22}
                                            color={colors.textSecondary}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.logInButton, { backgroundColor: colors.buttonPrimary }]}
                                onPress={handleLogIn}
                                disabled={loading}
                            >
                                <Text style={[styles.logInText, { color: colors.background }]}>
                                    {loading ? "Logging in..." : "Log In"}
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.signUpContainer}>
                                <Text style={[styles.signUpPrompt, { color: colors.textSecondary }]}>
                                    Don't have an account?{' '}
                                </Text>
                                <TouchableOpacity onPress={() => router.push('/sign_up')}>
                                    <Text style={[styles.signUpLink, { color: colors.buttonPrimary }]}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    backButton: {
        marginLeft: 20,
        marginTop: 10,
        width: 800,
        height: 80,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    logo: {
        fontSize: 36,
        fontWeight: '700',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 40,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
        paddingRight: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '600',
    },
    logInButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    logInText: {
        fontSize: 18,
        fontWeight: '600',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    signUpPrompt: {
        fontSize: 14,
    },
    signUpLink: {
        fontSize: 14,
        fontWeight: '600',
    },
});
