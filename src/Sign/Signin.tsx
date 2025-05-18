/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInFormData } from '../theme/schema';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../AUTHENTICATION/authContext';
import { useTheme } from '../theme/theme';



const backgroundImage = require('../8033213.webp');

type RootStackParamList = {
  signin: undefined;
  ProfileScreen: undefined;
  ProductScreen: undefined;
  forgot: undefined; // Add this line
  
};

type SigninScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'signin'>;

const Signin = () => {
  const { login } = useAuth();
  const navigation = useNavigation<SigninScreenNavigationProp>();
  const { isDarkMode, toggleTheme } = useTheme();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

 const onSubmit = (data: SignInFormData) => {
  if (
    data.email.toLowerCase() === 'eurisko@gmail.com' &&
    data.password === 'academy2025'
  ) {
    login();
    Alert.alert('Success', 'Logged in successfully!');
    navigation.navigate('MainApp');
  } else {
    Alert.alert('Error', 'Invalid credentials');
  }
};

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background for better text readability
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    logoText: {
      fontSize: 36,
      fontWeight: '800',
      color: isDarkMode ? '#7F9CF5' : '#FFFFFF', // Changed to white for better visibility
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    header: {
      fontSize: 26,
      fontWeight: '700',
      color: '#FFFFFF', // Changed to white
      textAlign: 'center',
      marginBottom: 8,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    subHeader: {
      fontSize: 16,
      color: '#FFFFFF', // Changed to white
      textAlign: 'center',
      marginBottom: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: isDarkMode ? '#2D3748' : '#ddd',
      paddingHorizontal: 15,
      marginBottom: 12,
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
      color: isDarkMode ? '#121212' : '#333',
      elevation: 1,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    errorText: {
      color: '#F56565',
      fontSize: 13,
      marginBottom: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    button: {
      backgroundColor: isDarkMode ? '#7F9CF5' : '#007BFF',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
      shadowColor: isDarkMode ? '#7F9CF5' : '#007BFF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPassword: {
      color: isDarkMode ? '#7F9CF5' : '#FFFFFF', // Changed to white
      fontSize: 14,
      textAlign: 'right',
      marginBottom: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 30,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: isDarkMode ? '#FFFFFF' : '#FFFFFF', // Changed to white
    },
    dividerText: {
      marginHorizontal: 10,
      color: '#FFFFFF', // Changed to white
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    signupText: {
      color: '#FFFFFF', // Changed to white
      fontSize: 14,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    signupLink: {
      color: isDarkMode ? '#7F9CF5' : '#FFFFFF', // Changed to white
      fontWeight: 'bold',
      fontSize: 14,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    themeToggle: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
      borderRadius: 20,
      backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.7)' : 'rgba(226, 232, 240, 0.7)',
      zIndex: 1,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={backgroundImage}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
          >
            <Text style={{ color: isDarkMode ? '#E2E8F0' : '#2D3748' }}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🛒 MyShop</Text>
          </View>
          <Text style={styles.header}>Welcome Back 👋</Text>
          <Text style={styles.subHeader}>Please sign in to continue</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={isDarkMode ? '#4A5568' : '#999'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={isDarkMode ? '#4A5568' : '#999'}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                )}
              </>
            )}
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword} onPress={() => navigation.navigate('forgot')}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Signin;