import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView , Pressable} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import Basket from '../../components/Basket';

const Single = ({navigation}) => {
    const {params} = useRoute();
    const [count, setCount] = useState(0);
    const reduce = ()=>{
        if(count > 0){
            setCount(prev=>prev - 1)
        }
    }
  return (
    <SafeAreaView style={styles.main} >
        <StatusBar style='auto' />
        <Basket navigation={navigation} />
        <View style={styles.container} >
            <View style={styles.content} >
                <View style={styles.top} >
                    <Pressable onPress={()=>navigation.navigate('Tab')} style={{alignItems:'center', justifyContent:'center'}} >
                        <AntDesign name="arrowleft" style={{fontWeight:'500',fontSize:33}} color="black" />
                    </Pressable>
                    <Text style={{fontWeight:'700', fontSize:18}} >{params.food.title}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}} >
                    <View style={styles.foods} >
                        <View style={styles.foodCont} >
                            <Image style={styles.foodimg} source={{uri:params.food.img}} />
                        </View>
                        <View style={styles.fooddown} >
                            <View style={styles.foodtitle} >
                                <Text style={styles.title} >{params.food.title.toUpperCase()}</Text>
                                <Text style={styles.subt1} >{params.food.subt}</Text>
                            </View>
                                <View style={{width:'100%', marginTop:20, gap:0}} >
                                    <Text style={{fontWeight:'700', fontSize:18, marginLeft:10}} >Tomatoes</Text>
                                    <View style={styles.buy} >
                                        <View style={styles.left} >
                                            <Text style={styles.subt} >1KG / GHC 25.00</Text>
                                            <TouchableOpacity onPress={reduce} style={{alignItems:'center', justifyContent:'center'}} >
                                                <Entypo name="minus" size={24} color="black" />
                                            </TouchableOpacity>
                                            <Text style={styles.zero} >{count}</Text>
                                            <TouchableOpacity onPress={()=>setCount(prev => prev + 1)} style={{alignItems:'center', justifyContent:'center'}} >
                                                <Feather name="plus" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.add} >
                                            <Text style={{fontSize:16, fontWeight:'500', color:'#fff'}} >ADD</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.pay} >
                <Text style={{color:'#fff', fontWeight:'700', fontSize:20}} >PROCEED TO PAYMENT</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Single

const styles = StyleSheet.create({
    pay:{
        backgroundColor:'#31A00A',
        width:'100%',
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:12,
        borderRadius:10,
    },
    add:{
        backgroundColor:'#31A00A',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:8,
        paddingHorizontal:15,
        borderRadius:5,
    },
    zero:{
        fontSize:40,
        fontWeight:'bold',
        color:'#31A00A'
    },
    left:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        borderBottomWidth:2,
    },
    buy:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    subt:{
        fontSize:16,
        fontWeight:'500'
    },
    subt1:{
        fontSize:16,
        fontWeight:'500',
        color:'#7C7A7A'
    },
    title:{
        fontSize:18,
        fontWeight:'600'
    },
    foodtitle:{
        gap:5,
        marginLeft:15,
    },
    fooddown:{
        width:'100%',
        // gap:20,
    },
    
    foodimg:{
        width:'100%',
        height:160,
        objectFit:'cover',
        borderRadius:15,
    },
    foodCont:{
        backgroundColor:'#FAFAFA',
        elevation:2,
        width:'100%',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        padding:15,
    },
    foods:{
        gap:10,
        width:'100%',
        alignItems:'center',
        paddingBottom:70
    },
    
    top:{
        width:'100%',
        alignItems:'center',
        gap:15,
        flexDirection:'row'
    },
    content:{
        width:'100%',
        alignItems:'center',
        alignSelf:'center',
        gap:20,
    },
    container:{
        marginTop:50,
        width:'90%',
        alignItems:'center',
        alignSelf:'center',
        flex:1,
        justifyContent:'space-between'
    },
    main:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        flex:1,
    }
})