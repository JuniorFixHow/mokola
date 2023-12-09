import { StyleSheet, Text, View, SafeAreaView,ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import CART from '../../../assets/cart.png';
import Basket from '../../components/Basket';
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const {width, height} = Dimensions.get('screen');

const Map = ({navigation}) => {

  const ASPECT_RATIO = width/height;
  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;

  const [location, setLocation] = useState({
    longitude: -0.190625,
    latitude:5.5910741,
    latitudeDelta,
    longitudeDelta,
  })

  getLocationCoords = async()=>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !=='granted'){
      alert('Please grant location permision');
    }

    let currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    console.log(currentLocation.coords);
     setLocation(
      {
        longitude:currentLocation.coords.longitude,
        latitude:currentLocation.coords.latitude,
        latitudeDelta,
        longitudeDelta,
       }
     )
  }
  // console.log(location)
  useEffect(()=>{
    getLocationCoords()
  },[])
  return (
    <SafeAreaView style={styles.main} >
      <StatusBar style='auto' />
      <Basket navigation={navigation} />
      <View style={styles.mainc} >
        <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}} >
          <View style={styles.container} >
            <View style={styles.content} >
              <View style={styles.map} >
                <MapView 
                initialRegion={location}
                provider={PROVIDER_GOOGLE}
                 style={styles.mapv} >
                  <Marker coordinate={location} title='Current location' />
                </MapView>
              </View>
              <View style={styles.detail} >
                <Text style={{fontWeight:'bold', width:'100%', textAlign:'center', fontSize:30}} >Delivery in progress</Text>
                <View style={styles.middle} >
                  <Image source={CART} style={styles.cart} />
                  <View style={styles.names}>
                    <Text style={{fontSize:19, fontWeight:'600'}} >Order number: #0035968</Text>
                    <Text style={{fontWeight:'600', fontSize:16}} >Rider Details</Text>
                    <View style={styles.one} >
                      <Text style={styles.name} >Rider name:</Text>
                      <Text style={styles.name} >Doe Kelvin</Text>
                    </View>
                    <View style={styles.one} >
                      <Text style={styles.name} >Rider contact:</Text>
                      <Text style={styles.name} >0249738294</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.down} >
                  <View style={styles.onedown} >
                    <Text style={{fontWeight:'bold', fontSize:30,color:'#31A00A'}} >Status</Text>
                    <Text style={{fontSize:18, fontWeight:'700'}} >On my way!</Text>
                  </View>
                  <View style={styles.onedown} >
                    <Text style={{fontWeight:'bold', fontSize:30,color:'#31A00A'}} >ETA</Text>
                    <Text style={{fontSize:18, fontWeight:'700'}} >10:22 PM</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.call} >
              <Text style={{fontSize:20, fontWeight:'800', color:'#fff'}} >Call Rider</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Map

const styles = StyleSheet.create({
  call:{
    width:'100%',
    backgroundColor:'#31A00A',
    paddingVertical:10,
    borderRadius:20,
    alignItems:'center',
    marginBottom:10,
  },
  onedown:{
    alignItems:'center'
  },
 down:{
  width:'100%',
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'space-around',
  marginTop:10,
 },
  name:{
    fontSize:16,
  },
  one:{
    width:'100%',
    flexDirection:'row',
    width:width-120,
    justifyContent:'space-between'
  },
  names:{
    gap:8,
    // width:'100%'
  },
  middle:{
    alignItems:'flex-start',
    // gap:20,
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
  },
  cart:{
    width:70,
    height:80,
    objectFit:'cover'
  },
  detail:{
    width:'100%',
    alignItems:'center',
    gap:5,
  },
  mapv:{
    width:'100%',
    height:height/2,
    borderRadius:5,
  },
  map:{
    width:'100%',
    alignItems:'center',
  },
  content:{
    alignItems:'center',
    width:'100%',
    gap:15,
    
  },
  container:{
    width:'100%',
    alignItems:'center',
    paddingBottom:20,
    gap:30,
  },
  mainc:{
    width:'90%',
    alignSelf:'center',
    alignItems:'center',
    marginTop:50,
    flex:1,
  },
  main:{
    width:'100%',
    alignItems:'center',
    flex:1,
    backgroundColor:'#fff'
  }
})