/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Switch,
  ImageBackground, // Add this import
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../src/theme/theme';

const InitialScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, );

  // Color definitions
  const colors = {
    background: isDarkMode ? '#121212' : '#f8f9fa',
    text: isDarkMode ? '#ffffff' : '#2d3748',
    secondaryText: isDarkMode ? '#a0aec0' : '#718096',
    buttonPrimary: '#7f56d9',
    buttonSecondaryBg: isDarkMode ? '#1e1e1e' : '#ffffff',
    buttonSecondaryText: isDarkMode ? '#ffffff' : '#7f56d9',
    border: isDarkMode ? '#2d3748' : '#e2e8f0',
    toggleBg: isDarkMode ? '#333' : '#e2e8f0',
    footerButtonBg: isDarkMode ? '#252525' : '#ededed',
    footerButtonText: isDarkMode ? '#ffffff' : '#4a5568',
  };

  return (
    <ImageBackground
      source={require('../8033213.webp')} // Replace with your image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)' }]}>
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <Image
            source={isDarkMode
              ? require('../logo.jpg')
              : require('../logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome to MyApp
          </Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            Please sign in or create an account
          </Text>
        </Animated.View>

        {/* Rest of your component remains the same */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.buttonPrimary }]}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              {
                backgroundColor: colors.buttonSecondaryBg,
                borderColor: colors.border,
              },
            ]}
            onPress={() => navigation.navigate('Signin')}
            activeOpacity={0.8}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.buttonSecondaryText }]}>
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Dark Mode Toggle */}
          <View style={[styles.themeToggle, { backgroundColor: colors.toggleBg }]}>
            <Text style={{ color: isDarkMode ? '#a0aec0' : '#718096', marginRight: 10 }}>
              Dark Mode
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </Animated.View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: colors.footerButtonBg }]}
            onPress={() => navigation.navigate('ContactUs')}
            activeOpacity={0.7}
          >
            <Text style={[styles.footerButtonText, { color: colors.footerButtonText }]}>
              Contact Us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: colors.footerButtonBg }]}
            onPress={() => navigation.navigate('Support')}
            activeOpacity={0.7}
          >
            <Text style={[styles.footerButtonText, { color: colors.footerButtonText }]}>
              Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  // Rest of your styles remain the same
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 24,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  footerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default InitialScreen;
