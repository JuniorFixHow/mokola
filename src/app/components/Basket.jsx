import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
const {height} = Dimensions.get('screen');
const Basket = ({navigation}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.main} >
      <FontAwesome5 name="cart-plus" size={30} color="white" />
    </TouchableOpacity>
  )
}

export default Basket

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#31A00A',
        position:'absolute',
        zIndex:10,
        right:20,
        // bottom:200,
        top:height - 200,
        padding:12,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    }
})