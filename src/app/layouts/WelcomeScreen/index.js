import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { COLORS } from '../../hooks/colors'
import { Images } from '../../../assets/Images'
import Entypo from "react-native-vector-icons/Entypo";
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive'
import { useNavigation } from '@react-navigation/native';


// Reusable LanguageCard component that accepts a symbol prop
const LanguageCard = ({ language, symbol, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            onPress={() => onSelect(language)}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isSelected ? COLORS.rejectOpacity(.05) : 'white',
                borderWidth: 1,
                borderColor: isSelected ? COLORS.primaryOpacity(.9) : 'gray',
                borderRadius: 10,
                paddingVertical: usePercentageHeight(2),
                paddingHorizontal: usePercentageWidth(4),
                marginVertical: usePercentageHeight(1),
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Symbol Section */}
                <View
                    style={{
                        height: 32,
                        width: 32,
                        borderRadius: 16,
                        backgroundColor: isSelected ? COLORS.primaryOpacity(.9) : 'lightgray',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: usePercentageWidth(2),
                    }}
                >
                    <Text style={{ fontSize: useFont(14), color: isSelected ? 'white' : 'black' }}>
                        {symbol}
                    </Text>
                </View>
                {/* Language Text */}
                <Text style={{ fontSize: useFont(14), color: 'black', fontWeight: 'bold' }}>
                    {language}
                </Text>
            </View>
            {/* Selection Circle with Tick */}
            <View
                style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: isSelected ? COLORS.primaryOpacity(.9) : 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {isSelected && (
                    <Entypo name="check" color={COLORS.primaryOpacity(.8)} size={16} />
                )}
            </View>
        </TouchableOpacity>
    )
}

const WelcomeScreen = () => {
    const navigation =useNavigation()
    const [selectedLanguage, setSelectedLanguage] = useState('')

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
                <Text style={{ fontSize: useFont(14), color: 'black', fontWeight: 'bold', marginBottom: 10 }}>
                    Choose Your Language
                </Text>
                <Text style={{ fontSize: useFont(12), color: 'black', marginBottom: usePercentageHeight(1) }}>
                    Select to proceed
                </Text>

                <LanguageCard
                    language="English"
                    symbol="EN"
                    isSelected={selectedLanguage === 'English'}
                    onSelect={setSelectedLanguage}
                />
                <LanguageCard
                    language="हिंदी"
                    symbol="अ"
                    isSelected={selectedLanguage === 'हिंदी'}
                    onSelect={setSelectedLanguage}
                />
            </View>

            {/* Continue Button */}
            <View style={{ backgroundColor: 'white', justifyContent: 'flex-end', paddingBottom: usePercentageHeight(1) }}>
                <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen',selectedLanguage)}
                    style={{
                        justifyContent: 'center',
                        backgroundColor: COLORS.primaryOpacity(.9),
                        height: usePercentageHeight(5),
                        alignItems: 'center',
                        width: usePercentageWidth(90),
                        alignSelf: 'center',
                        borderRadius: 10,
                        marginTop: usePercentageHeight(2),
                    }}
                >
                    <Text style={{ fontSize: useFont(14), color: 'white', fontWeight: '600' }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WelcomeScreen
