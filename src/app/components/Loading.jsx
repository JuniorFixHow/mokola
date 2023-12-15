import {  ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react';

const Loading = ({message}) => {
  return (
    <View style={styles.container} >
        <View style={styles.fill} >
            <ActivityIndicator  size='large' />
            <Text style={styles.load} >{message}</Text>
        </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    load:{
        fontSize:24,
        color:'#1A1818',
        fontWeight:'800',
        textAlign:'center'
    },
    fill:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:'95%',
        alignSelf:'center',
        gap:8
    },
    container:{
        width:'100%',
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
})