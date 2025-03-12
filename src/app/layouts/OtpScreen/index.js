import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, StatusBar, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Images } from '../../../assets/Images';
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive';
import { COLORS } from '../../hooks/colors';

const OTPScreen = () => {
    const otpInputs = useRef([]);
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
    const [loading, setLoading] = useState(false)


    const handleOTPChange = (value, index) => {
        if (isNaN(value)) return; // Prevent non-numeric input

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if a digit is entered
        if (value && index < otp.length - 1) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index) => {
        if (index > 0 && !otp[index]) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    // const handleVerifyOTP = async () => {
    //     const enteredOTP = otp.join('');
    //     if (enteredOTP === String(data.data.otp)) {
    //         setLoading(true);
    //         try {
    //             const processUserEndpoint = data.flow === 'login' ? END_POINTS1.LOGIN_USER : END_POINTS1.REGISTER_USER;
    //             const paramsData = data.flow === 'login' ? { number: data.phoneNumber } :
    //                 { email: data.payload.email, number: data.payload.number, name: data.payload.name }
    //             const response = await axios.post(
    //                 `${BASE_URL1}${processUserEndpoint}`,
    //                 paramsData
    //             );
    //             if (response.data.status === true) {
    //                 console.log(response.data,'=------=');

    //                 AsyncStorage.setItem('user', JSON.stringify(response.data.userData))
    //                 Toast.show('OTP Verified Successfully', Toast.SHORT);
    //                 navigation.reset({
    //                     index: 0,
    //                     routes: [{ name: 'Main' }]
    //                 })
    //             }
    //         } catch (error) {
    //             console.error("Error during login:", error);
    //             Toast.show("An error occurred during login", Toast.SHORT);
    //         } finally {
    //             setLoading(false);
    //         }
    //     } else {
    //         Toast.show("OTP is incorrect", Toast.SHORT);
    //     }
    // };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: COLORS.grey }}>
                <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

                <View style={{ marginTop: safeAreaInsets.top, flex: 1, paddingHorizontal: usePercentageHeight(2), alignItems: 'center', backgroundColor: COLORS.white }}>
                    <Image source={Images.LOGO} style={{ height: usePercentageHeight(25), width: '100%' }} resizeMode="contain" />

                    <Text style={{ fontSize: useFont(18), fontWeight: 'bold', color: COLORS.black, marginTop: usePercentageHeight(2) }}>
                        Enter OTP
                    </Text>
                    <Text style={{ fontSize: useFont(13), color: COLORS.grey, textAlign: 'center', marginTop: usePercentageHeight(5) }}>
                        We've sent a verification code to your phone:
                    </Text>
                    <Text style={{ color: COLORS.APP_THEME_GREEN, fontSize: useFont(12), fontWeight: 'bold', marginVertical: usePercentageHeight(.5) }}>
                        {data}
                    </Text>

                    {/* OTP Inputs */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: usePercentageHeight(3) }}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (otpInputs.current[index] = ref)}
                                style={{
                                    width: usePercentageWidth(10),
                                    height: usePercentageHeight(5),
                                    borderWidth: 1,
                                    borderColor: COLORS.grey,
                                    borderRadius: useFont(5),
                                    textAlign: 'center',
                                    fontSize: useFont(18),
                                    marginHorizontal: usePercentageWidth(2),
                                }}
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(value) => handleOTPChange(value, index)}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        handleBackspace(index);
                                    }
                                }}
                            />
                        ))}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('MainStack')}
                        disabled={otp.join('').length !== 6}
                        style={{
                            backgroundColor: otp.join('').length === 6 ? COLORS.primaryOpacity(.9) : COLORS.grey,
                            height: usePercentageHeight(5),
                            borderRadius: useFont(8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: usePercentageHeight(3),
                            width: '100%',
                        }}
                    >
                        {loading ? <ActivityIndicator size={'small'} color={COLORS.white} /> :
                            <Text style={{ color: COLORS.white, fontSize: useFont(14) }}>Verify OTP</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default OTPScreen;
