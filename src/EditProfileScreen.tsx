import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Alert, Image, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from '../src/AUTHENTICATION/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = ({ navigation, route }) => {
  const { user, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatar, setAvatar] = useState(user?.photoURL || null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await AsyncStorage.getItem('userProfile');
        if (profileData) {
          const { displayName, avatar } = JSON.parse(profileData);
          setDisplayName(displayName);
          setAvatar(avatar);
        } else if (route.params?.profile) {
          setDisplayName(route.params.profile.displayName);
          setAvatar(route.params.profile.avatar);
        }
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    };
    loadProfile();
  }, [route.params?.profile]);

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Profile Photo',
      'How would you like to update your photo?',
      [
        {
          text: 'Take Photo',
          onPress: () => launchCamera({
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            includeBase64: false
          }, handleImageResponse)
        },
        {
          text: 'Choose from Gallery',
          onPress: () => launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            selectionLimit: 1
          }, handleImageResponse)
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      Alert.alert('Error', 'Failed to select image');
    } else if (response.assets?.[0]?.uri) {
      setAvatar(response.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!displayName.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return;
    }

    if (password && password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const updatedProfile = {
        displayName: displayName.trim(),
        avatar: avatar,
        ...(password.trim() && { password: password.trim() })
      };

      if (updateProfile) {
        await updateProfile(updatedProfile);
      }

      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));

      if (route.params?.onProfileUpdate) {
        route.params.onProfileUpdate(updatedProfile);
      }

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Update Failed', error.message || 'Could not update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.avatarSection}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>
              {displayName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.changePhotoButton}
          onPress={handleChangePhoto}
        >
          <Text style={styles.changePhotoButtonText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter your name"
          autoCapitalize="words"
          maxLength={50}
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter new password (optional)"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: '#f8f9fa' 
  },
  avatarSection: { 
    alignItems: 'center', 
    marginBottom: 32 
  },
  avatar: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 3, 
    borderColor: '#fff',
    marginBottom: 12
  },
  avatarPlaceholder: {
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    backgroundColor: '#2563eb',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 3, 
    borderColor: '#fff',
    marginBottom: 12
  },
  avatarInitial: { 
    fontSize: 48, 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  changePhotoButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  changePhotoButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  },
  formSection: { 
    marginBottom: 24 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8, 
    color: '#374151' 
  },
  input: {
    backgroundColor: '#fff', 
    padding: 14, 
    borderRadius: 8,
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    fontSize: 16
  },
  button: {
    backgroundColor: '#2563eb', 
    padding: 16,
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 8
  },
  buttonDisabled: { 
    opacity: 0.7 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});

export default EditProfileScreen;