import React from 'react'
import LoginScreen from '../../app/layouts/LoginScreen';
import SignUpScreen from '../../app/layouts/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../app/layouts/WelcomeScreen';
import UserConsent from '../../app/layouts/UserConcent';
import OTPScreen from '../../app/layouts/OtpScreen';
import MainStack from '../MainStack';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="UserConsent" component={UserConsent} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen name="MainStack" component={MainStack} />
        </Stack.Navigator>
    )
}

export default AuthStack