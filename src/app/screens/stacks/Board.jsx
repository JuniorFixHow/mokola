import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Board = ({navigation}) => {
    const URL = "https://www.graphic.com.gh/images/2018/july/food.png";
  return (
    <SafeAreaView style={styles.main} >
        <StatusBar style='suto' />
      <View style={styles.container} >
        <View style={styles.content} >
            <View style={styles.textContainer} >
                <Text style={{fontSize:35, fontWeight:'700', textAlign:'center'}} >Let's Get Started On Your Journey</Text>
                <Text style={{fontSize:18, fontWeight:'400', textAlign:'center', lineHeight:30,}} >Get to experience shopping for local foodstuff with ease and convenience</Text>
            </View>
            <Image style={styles.imgg} source={{uri:URL}}  />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.cont} >
            <Text style={{fontSize:20, color:'#fff', fontWeight:'500'}} >CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Board

const styles = StyleSheet.create({
    cont:{
        width:'100%',
        paddingVertical:12,
        backgroundColor:'#31A00A',
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:30,
    },
    imgg:{
        width:'100%',
        height:300,
        objectFit:'cover',
        borderRadius:15,
    },
    textContainer:{
        gap:8,
    },
    content:{
        gap: 20,
        width:'100%',
        alignItems:'center'
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
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        flex:1,
    },
})