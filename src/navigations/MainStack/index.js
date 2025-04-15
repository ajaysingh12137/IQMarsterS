import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../app/layouts/HomeScreen'
import ProfileScreen from '../../app/layouts/ProfileScreen'
import NotificationScreen from '../../app/layouts/NotificationScreen'
import TaskScreen from '../../app/layouts/TaskScreen'
import ChatScreen from '../../app/layouts/ChatScreen'
import CoursesScreen from '../../app/layouts/CoursesScreen'
import CourseDetailScreen from '../../app/layouts/CourseDetailScreen'
import QuizScreen from '../../app/layouts/QuizScreen'

const MainStack = () => {
  const Stack=createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    <Stack.Screen name="TaskScreen" component={TaskScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="CoursesScreen" component={CoursesScreen} />
    <Stack.Screen name="QuizScreen" component={QuizScreen} />
    <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
   </Stack.Navigator>
  )
}

export default MainStack