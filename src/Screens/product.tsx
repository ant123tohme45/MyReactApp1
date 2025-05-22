/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useProducts } from '../productcontext';

const categories = ['All', 'Flagship', 'Gaming', 'Apple', 'Rugged', 'Creator'];

const sortOptions = {
  none: 'None',
  lowToHigh: 'Price: Low to High',
  highToLow: 'Price: High to Low',
};

const initialProducts = [
  {
    id: '1',
    name: 'OnePlus 12',
    price: '$699',
    description: 'Flagship smartphone with Snapdragon 8 Gen 3',
    image: 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg',
    category: 'Flagship',
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: '$999',
    description: "Apple's premium smartphone with A17 Pro chip",
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg',
    category: 'Apple',
  },
  {
    id: '3',
    name: 'Asus ROG Phone 7',
    price: '$1300',
    description: 'Gaming beast with 165Hz display and RGB lighting.',
    image: 'https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-7-1.jpg',
    category: 'Gaming',
  },
  {
    id: '4',
    name: 'Sony Xperia 1 V',
    price: '$1400',
    description: '4K OLED display and pro camera tools for creators.',
    image: 'https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-v-1.jpg',
    category: 'Creator',
  },
  {
    id: '5',
    name: 'Nokia XR21',
    price: '$800',
    description: 'Rugged phone built for the outdoors.',
    image: 'https://fdn2.gsmarena.com/vv/pics/nokia/nokia-xr21-1.jpg',
    category: 'Rugged',
  },
];

const ProductListScreen = () => {
  const navigation = useNavigation();
  const { products } = useProducts(); // Get products from context
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');
  const [favorites, setFavorites] = useState<string[]>([]); // Added type annotation
  const [ratings] = useState({
    '1': 4,
    '2': 5,
    '3': 5,
    '4': 4,
    '5': 3,
  });

  // Memoize filtered products for better performance
  const filteredProducts = React.useMemo(() => {
    let filtered = [...products]; // Use products from context
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
    }
    
    return filtered;
  }, [products, searchQuery, selectedCategory, sortOrder]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const renderStars = (count: number) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        {Array(5).fill(0).map((_, i) => (
          <Text key={i} style={{ color: i < count ? '#facc15' : '#d1d5db' }}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }: { item: Product }) => {
    const isFav = favorites.includes(item.id);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.item,
          pressed && { transform: [{ scale: 0.97 }] },
        ]}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Text style={{ fontSize: 20 }}>{isFav ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
          {renderStars(ratings[item.id] || 0)}
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        placeholderTextColor="#888"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.categoryContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sortContainer}>
        {Object.entries(sortOptions).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            onPress={() => setSortOrder(key)}
            style={[
              styles.sortButton,
              sortOrder === key && styles.sortButtonActive,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortOrder === key && styles.sortTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            No products found
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
  },
  categoryButtonActive: {
    backgroundColor: '#1f2937',
  },
  categoryText: {
    fontSize: 14,
    color: '#374151',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  sortButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  sortButtonActive: {
    backgroundColor: '#2563eb',
  },
  sortText: {
    fontSize: 14,
    color: '#333',
  },
  sortTextActive: {
    color: '#fff',
  },
  list: {
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 16,
    marginRight: 20,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4b5563',
  },
});

export default ProductListScreen;