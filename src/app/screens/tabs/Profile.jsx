import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, AntDesign, Foundation, Feather, FontAwesome5 } from '@expo/vector-icons';
import Basket from '../../components/Basket';

const Profile = ({navigation}) => {
    const userImg = "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <SafeAreaView style={styles.main}>
        <StatusBar style='auto' />
        <Basket navigation={navigation} />
        <View style={styles.container} >
            <View style={styles.content} >
                <Text style={{fontSize:24, fontWeight:'700', width:'100%'}} >Profile</Text>
                <View style={styles.userCont} >
                    <View style={styles.imgCont} >
                        <Image style={styles.userImg} source={{uri:userImg}} />
                    </View>
                    <View style={styles.text} >
                        <Text style={{fontSize:22, fontWeight:'500'}} >Mensah Akua</Text>
                        <Text style={{fontSize:22, fontWeight:'500'}} >+233 508 9012 807</Text>
                    </View>
                </View>
                <View style={styles.down} >
                    <Pressable style={styles.itemCont} >
                        <View style={styles.iconCon} >
                            <MaterialIcons name="security" size={24} color="white" />
                        </View>
                        <Text style={styles.account} >Account</Text>
                        <AntDesign name="right" size={18} style={styles.right} color="lightgrey" />
                    </Pressable>
                    <Pressable style={styles.itemCont} >
                        <View style={styles.iconCon} >
                            <MaterialIcons name="privacy-tip" size={24} color="white" />
                        </View>
                        <Text style={styles.account} >Privacy Policy</Text>
                        <AntDesign name="right" size={18} style={styles.right} color="lightgrey" />
                    </Pressable>
                    <Pressable style={styles.itemCont} >
                        <View style={styles.iconCon} >
                            <Foundation name="clipboard-notes" size={24} color="white" />
                        </View>
                        <Text style={styles.account} >Order History</Text>
                        <AntDesign name="right" size={18} style={styles.right} color="lightgrey" />
                    </Pressable>
                    <Pressable style={styles.itemCont} >
                        <View style={styles.iconCon} >
                            <Feather name="info" size={24} color="white" />
                        </View>
                        <Text style={styles.account} >About</Text>
                        <AntDesign name="right" size={18} style={styles.right} color="lightgrey" />
                    </Pressable>
                    <Pressable style={styles.itemCont} >
                        <View style={styles.iconCon} >
                            <FontAwesome5 name="phone-alt" size={24} color="white" />
                        </View>
                        <Text style={styles.account} >Contact Us</Text>
                        <AntDesign name="right" size={18} style={styles.right} color="lightgrey" />
                    </Pressable>
                </View>
            </View>
            <TouchableOpacity style={styles.out} >
                <Text style={{fontSize:18, fontWeight:'500'}} >LOGOUT</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    out:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:30,
        // backgroundColor:'#31A00A',
        paddingVertical:12,
        borderRadius:12,
        borderColor:'#31A00A',
        borderWidth:2,
    },
    account:{
        fontSize:18,
    },
    right:{
        position:'absolute',
        right:0
    },
    iconCon:{
        backgroundColor:'#31A00A',
        padding:10,
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
    },
    itemCont:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'100%',
        gap:20
    },
    down:{
        width:'100%',
        gap:15,
        alignItems:'center'
    },
    userImg:{
        width:60,
        height:60,
        objectFit:'cover',
        borderRadius:40,
    },
    imgCont:{
        padding:3,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:40,
    },
    userCont:{
        gap:10,
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'#EBEBEB',
        paddingVertical:10,
    },
    content:{
        width:'100%', 
        gap:15,
    },
    container:{
        width:'90%',
        alignItems:'center',
        alignSelf:'center',
        marginTop:50,
        justifyContent:'space-between',
        flex:1,
    },
    main:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
        width:'100%',
    }
})