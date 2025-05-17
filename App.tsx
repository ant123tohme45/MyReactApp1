import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/Sign/Signup';
import Signin from './src/Sign/Signin';
import InitialScreen from './src/main/initial';
import verification from './src/Sign/verification';
import ProductListScreen from './src/Screens/product';
import details from './src/Screens/details';
import { ThemeProvider } from './src/theme/theme';
import ForgotPasswordScreen from './src/Screens/forgot';
import ContactUsScreen from './src/Screens/forgot';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Initial"
              component={InitialScreen}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen
              name="Verification"
              component={verification}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen
              name="ProductScreen"
              component={ProductListScreen}
              options={{ title: 'Products' }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={details}
              options={{ title: 'Profile' }}
            />
            <Stack.Screen
              name="forgot"
              component={ForgotPasswordScreen}
              options={{ title: 'Forgot' }}

            />
            <Stack.Screen name="ContactUs" component={ContactUsScreen}
            />



          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
  );
}

export default App;
