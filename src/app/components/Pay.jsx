import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react';

const Pay = ({setOpenPay, openPay}) => {
  const imgurl = "https://static.vecteezy.com/system/resources/thumbnails/025/210/811/small/check-mark-icon-transparent-background-checkmark-icon-approved-symbol-confirmation-sign-design-elements-checklist-positive-thinking-sign-correct-answer-verified-badge-flat-icon-png.png"
  return (
    <Modal
    animationType='fade'
    transparent={true}
    visible={openPay}
    onRequestClose={()=>setOpenPay(false)}
    >

    <View style={styles.main} >
      <View style={styles.container} >
        <Image source={{uri:imgurl}} style={styles.imgg} />
        <Text style={{fontWeight:'600', fontSize:35,}} >Order taken</Text>
        <TouchableOpacity onPress={()=>setOpenPay(false)} style={styles.ok} >
            <Text style={styles.text} >Close</Text>
        </TouchableOpacity>
      </View>
    </View>
    
</Modal>
  )
}

export default Pay

const styles = StyleSheet.create({
  text:{
    color:'#31A00A'
  },
  ok:{
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:8,
    borderWidth:2,
    borderColor:'#31A00A',
    borderRadius:5,
    marginTop:15,
    alignSelf:'center'
  },
  imgg:{
    width:150,
    height:150,
    objectFit:'cover',
  },
  container:{
    backgroundColor:'#fff',
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:10,
    width:'80%'
  },
  main:{
    position:'absolute',
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#949191AA',
  }
})