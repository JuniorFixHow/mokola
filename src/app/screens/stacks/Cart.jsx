import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Vegetables } from '../../../dummy/Vegetable';
import { useState } from 'react';
import Pay from '../../components/Pay';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';

const Cart = ({navigation}) => {
    const [openPay, setOpenPay] = useState(false);
    const [userCarts, setUserCarts] = useState([]);

    useEffect(()=>{
      
        const reference = collection(db, 'Carts');
        const q = query(reference, where("creator", "==", 123))
        console.log(q)
        const unsub = onSnapshot(
            q,  (snapshot)=>{
                let list = [];
                snapshot.docs.forEach((doc)=>{
                    list.push({id:doc.id, ...doc.data()})
                })
                console.log(list)
                setUserCarts(list);
                
            },
            (error)=>{
                console.log(error)
            },
        )
        // user && unsub();
        return()=>{
            unsub()
        }
    },[])

    // console.log(userCarts)
    const deleteItem=async(id)=>{
        try {
            await deleteDoc(doc(db, 'Carts', id))
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <SafeAreaView style={styles.main} >
        <StatusBar style='auto' />
        {
            userCarts.length > 0 &&
            <View style={styles.container} >
                <View style={styles.top} >
                    <Pressable onPress={()=>navigation.navigate('Tab')} style={{alignItems:'center', justifyContent:'center'}} >
                        <AntDesign name="arrowleft" style={{fontWeight:'500',fontSize:33}} color="black" />
                    </Pressable>
                    <Text style={{fontWeight:'700', fontSize:22}} >Payments</Text>
                </View>
                {
                    openPay &&
                    <Pay openPay={openPay} setOpenPay={setOpenPay} />
                }
                <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}} >
                    <View style={styles.content} >
                        {
                            userCarts.map(item=>(
                                <View style={styles.onefood} key={item.id} >
                                    <View style={styles.left} >
                                        <Text style={{fontWeight:'700', fontSize:18,}} >{item.name}</Text>
                                        <Text style={{fontSize:18,}} >Quantity: {item.quantity}</Text>
                                    </View>
                                    <View style={styles.right} >
                                        <Text style={{fontSize:16}}>Total: GHC {item.price}</Text>
                                        <TouchableOpacity onPress={()=>deleteItem(item.id)} style={styles.remove} >
                                            <Text style={{color:'#fff', fontSize:15, fontWeight:'500'}} >Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                        <View style={styles.del} >
                            <View style={styles.detail} >
                                <Text style={{fontSize:26, fontWeight:'700', width:'100%'}} >Delivery details</Text>
                                <Pressable style={styles.town} >
                                    <Text style={{fontSize:18,}} >East Legon Mango Avenue</Text>
                                    <AntDesign name="right" size={24} style={styles.aright} color="black" />
                                </Pressable>
                                <View style={styles.house} >
                                    <Text>House No. 17</Text>
                                </View>
                                <View style={styles.account} >
                                    <View style={styles.desc} >
                                        <View style={styles.onedesc} >
                                            <Text style={styles.accounttext} >Subtotal</Text>
                                            <Text style={styles.accounttext} >GHC {userCarts.map(item=>item.price).reduce((a, b)=>a + b, 0)}</Text>
                                        </View>
                                        <View style={styles.onedesc} >
                                            <Text style={styles.accounttext} >Delivery</Text>
                                            <Text style={styles.accounttext} >GHC 15</Text>
                                        </View>
                                        <View style={styles.onedesc} >
                                            <Text style={styles.accounttext} >Processing fee</Text>
                                            <Text style={styles.accounttext} >GHC 5</Text>
                                        </View>
                                        <View style={styles.onedesc} >
                                            <Text style={styles.accounttext} >Discount</Text>
                                            <Text style={styles.accounttext} >-</Text>
                                        </View>
                                    </View>
                                    <View style={styles.total} >
                                        <View style={styles.totaltext} >
                                            <Text style={styles.amount} >Total</Text>
                                            <Text style={styles.amount} >GHC {userCarts.map(item=>item.price).reduce((a, b)=>a + b, 0) + 20}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.butts} >
                                <TouchableOpacity onPress={()=>setOpenPay(true)} style={styles.payb} >
                                    <Text style={styles.online} >PAY ONLINE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>setOpenPay(true)} style={styles.payb} >
                                    <Text style={styles.online} >PAY ON DELIVERY</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        }
        {
            userCarts.length == 0 &&
                <View style={{width:'90%', alignSelf:'center', alignItems:'center', flexDirection:'column'}} >
                    <View style={[styles.top, {marginTop:50,}]} >
                        <Pressable onPress={()=>navigation.navigate('Tab')} style={{alignItems:'center', justifyContent:'center'}} >
                            <AntDesign name="arrowleft" style={{fontWeight:'500',fontSize:33}} color="black" />
                        </Pressable>
                        <Text style={{fontWeight:'700', fontSize:22}} >Payments</Text>
                </View>
                <View style={{width:'100%',  justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
                    <Text style={{fontSize:40, fontWeight:'500', marginTop:200}} >No Data</Text>
                </View>
            </View>
        }
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
    online:{
        fontWeight:'800',
        fontSize:18,
    },
    payb:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        borderWidth:2,
        borderColor:'#31A00A',
        borderRadius:8,
    },
    butts:{
        width:'100%',
        alignItems:'center',
        gap:15,
    },
    amount:{
        fontSize:22,
        fontWeight:'700',

    },
    totaltext:{
        width:'100%',
        flexDirection:"row",
        justifyContent:'space-between',
    },
    total:{
        borderTopWidth:2,
        borderBottomWidth:2,
        width:'100%',
        paddingVertical:5,
    },
    accounttext:{
        fontSize:16,
        fontWeight:'700',
    },
    onedesc:{
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    desc:{
        width:'100%',
        alignItems:'center',
        gap:15,
    },
    account:{
        width:'100%',
        alignItems:'center',
        gap:15,
    },
    house:{
        width:'100%',
        borderWidth:1,
        paddingHorizontal:5,
        paddingVertical:8,
        borderRadius:10,
    },
    town:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    detail:{
        width:'95%',
        alignSelf:'center',
        alignItems:'center',
        gap:15,
    },
    del:{
        width:'100%',
        alignItems:'center',
        gap:20,
    },
    remove:{
        backgroundColor:'#E33629',
        borderRadius:5,
        paddingVertical:3,
        paddingHorizontal:8,
        justifyContent:'center',
        alignItems:'center',
    },
    right:{
        paddingLeft:5,
        borderLeftWidth:3,
        alignItems:'center',
        gap:8,
    },
    onefood:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center',
        elevation:8,
        borderWidth:1,
        backgroundColor:'#FBFBFB',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:15,
    },
    content:{
        width:'100%',
        gap:20,
        paddingBottom:70,
    },
    top:{
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        gap:15,
    },
    container:{
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        marginTop:50,
        gap:20,
    },
    main:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        width:'100%'
    },
})