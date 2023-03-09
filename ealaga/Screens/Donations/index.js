import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
 
// Shared
import Header from '../../Shared/Header';
import DonationCard from './DonationCard';
import Colors from '../../Shared/Color';
   

// Dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

 
const DonationsContainer = (props) => {
  return (

    <View>
      <Header navigation={props.navigation} />
      <Text style={styles.title}>My Donation</Text>
      <View style={styles.container}>
        <DonationCard navigation={props.navigation} />
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

export default DonationsContainer