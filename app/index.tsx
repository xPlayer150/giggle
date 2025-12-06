import { router } from 'expo-router';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import { Colors } from '../constants/theme';

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <View style={styles.content}>
        <Text style={[styles.logo, { color: colors.primaryDark }]}>Giggle</Text>

        <View style={styles.textContainer}>
          <Text style={[styles.subtitle, { color: colors.text }]}>Need support or</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>want to lend a hand?</Text>
          <Text style={[styles.highlight, { color: colors.text }]}>Giggle makes it easy.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: colors.buttonSecondary }]}
            onPress={() => router.push('./sign_up')}
          >
            <Text style={[styles.signUpText, { color: colors.background }]}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.logInButton, { backgroundColor: colors.buttonPrimary }]}
            onPress={() => router.push('./log_in')}
          >
            <Text style={[styles.logInText, { color: colors.background }]}>Log In</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    fontSize: 64,
    fontWeight: '700',
    marginBottom: 40,
    fontFamily: "System",
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: "System",
  },
  highlight: {
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: "System",
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  signUpButton: {
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: '600',
  },
  logInButton: {
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
  },
  logInText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
