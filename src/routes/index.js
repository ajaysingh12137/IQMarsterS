import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from '../navigations/AuthStack'


const Routes = () => {
    // const 
  return (
   <NavigationContainer>
    <AuthStack/>
   </NavigationContainer>
  )
}

export default Routes