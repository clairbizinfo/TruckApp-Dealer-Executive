import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/AppNavigator/AppNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#e9ecef" />
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}
