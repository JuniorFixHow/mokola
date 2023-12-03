import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { StatusBar } from 'expo-status-bar';
import PhoneInput from 'react-native-phone-number-input';
import {  Ionicons,  Entypo, MaterialIcons } from '@expo/vector-icons';
import GOOGLE from '../../../assets/google.png';

const Login = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedNumber, setFormattedNumber] = useState(undefined);
    const [isValid, setIsValid] = useState(false);

    const otpInput = useRef(null);
    const phone = useRef(null);

    useEffect(()=>{
        if(formattedNumber !== ''){

            const checkValid = phone.current?.isValidNumber(phoneNumber)
            if(checkValid){
            setIsValid(true);
            setFormattedNumber('+'+phone.current.state.code+phoneNumber);
            }
            else{
                setIsValid(false);
            }
        }
        else{
            setIsValid(false);
        }
    }, [phoneNumber, phone, formattedNumber])
  return (
    <SafeAreaView style={styles.main} >
        <StatusBar style='auto' />
        <View style={styles.container} >
            <Text style={styles.phone} >Enter phone number</Text>
            <View style={styles.details} >
                <View style={styles.valid} >
                    <PhoneInput
                        ref={phone}
                        defaultValue={phoneNumber}
                        defaultCode="GH"
                        layout="first"
                        onChangeText={(text) => {
                        setPhoneNumber(text);
                        }}
                        onChangeFormattedNumber={(text) => 
                            setFormattedNumber(text)
                        }
                        withDarkTheme
                        withShadow
                        autoFocus

                        containerStyle={styles.phoneContainer}
                        textContainerStyle={{backgroundColor:'#fff', borderLeftColor:'#afaeae', borderLeftWidth:2}}
                    />
                    {
                        !isValid ?
                        <Entypo name="cross" size={24} color="crimson" />
                        :
                        <Ionicons name="checkmark-circle-outline" size={24} color="green" />
                    }
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Tab')} style={styles.cont} >
                    <Text style={{fontWeight:'500', color:'#fff', fontSize:24}} >Continue</Text>
                </TouchableOpacity>
                <View style={styles.orcont} ><Text style={styles.or}>or</Text></View>
                <View style={styles.socials} >
                    <TouchableOpacity style={styles.gcont} >
                        <Image source={GOOGLE} style={styles.google} />
                        <Text style={styles.gtext} >Continue with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gcont} >
                        <MaterialIcons name="email" size={30} color="black" />
                        <Text style={styles.gtext}>Continue with email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    gtext:{
        fontSize:20,
        fontWeight:'500',
    },
    google:{
        width:30,
        height:30,
        objectFit:'cover'
    },
    gcont:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        gap: 15,
        backgroundColor:'#EBEBEB',
        borderRadius:10,
        paddingVertical:12,
    },
    socials:{
        gap:20,
        width:'100%',
        alignItems:'center',
        marginTop:10,
    },
    or:{
        position:'absolute',
        zIndex:10,
        backgroundColor:'#fff',
        width:'30%',
        textAlign:'center',
        fontSize:18,
        color:'grey'
    },
    orcont:{
        backgroundColor:'lightgrey',
        width:'100%',
        height:1.5,
        alignItems:'center',
        justifyContent:'center',
    },
    phoneContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    cont:{
        backgroundColor:'#65B848',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'flex-start',
        paddingVertical:8,
        borderRadius:10,
    },
    valid:{
        flexDirection:'row',
        gap:5,
        alignItems:'center',
        width:'100%'
    },
    details:{
        gap:20,
        width:'100%',
        alignItems:'center'
    },
    phone:{
        fontWeight:'600',
        fontSize:24,
    },
    container:{
        marginTop:50,
        gap:25,
        alignItems:'center',
        width:'85%',
        alignSelf:'center'
    },
    main:{
        height:'100%',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#fff'
    },
})