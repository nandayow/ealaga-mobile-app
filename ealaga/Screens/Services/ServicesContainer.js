import React from 'react'
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 

// Shared
import Header from '../../Shared/Header';
import Colors from '../../Shared/Color';
 import ServiceProgressSteps from './ServiceProgressSteps';
 
function ServicesContainer(props) {

 
  return (
    <SafeAreaProvider style={{ flex: 1 ,  backgroundColor: Colors.main, }}>
        <Header navigation={props.navigation}/>  
        <ServiceProgressSteps  navigation={props.navigation}/>
     </SafeAreaProvider>
  )
}



export default ServicesContainer