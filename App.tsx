import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './src/Sign/Signup';
import Signin from './src/Sign/Signin';
import InitialScreen from './src/main/initial';
import verification from './src/Sign/verification';
import ProductListScreen from './src/Screens/product';
import details from './src/Screens/details';
import { ThemeProvider } from './src/theme/theme';
import ForgotPasswordScreen from './src/Screens/forgot';
import ContactUsScreen from './src/Screens/forgot';
import { AuthProvider } from './src/AUTHENTICATION/authContext';
import ProfileScreen from './src/ProfileScreen';
import EditProfileScreen from './src/EditProfileScreen';  
import VerificationScreen from './src/Sign/verification';
import AddProductScreen from './src/addProduct';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create the tab navigator for main app screens
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 4,
        },
        tabBarStyle: {
          height: 60,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="ProductsTab" 
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      /><Tab.Screen name ="AddProductScreen" component={AddProductScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />

    </Tab.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Auth Screens - shown when not logged in */}
            <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signin" component={Signin} options={{ headerShown: true}} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true }} />
                        <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: true}} />

            <Stack.Screen name="MainApp" component={MainTabs} options={{ headerShown: false }} />
            
            <Stack.Screen name="ProductDetails" component={details} />
            <Stack.Screen name="forgot" component={ForgotPasswordScreen} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;