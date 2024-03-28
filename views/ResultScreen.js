import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
export default function ResultScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
       <Image style={{width:150,height:150}}  source={require("../assets/Frame_42.png")}/> 
       <Text style={{fontSize:25,fontWeight:"bold", margin:5}}>Congratulations User</Text>
       <Text style={{fontSize:18,fontWeight:"bold" ,margin:5}}>Your Score</Text>
        <View style={{flexDirection:"row", margin:5}}>
            <Text style={{fontSize:50,fontWeight:"bold",color:"#56B837",}}>10</Text>
            <Text style={{fontSize:50,fontWeight:"bold",color:"#000000"}}>/</Text>
            <Text style={{fontSize:50,fontWeight:"bold",color:"#000000"}}>10</Text>
        </View>
       <Text style={{fontSize:18,fontWeight:"bold" , margin:5}}>Earned Coin</Text>
       <View style={{flexDirection:"row", margin:5}}>
            <Image style={{width:70,height:70,alignSelf:"center"}}  source={require("../assets/point.png")}/> 
            <Text style={{fontSize:50,fontWeight:"bold",color:"#000000"}}>999</Text>
        </View>
        <TouchableOpacity 
        style={{width:300,height:50,backgroundColor:"#3C9E9E", borderRadius:20, margin:10,justifyContent:"center"}}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"#FFF",textAlign:"center"}}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
            navigation.navigate("Home")
        }}>
            <Text style={{fontSize:16,fontWeight:"600",margin:5}}>Back to Homepage</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
            
        }}>
            <Text style={{fontSize:16,fontWeight:"600",margin:5}}>Connect wallet</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
        alignItems:"center",
        // justifyContent:"center"
    }
})