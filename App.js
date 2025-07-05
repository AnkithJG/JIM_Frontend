import 'react-native-gesture-handler';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Signup from './screens/signup';
import Home from './screens/home';
import RNBootSplash from "react-native-bootsplash";
import AnimatedSplash from './screens/AnimatedSplash'; 
import React, { useEffect, useState } from 'react';

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate loading
      await RNBootSplash.hide({ fade: true }); 
    };
    load();
  }, []);

  if (showSplash) {
    return (
      <AnimatedSplash onContinue={() => setShowSplash(false)} />
    );
  }

  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
