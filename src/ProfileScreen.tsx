import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useAuth } from '../src/AUTHENTICATION/authContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    avatar: null
  });

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else if (user) {
        setProfile({
          displayName: user.displayName || '',
          email: user.email || '',
          avatar: user.photoURL || null
        });
      }
    };
    loadProfile();
  }, [user]);

  const handleImagePick = (source) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
      saveToPhotos: false,
    };

    const launchFunction = source === 'camera' ? launchCamera : launchImageLibrary;

    launchFunction(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Failed to pick image');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        updateProfile({ avatar: selectedImage.uri });
      }
    });
  };

  const updateProfile = async (updates) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
        onPress: async () => {
  await logout();
  navigation.reset({ index: 0, routes: [{ name: 'InitialScreen' }] });
}
        }
      ]
    );
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => handleImagePick('camera')
        },
        {
          text: 'Choose from Library',
          onPress: () => handleImagePick('library')
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={showImagePickerOptions}>
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {profile.displayName?.charAt(0) || 'U'}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{profile.displayName || 'User'}</Text>
        <Text style={styles.email}>{profile.email || 'No email'}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile', { 
            profile,
            onProfileUpdate: updateProfile 
          })}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile', { 
            profile,
            onProfileUpdate: updateProfile 
          })}
        
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]}
          onPress={() => navigation.navigate('Signin', {  profile,
            onProfileUpdate: updateProfile 
          })}
        
        > 
        <Text style={[styles.buttonText, styles.logoutText]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f4f8',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
  },
  logoutText: {
    color: '#dc2626',
  },
});

export default ProfileScreen;