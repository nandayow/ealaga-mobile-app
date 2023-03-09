import React, { useState } from 'react'
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
 
// Shared
import Header from '../../Shared/Header';
import HistoryCard from './HistoryCard';
import Colors from '../../Shared/Color';
   

// Dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const HistoryContainer = (props) => {

  return (
 

    <View>
       <Header navigation={props.navigation} />
       <Text style={styles.title}>My History</Text> 
       <View style={styles.container}>
           <HistoryCard navigation={props.navigation} />  
       </View>  
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
      height:windowHeight,
      width:windowWidth,
      backgroundColor: Colors.main,
      borderBottomWidth:200,
      borderBottomColor: Colors.main,
      
   },
  title:{
    fontSize: 30,
    color:Colors.TextColor,
    fontWeight:'bold',
    textAlign:"center",
    height:100,
    textAlignVertical:"center",
    backgroundColor:Colors.main
  },

    refreshColor:
    {
      tintColor:Colors.red,
      backgroundColor:"green"

    }, 
 
});

export default HistoryContainer