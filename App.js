import 'expo-firestore-offline-persistence'
import 'expo-dev-client'
import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/app/screens/Main';
import { AuthContextProvider } from './src/app/context/AuthContext';
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();


export default function App() {
  return (
    <AuthContextProvider>

    <Main />
    </AuthContextProvider>
  );
}

