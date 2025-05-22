import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from './productcontext';

const AddProductScreen = ({ }) => {
  const navigation = useNavigation();
  const { addProduct } = useProducts();

  type ProductState = {
    name: string;
    description: string;
    price: string;
    category: string;
    images: string[];
  };

  const [product, setProduct] = useState<ProductState>({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
  });
  type ProductErrors = {
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    images?: string;
  };
  const [errors, setErrors] = useState<ProductErrors>({});

  const validateForm = () => {
    const newErrors: ProductErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.description.trim()) newErrors.description = 'Description is required';
    if (!product.price.trim()) newErrors.price = 'Price is required';
    if (isNaN(Number(product.price))) newErrors.price = 'Price must be a number';
    if (!product.category.trim()) newErrors.category = 'Category is required';
    if (product.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const readPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      const writePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      return (
        cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
        readPermission === PermissionsAndroid.RESULTS.GRANTED &&
        writePermission === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS permissions handled by react-native-image-picker internally
};
  const handleTakePhoto = async () => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    console.warn('Camera permission denied');
    return;
  }

  console.log('Launching camera...');

  launchCamera(
    {
      mediaType: 'photo', 
      quality: 1,
      saveToPhotos: true,
    },
    (response) => {
      console.log('Camera response:', response);
      handleImageResponse(response);
    },
  );
};
  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.error('Error:', response.errorMessage);
    } else if (response.assets && Array.isArray(response.assets)) {
      const newImages = response.assets
        .filter(asset => asset.uri)
        .map(asset => asset.uri);
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].filter((uri): uri is string => typeof uri === 'string').slice(0, 5),
      }));
    } else {
      console.error('Invalid image response format:', response);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({
      ...product,
      images: newImages,
    });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newProduct = {
        id: Date.now().toString(),
        name: product.name,
        price: `$${product.price}`,
        description: product.description,
        images: product.images.length > 0 ? product.images[0] : '',
        category: product.category,
      };

      addProduct(newProduct);
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Name*</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder="Enter product name"
          value={product.name}
          onChangeText={(text) => setProduct({ ...product, name: text })}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description*</Text>
        <TextInput
          style={[styles.input, styles.multilineInput, errors.description && styles.errorInput]}
          placeholder="Enter product description"
          multiline
          numberOfLines={4}
          value={product.description}
          onChangeText={(text) => setProduct({ ...product, description: text })}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Price*</Text>
        <TextInput
          style={[styles.input, errors.price && styles.errorInput]}
          placeholder="Enter price"
          keyboardType="numeric"
          value={product.price}
          onChangeText={(text) => setProduct({ ...product, price: text })}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category*</Text>
        <TextInput
          style={[styles.input, errors.category && styles.errorInput]}
          placeholder="Enter category"
          value={product.category}
          onChangeText={(text) => setProduct({ ...product, category: text })}
        />
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Images*</Text>
        <Text style={styles.hintText}>Maximum 5 images allowed</Text>
        <TouchableOpacity style={styles.addImageButton} onPress={handleTakePhoto}>
          <Text style={styles.addImageButtonText}>+ Take Photo</Text>
        </TouchableOpacity>
        {errors.images && <Text style={styles.errorText}>{errors.images}</Text>}

        <View style={styles.imageContainer}>
          {product.images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeImageButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#444',
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imageWrapper: {
    width: 100,
    marginRight: 10,
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addImageButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addImageButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddProductScreen;