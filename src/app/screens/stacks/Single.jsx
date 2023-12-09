import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput,Dimensions, ScrollView , Pressable} from 'react-native'
import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import Basket from '../../components/Basket';
import { useEffect } from 'react';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';

const {height} = Dimensions.get('screen');

const Single = ({navigation}) => {
    const {params} = useRoute();
    const [count, setCount] = useState([]);
    const [foods, setFoods] = useState([]);
    const [countId, setCountId] = useState(null);
    const [mode, setMode] = useState('a');
    const [bag, setBag] = useState([]);
    const reduce = (id)=>{
        let countData = {
            id,
            value:0,
        }
        if(count.filter(item=>item.id=== id)[0]?.value > 0){
            count.filter(item=>item.id=== id)[0].value = count.filter(item=>item.id=== id)[0].value - 1
            setCount(pre=>[...pre, count.filter(item=>item.id === id)[0]])
        }
        // else{
        //     setCount(count=>[...count, countData])
        // }
    }
    const add = (id)=>{
        let countData = {
            id,
            value:1,
        }
        if(count.filter(item=>item.id=== id).length > 0){
            count.filter(item=>item.id=== id)[0].value = count.filter(item=>item.id=== id)[0].value + 1
            setCount(pre=>[...pre, count.filter(item=>item.id === id)[0]])
        }
        else{
            setCount(count=>[...count, countData])
        }
    }

    // const a = [91,65,91,88,26]
    // const b = a.slice(a.indexOf(65));
    // console.log(b);

    const addToCart = async(id, name, price)=>{
        const data = {
            name,
            price: count.filter(item=>item.id=== id)[0]?.value ? count.filter(item=>item.id=== id)[0]?.value * price : price,
            quantity:count.filter(item=>item.id=== id)[0]?.value > 0? count.filter(item=>item.id=== id)[0]?.value : 1,
            creator:123,
        }
        try {
            alert('Added ✅')
            await addDoc(collection(db, 'Carts'), data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        const reference = collection(db, 'Categories', params.food.id, 'Foods');
        const unsub = onSnapshot(
            reference, {includeMetadataChanges:true},  (snapshot)=>{
                let list = [];
            //   console.log(list)
                snapshot.docs.forEach((doc)=>{
                    list.push({id:doc.id, ...doc.data()});
                    
                });
                // console.log(list.length>0)
                if(list.length){
                    setFoods(list);
                }
            },
            (error)=>{
                console.log(error)
            },
        )
        return ()=>{
            unsub();
        }
    },[])
const textRef = useRef()
// console.log(textRef)

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
                    <Text style={{fontWeight:'700', fontSize:22}} >{params.food.name}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}} >
                    <View style={styles.foods} >
                        <View style={styles.foodCont} >
                            <Image style={styles.foodimg} source={{uri:params.food.img}} />
                        </View>
                        <View style={styles.fooddown} >
                            <View style={styles.foodtitle} >
                                <Text style={styles.title} >{params.food.name.toUpperCase()}</Text>
                                <Text style={styles.subt1} >{params.food.subt}</Text>
                            </View>
                            {
                                foods.map(item=>(

                                <View onPress={()=>setCountId(item.id)} key={item.id} style={{width:'100%', marginTop:20, gap:0}} >
                                    <Text style={{fontWeight:'700', fontSize:18, marginLeft:10}} >{item.title}</Text>
                                    <View style={styles.buy} >
                                        <View style={styles.left} >
                                           
                                            <Text style={styles.subt} >GHC {item.price} / 1</Text>
                                            <TouchableOpacity onPress={()=> reduce(item.id)} style={{alignItems:'center', justifyContent:'center'}} >
                                                <Entypo name="minus" size={24} color="black" />
                                            </TouchableOpacity>
                                            <Text id={item.id} onPress={(event) => console.log(event._dispatchInstances.memoizedProps.children)} style={styles.zero} >{count.filter(i=>i.id===item.id)[0]?.value > 0 ? count.filter(i=>i.id===item.id)[0]?.value:'0'}</Text>
                                            <TouchableOpacity onPress={()=>add(item.id)} style={{alignItems:'center', justifyContent:'center'}} >
                                                <Feather name="plus" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={()=>addToCart(item.id, item.title, item.price)} style={styles.add} >
                                            <Text style={{fontSize:16, fontWeight:'500', color:'#fff'}} >ADD</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                    ))
                            }
                            
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
        marginBottom:30,        
    },
    
    top:{
        width:'100%',
        alignItems:'center',
        gap:15,
        flexDirection:'row',
    },
    content:{
        width:'100%',
        alignItems:'center',
        alignSelf:'center',
        gap:20,
        flex:1,
    },
    container:{
        marginTop:50,
        width:'90%',
        alignItems:'center',
        alignSelf:'center',
        flex:1,
        justifyContent:'space-between',
    },
    main:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        flex:1,
    }
})