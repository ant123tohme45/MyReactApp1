import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { ProductsContext } from '../productcontext';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  category: string;
};

const ProductDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params || {};
  const { deleteProduct, updateProduct } = useContext(ProductsContext);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // Handle both single image and multiple images
  const images = product.images?.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : ['https://via.placeholder.com/400'];

  const handleDelete = async () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await deleteProduct(product.id);
              if (success) {
                navigation.goBack();
              } else {
                Alert.alert('Error', 'Failed to delete product');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete product');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditProduct', {
      product,
      onSave: async (updatedProduct: Product) => {
        try {
          const success = await updateProduct(product.id, updatedProduct);
          if (success) {
            navigation.goBack();
          } else {
            Alert.alert('Error', 'Failed to update product');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to update product');
          console.error(error);
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.swiperContainer}>
          <Swiper
            style={styles.swiper}
            showsButtons={false}
            showsPagination={true}
            dotColor="rgba(0,0,0,0.3)"
            activeDotColor="#000"
          >
            {images.map((uri, index) => (
              <View key={index} style={styles.slide}>
                <Image
                  source={{ uri }}
                  style={styles.swiperImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEdit}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ... keep your existing styles ...

const { width } = Dimensions.get('window');
const swiperHeight = width * 0.8; // Adjust this ratio as needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  swiperContainer: {
    height: swiperHeight,
  },
  swiper: {
    height: swiperHeight,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    bottom: 10,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2ecc71',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
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
    borderTopColor: '#ecf0f1',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;