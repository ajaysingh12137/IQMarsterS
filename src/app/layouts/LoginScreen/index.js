import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { COLORS } from '../../hooks/colors'
import { Images } from '../../../assets/Images'
import Entypo from "react-native-vector-icons/Entypo";
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation()
  const [number, setNumber] = useState('')
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(number.length < 10);
  }, [number,]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.grey }}>
      {/* Logo Section */}
      <View style={{ height: usePercentageHeight(30), alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={Images.LOGO}
          style={{ height: usePercentageHeight(60), width: usePercentageWidth(60), resizeMode: 'contain' }}
        />
      </View>

      {/* Language Selection Section */}
      <View style={{ flex: 1, backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: usePercentageHeight(2) }}>
        <Text style={{ fontSize: useFont(14), color: 'black', fontWeight: 'bold', marginVertical: usePercentageHeight(1) }}>
          Welcome!
        </Text>
        <Text style={{ fontSize: useFont(12), color: 'black', marginBottom: usePercentageHeight(1) }}>
          Let's start learning together
        </Text>
        <View style={{ marginTop: usePercentageHeight(4), }}>
          <Text style={{ fontSize: useFont(14), color: 'black', marginBottom: usePercentageHeight(1), fontWeight: '500' }}>Enter Mobile Number</Text>
          <View style={{
            borderWidth: 1, borderColor: COLORS.grey, height: usePercentageHeight(5), alignItems: 'center', gap: usePercentageWidth(1),
            flexDirection: 'row', paddingLeft: usePercentageWidth(1), borderRadius: 8
          }}>
            <Entypo name="phone" size={20} color={COLORS.primary} />
            <TextInput
              placeholder=' Enter Mobile Number'
              placeholderTextColor={COLORS.grey}
              onChangeText={setNumber}
              value={number}
              maxLength={10}
              keyboardType='number-pad'
              style={{ flex: 1 }}
            />
          </View>
        </View>


        <View style={{ marginTop: usePercentageHeight(1) }}>
          <TouchableOpacity disabled={isDisabled}  onPress={() => navigation.navigate('OTPScreen',number)}
            style={{
              justifyContent: 'center',
              backgroundColor: isDisabled ? COLORS.blackOpacity(.2) : COLORS.primaryOpacity(.9),
              height: usePercentageHeight(5),
              alignItems: 'center',
              width: usePercentageWidth(90),
              alignSelf: 'center',
              borderRadius: 10,
              marginTop: usePercentageHeight(2),
            }}
          >
            <Text style={{ fontSize: useFont(14), color: isDisabled ? COLORS.black : COLORS.white, fontWeight: '600' }}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'flex-end', flex: 1, width: usePercentageWidth(60), alignSelf: 'center' }}>
          <Text style={{ fontSize: useFont(11), textAlign: 'center' }}>
            By continuing, you agree to our{' '}
            <Text
              style={{ color: COLORS.primaryOpacity(.8), fontWeight: 'bold' }}
              onPress={() => {
              }}
            >
              Privacy Policy
            </Text>{' '}
            and{' '}
            <Text
              style={{ color: COLORS.primaryOpacity(.8), fontWeight: 'bold' }}
              onPress={() => {
              }}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>

      </View>
    </View >
  )
}

export default LoginScreen
