import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Basket from '../../components/Basket';

const Search = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main} >
        <StatusBar style='auto'  />
        <Basket navigation={navigation} />
      <View style={styles.container} >
        <Text style={{fontSize:24, fontWeight:'800', width:'100%'}} >Top Searches</Text>
        <View style={styles.searchCont} >
            <Ionicons name="search-outline" size={24} color="lightgrey" />
            <TextInput returnKeyType='search' 
                placeholder='Search here...'
                style={styles.search}
            />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}} >
            <View style={styles.results} >
                <Pressable>
                    <Text style={styles.item} >TOMATOES</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >CABBAGE</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >GALLIC</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >CHICKEN</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >BEEF</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >PORK</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >VEGETABLE OIL</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >EGG</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.item} >APPLE</Text>
                </Pressable>
                
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
    item:{
        fontSize:20,
        fontWeight:'500'
    },
    results:{
        gap:10,
        paddingBottom:70,
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
    container:{
        marginTop:50,
        gap:20,
        width:'90%',
        alignSelf:'center'
    },
    main:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        flex:1,
    },
})