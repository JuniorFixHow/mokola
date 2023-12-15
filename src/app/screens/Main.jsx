import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import Board from './stacks/Board';
import Login from './stacks/Login';
import Single from './stacks/Single';
import Cart from './stacks/Cart';
import MainTab from './tabs/MainTab';
import { FetchContextProvider } from '../context/FetchContext';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';


const Main = () => {
    const {isNewUser, user, loadUser} = useContext(AuthContext);
    const Stack = createStackNavigator();
    const CheckAuth=()=>{
      if(user){
        return <MainTab />
      }
      else{
        return <Login />
      }
    }
    if(loadUser){
      return(
        <Loading message={'Loading...'} />
      )
    }
  return (
      <FetchContextProvider>
        <NavigationContainer  >
          <Stack.Navigator initialRouteName={isNewUser ? 'Board': 'Tab'}  >
            <Stack.Screen name='Borad' options={{ headerShown:false}} component={Board} />
            <Stack.Screen name='Login' options={{ headerShown:false}} component={isNewUser == 'Yes' ? Board : CheckAuth} />
            <Stack.Screen name='Tab' options={{ headerShown:false}} component={isNewUser == 'Yes' ? Board: CheckAuth} />
            <Stack.Screen name='Single' options={{ headerShown:false}} component={!user ? Login : Single} />
            <Stack.Screen name='Cart' options={{ headerShown:false}} component={!user ? Login : Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </FetchContextProvider>
  )
}

export default Main

const styles = StyleSheet.create({})