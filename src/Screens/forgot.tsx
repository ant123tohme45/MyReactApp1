import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Here you would typically send a password reset email
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  return (

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            {!isSubmitted ? (
              <>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                  Don't worry! Just enter your email and we'll send you a reset link
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.submitButton, !email && styles.disabledButton]}
                  onPress={handleSubmit}
                  disabled={!email}
                >

                    <Text style={styles.submitButtonText}>Send Reset Link</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>

                <Text style={styles.title}>Check Your Email</Text>
                <Text style={styles.subtitle}>
                  We've sent password reset instructions to {'\n'}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>

                <TouchableOpacity
                  style={styles.backToLoginButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.backToLoginText}>← Back to Login</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  emailText: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 15,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  successImage: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
  },
  backToLoginButton: {
    marginTop: 25,
    padding: 12,
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
