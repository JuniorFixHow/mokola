import { createContext, useEffect, useState } from "react";
import  AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync(); 
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const prepareApp = async()=>{
        try {
            isUserAuthenticated()
            fetchNewUser()
        } catch (error) {
            console.log(error);
        } finally{
            await setTimeout(()=>SplashScreen.hideAsync(), 5000);
        }
    }

    const [user, setUser] = useState(null);
    const [loadUser, setLoadUser] = useState(false);
    const [isNewUser, setIsNewUser] = useState('Yes');


    const onboardNewUser = ()=>{
        try {
            setIsNewUser(null);
            AsyncStorage.setItem('new', JSON.stringify(null));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchNewUser = async()=>{
        try {
            const newUser = await AsyncStorage.getItem('new');
           if(newUser){
            setIsNewUser(JSON.parse(newUser));
           }
           else{
            setIsNewUser(null)
           }
        } catch (error) {
            console.log(error)
        }
    }

    const login = (data)=>{
        setLoadUser(true)
        const userData = JSON.stringify(data);
        try {
            setUser(data);
            AsyncStorage.setItem('user', userData);
            setLoadUser(false)
        } catch (error) {
            setLoadUser(false)
            console.log(error)
        }
    }

    const logout = async()=>{
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            GoogleSignin.configure({})
            await GoogleSignin.revokeAccess();
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }


    const isUserAuthenticated = async()=>{
        setLoadUser(true);
        try {
            const userData = await AsyncStorage.getItem('user');
            if(userData){
                setUser(JSON.parse(userData));
            }
            setLoadUser(false);
        } catch (error) {
            setLoadUser(false);
            console.log(error)
        }
    }


    // useEffect(()=>{
    //     fetchNewUser();
    // },[])

    useEffect(()=>{
        prepareApp()
    },[])

    return(
        <AuthContext.Provider value={{
            user, isNewUser, login, logout, onboardNewUser, loadUser, setIsNewUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}