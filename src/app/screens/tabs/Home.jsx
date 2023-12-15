import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView , Pressable} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Basket from '../../components/Basket';
import { useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Home = ({navigation}) => {
    const {cats} = useContext(FetchContext);
    const {user} = useContext(AuthContext);
    // console.log(user.uid)
    const userImg = "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.main} >
        <StatusBar style='auto' />
        <Basket navigation={navigation} />
        <View style={styles.container} >
            <View style={styles.top} >
                <View style={styles.welcome} >
                    <Image style={styles.userImg} source={{uri:user.photoURL}} />
                    <View style={styles.userCont} >
                        <Text style={{fontSize:24, fontWeight:'500'}} >Hi, {user.displayName.split(' ')[0]}</Text>
                        <Text style={{fontSize:22, fontWeight:'200',}} >Looking for what to buy?</Text>
                    </View>
                </View>
                <View style={styles.searchCont} >
                    <Ionicons name="search-outline" size={24} color="lightgrey" />
                    <TextInput returnKeyType='search' 
                        placeholder='Search here...'
                        style={styles.search}
                        onChangeText={(e)=>setSearch(e)}
                        value={search}
                    />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal >
                    <View style={styles.itemsScroll} >
                        <TouchableOpacity onPress={()=>setSearch('')} style={styles.title} >
                            <Text style={styles.item} >All</Text>
                        </TouchableOpacity>
                        {
                            cats.map(item=>(
                            <TouchableOpacity onPress={()=>setSearch(item.name)} key={item.id} style={styles.title} >
                                <Text style={styles.item} >{item.name}</Text>
                            </TouchableOpacity>

                            ))
                        }
                       
                    </View>
                </ScrollView>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:'90%', alignSelf:'center'}} style={{width:'100%',}} >
                <View style={styles.foods} >
                    {
                        
                        cats
                        .filter(item=>{
                            return search === ''? item : Object.values(item)
                            .join(' ')
                            .toLowerCase()
                            .includes(search.toLowerCase())})
                        .map(food=>(
                            <View key={food.id} style={styles.foodCont} >
                                <Image style={styles.foodimg} source={{uri:food.img}} />
                                <View style={styles.fooddwon} >
                                    <View style={styles.foodtext} >
                                        <Text style={{fontWeight:'500', fontSize:20,}} >{food.name}</Text>
                                        <Text style={{fontSize:18}} >{food.subt}</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Single', {food})} style={styles.add} >
                                        <Text style={styles.text} >+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    text:{
        fontWeight:'700',
        fontSize:35, 
        color:'#fff', 
        // height:30, 
        borderRadius:20, 
        // backgroundColor:'red',
        width:65,
        height:50,
        textAlign:'center',
    },
    add:{
        backgroundColor:'#31A00A',
        alignItems:'center',
        justifyContent:'center',
        width:65,
        height:50,
        borderBottomRightRadius:15,
        borderTopLeftRadius:15,
        position:'absolute',
        right:-15,
        bottom:-8,
    },
    fooddwon:{
        width:'100%',
        flexDirection:'row',
        
    },
    foodimg:{
        width:'100%',
        height:150,
        objectFit:'cover',
        borderRadius:15,
    },
    foodCont:{
        backgroundColor:'#FAFAFA',
        elevation:2,
        width:'100%',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        paddingTop:15,
        paddingHorizontal:15,
        paddingBottom:8,
        gap:8,
    },
    foods:{
        gap:25,
        width:'100%',
        paddingBottom:30,
        alignItems:'center'
    },
    item:{
        color:'#fff',
        fontSize:20,
        fontWeight:'500',
    },
    title:{
        backgroundColor:'#31A00A',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    itemsScroll:{
        flexDirection:'row',
        width:'100%',
        gap:20,
        paddingRight:20,
    },
    search:{
        fontSize:18,
        color:'#111',
        width:'90%',
        justifyContent:'center'
    },
    searchCont:{
        backgroundColor:'#F9F9F9',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:10,
        elevation:10,
        borderWidth:1,
        borderColor:'#111'
    },
    userCont:{
        elevation:5,
        backgroundColor:'#fff',
        paddingVertical:5,
        paddingHorizontal:10,
        gap:0,
    },
    userImg:{
        width:60,
        height:60,
        objectFit:'cover',
        borderRadius:40,
    },
    welcome:{
        flexDirection:'row',
        gap:10,
        alignItems:'flex-start',
        width:'100%'
    },
    top:{
        width:'100%',
        alignItems:'center',
        gap:15,
    },
    container:{
        gap:20,
        marginTop:50,
        width:'92%',
        alignItems:'center',
        alignSelf:'center',
        flex:1,
    },
    main:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        flex:1,
    }
})