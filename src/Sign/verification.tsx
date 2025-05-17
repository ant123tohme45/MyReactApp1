import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, OtpFormData } from '../../src/theme/schema';
import { useNavigation } from '@react-navigation/native';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = (data: OtpFormData) => {
    Keyboard.dismiss(); // Dismiss keyboard when submitting
    if (data.otp === '1234') {
      Alert.alert(
        'Welcome to PhoneHome!',
        'Your account has been verified successfully!',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Signup'),
          },
        ]
      );
    } else {
      Alert.alert(
        'Verification Failed',
        'The OTP you entered is incorrect. Please try again.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    }
  };

  const handleResend = () => {
    Alert.alert(
      'New OTP Sent',
      'A new verification code has been sent to your phone number.',
      [
        { text: 'OK', onPress: () => console.log('Resend OTP') },
      ]
    );
  };

  return (
      <View style={styles.card}>
        <Text style={styles.title}>Phone Verification</Text>
        <Text style={styles.subtitle}>Enter the 4-digit code sent to your phone</Text>

        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="____"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
                maxLength={4}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                textAlign="center"
              />
              {errors.otp && (
                <Text style={styles.errorText}>{errors.otp.message}</Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          
            <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendLink}>Resend OTP</Text></Text>
        </TouchableOpacity>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  resendLink: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default VerificationScreen;
