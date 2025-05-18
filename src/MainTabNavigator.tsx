// MainTabNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../src/Screens/product';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen 
        name="Products" 
        component={ProductListScreen} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;