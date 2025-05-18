import { useAuth } from './authContext';
import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <Text>Please log in to view this page</Text>;
  }

  return (
    <View>
      <Text>Welcome to your profile!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
export default ProfileScreen;
