import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProductDetailsScreen = () => {
  const { params } = useRoute();
  const { product } = params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Fixed Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={[styles.buttonText, styles.shareButtonText]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 80, // Space for action bar
  },
  imageWrapper: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 24,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  shareButtonText: {
    color: '#555',
  },
  cartIcon: {
    marginRight: 4,
  },
});

export default ProductDetailsScreen;