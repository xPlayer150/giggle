import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../constants/firebase';


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


export default function SignUpScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState(''); // 'teen' or 'senior'
    const router = useRouter();

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword || !userType) {
            alert("Please fill out all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            userType,       // 'teen' or 'senior'
            createdAt: Date.now(),
        });

        if (userType === "teen") {
            router.push("./teens/home");
        } else {
            router.push("./elders/home");
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
                        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Join the community today
                        </Text>

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, { color: colors.text }]}>Username</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            borderColor: colors.border,
                                            backgroundColor: colors.backgroundSecondary,
                                            color: colors.text,
                                        },
                                    ]}
                                    placeholder="Enter your name"
                                    placeholderTextColor={colors.textSecondary}
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>

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
                                        placeholder="Create a password"
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

                            <View style={styles.inputContainer}>
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
                                        placeholder="Confirm your password"
                                        placeholderTextColor={colors.textSecondary}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                            size={22}
                                            color={colors.textSecondary}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, { color: colors.text }]}>I am a...</Text>
                                <View style={styles.userTypeContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.userTypeButton,
                                            {
                                                borderColor: colors.border,
                                                backgroundColor: userType === 'teen' ? colors.buttonPrimary : colors.backgroundSecondary,
                                            },
                                        ]}
                                        onPress={() => setUserType('teen')}
                                    >
                                        <Ionicons
                                            name="person-outline"
                                            size={24}
                                            color={userType === 'teen' ? colors.background : colors.text}
                                            style={styles.userTypeIcon}
                                        />
                                        <Text
                                            style={[
                                                styles.userTypeText,
                                                { color: userType === 'teen' ? colors.background : colors.text },
                                            ]}
                                        >
                                            Teen
                                        </Text>
                                        <Text
                                            style={[
                                                styles.userTypeSubtext,
                                                { color: userType === 'teen' ? colors.background : colors.textSecondary },
                                            ]}
                                        >
                                            Offering services
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.userTypeButton,
                                            {
                                                borderColor: colors.border,
                                                backgroundColor: userType === 'senior' ? colors.buttonPrimary : colors.backgroundSecondary,
                                            },
                                        ]}
                                        onPress={() => setUserType('senior')}
                                    >
                                        <Ionicons
                                            name="heart-outline"
                                            size={24}
                                            color={userType === 'senior' ? colors.background : colors.text}
                                            style={styles.userTypeIcon}
                                        />
                                        <Text
                                            style={[
                                                styles.userTypeText,
                                                { color: userType === 'senior' ? colors.background : colors.text },
                                            ]}
                                        >
                                            Senior
                                        </Text>
                                        <Text
                                            style={[
                                                styles.userTypeSubtext,
                                                { color: userType === 'senior' ? colors.background : colors.textSecondary },
                                            ]}
                                        >
                                            Seeking services
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.signUpButton, { backgroundColor: colors.buttonPrimary }]}
                                onPress={handleSignUp}
                            >
                                <Text style={[styles.signUpText, { color: colors.background }]}>Sign Up</Text>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <Text style={[styles.loginPrompt, { color: colors.textSecondary }]}>
                                    Already have an account?{' '}
                                </Text>
                                <TouchableOpacity onPress={() => router.push('./log_in')}>
                                    <Text style={[styles.loginLink, { color: colors.buttonPrimary }]}>Log In</Text>
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
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
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
    userTypeContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    userTypeButton: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 110,
    },
    userTypeIcon: {
        marginBottom: 8,
    },
    userTypeText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    userTypeSubtext: {
        fontSize: 12,
        textAlign: 'center',
    },
    signUpButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    signUpText: {
        fontSize: 18,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    loginPrompt: {
        fontSize: 14,
    },
    loginLink: {
        fontSize: 14,
        fontWeight: '600',
    },
});