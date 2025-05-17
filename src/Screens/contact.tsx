import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const ContactUsScreen = ({ navigation }) => {
  const contactMethods = [
    {
      icon: 'email',
      title: 'Email Us',
      info: 'support@myapp.com',
      action: () => Linking.openURL('mailto:support@myapp.com'),
    },
    {
      icon: 'phone',
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      action: () => Linking.openURL('tel:+15551234567'),
    },
    {
      icon: 'location-on',
      title: 'Visit Us',
      info: '123 Business Ave\nSan Francisco, CA',
      action: () => Linking.openURL('https://maps.app.goo.gl/'),
    },
  ];

  return (
    <LinearGradient
      colors={['#f5f7fa', '#e4e8f0']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.header}>Contact Us</Text>

        {contactMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactCard}
            onPress={method.action}
          >
            <MaterialIcons name={method.icon} size={32} color="#7f56d9" />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{method.title}</Text>
              <Text style={styles.info}>{method.info}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#2d3748',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
  },
  info: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
});

export default ContactUsScreen;
