import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Entypo, FontAwesome, Ionicons} from '@expo/vector-icons';
import Home from './Home';
import Search from './Search';
import Profile from './Profile';
import Map from './Map';

const MainTab = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
        initialRouteName="ChatList"
        screenOptions={{
            tabBarStyle: { 
            backgroundColor:'#fff',
            height:60,
            // paddingBottom:10,
        },
        lazy:true,
        }}
        backBehavior='initialRoute'
    >
        <Tab.Screen
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                <Entypo name="home" size={35} color={focused?"#65B848": "#111"} /> ),
                // tabBarActiveTintColor:'#fff',  
                // tabBarLabel:i18n.t('chat'),
                // tabBarLabelStyle:{fontWeight:'bold'},
                tabBarShowLabel:false,
                tabBarHideOnKeyboard:true,
            }} name="Home" component={Home}
        />
        <Tab.Screen
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                <FontAwesome name="search" size={35} color={focused?"#65B848": "#111"} /> ),
                tabBarActiveTintColor:'#fff',  
                // tabBarLabel:i18n.t('chat'),
                // tabBarLabelStyle:{fontWeight:'bold'},
                tabBarHideOnKeyboard:true,
                tabBarShowLabel:false,
            }} name="Search" component={Search}
        />
        <Tab.Screen
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                <Ionicons name="location-sharp" size={35} color={focused?"#65B848": "#111"} /> ),
                tabBarActiveTintColor:'#fff',  
                // tabBarLabel:i18n.t('chat'),
                // tabBarLabelStyle:{fontWeight:'bold'},
                tabBarShowLabel:false,
                tabBarHideOnKeyboard:true,
            }} name="Locate" component={Map}
        />
        <Tab.Screen
            options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                <FontAwesome name="user" size={35} color={focused?"#65B848": "#111"} /> ),
                tabBarActiveTintColor:'#fff',  
                // tabBarLabel:i18n.t('chat'),
                // tabBarLabelStyle:{fontWeight:'bold'},
                tabBarShowLabel:false,
                tabBarHideOnKeyboard:true,
            }} name="Profile" component={Profile}
        />
    </Tab.Navigator>
  )
}

export default MainTab

const styles = StyleSheet.create({})