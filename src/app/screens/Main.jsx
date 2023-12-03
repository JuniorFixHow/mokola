import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import Board from './stacks/Board';
import Login from './stacks/Login';
import Single from './stacks/Single';
import Cart from './stacks/Cart';
import MainTab from './tabs/MainTab';


const Main = () => {
    const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Borad' options={{ headerShown:false}} component={Board} />
        <Stack.Screen name='Login' options={{ headerShown:false}} component={Login} />
        <Stack.Screen name='Tab' options={{ headerShown:false}} component={MainTab} />
        <Stack.Screen name='Single' options={{ headerShown:false}} component={Single} />
        <Stack.Screen name='Cart' options={{ headerShown:false}} component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main

const styles = StyleSheet.create({})