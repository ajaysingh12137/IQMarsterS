import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from 'react-native';
import { COLORS } from '../../hooks/colors';
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const NotificationScreen = () => {
    const navigation = useNavigation();

    // Sample notifications data
    const notifications = [
        {
            id: '1',
            title: 'New Quiz Available',
            message: 'A new daily quiz has been published. Test your knowledge now!',
            time: '10 minutes ago',
            type: 'quiz',
            read: false
        },
        {
            id: '2',
            title: 'Assignment Due Soon',
            message: 'Your Physics Lab Report is due in 2 days. Don\'t forget to submit!',
            time: '2 hours ago',
            type: 'assignment',
            read: false
        },
        {
            id: '3',
            title: 'Quiz Result Available',
            message: 'Your result for yesterday\'s quiz is now available. You scored 85%!',
            time: '1 day ago',
            type: 'result',
            read: true
        },
        {
            id: '4',
            title: 'New Course Material',
            message: 'New study materials have been uploaded to your Mathematics course.',
            time: '2 days ago',
            type: 'course',
            read: true
        },
        {
            id: '5',
            title: 'Weekly Progress Report',
            message: 'Your weekly progress report is ready. Check out your achievements!',
            time: '5 days ago',
            type: 'report',
            read: true
        }
    ];

    // Render notification icon based on type
    const renderNotificationIcon = (type) => {
        switch (type) {
            case 'quiz':
                return <MaterialCommunityIcons name="clipboard-text-outline" size={useFont(20)} color={COLORS.primary} />;
            case 'assignment':
                return <AntDesign name="filetext1" size={useFont(20)} color={COLORS.primary} />;
            case 'result':
                return <AntDesign name="Trophy" size={useFont(20)} color={COLORS.primary} />;
            case 'course':
                return <Entypo name="book" size={useFont(20)} color={COLORS.primary} />;
            case 'report':
                return <AntDesign name="barschart" size={useFont(20)} color={COLORS.primary} />;
            default:
                return <Entypo name="notification" size={useFont(20)} color={COLORS.primary} />;
        }
    };

    // Render a notification item
    const renderNotification = ({ item }) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                paddingVertical: usePercentageHeight(1.5),
                paddingHorizontal: usePercentageWidth(4),
                backgroundColor: item.read ? COLORS.white : COLORS.primaryOpacity(0.05),
                borderBottomWidth: 1,
                borderBottomColor: COLORS.blackOpacity(0.1)
            }}
        >
            <View style={{
                width: usePercentageWidth(10),
                height: usePercentageWidth(10),
                borderRadius: 8,
                backgroundColor: COLORS.primaryOpacity(0.15),
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: usePercentageWidth(3)
            }}>
                {renderNotificationIcon(item.type)}
            </View>

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontSize: useFont(13),
                        fontWeight: '600',
                        color: COLORS.blackOpacity(0.8)
                    }}>
                        {item.title}
                    </Text>
                    <Text style={{
                        fontSize: useFont(10),
                        color: COLORS.blackOpacity(0.6)
                    }}>
                        {item.time}
                    </Text>
                </View>

                <Text style={{
                    marginTop: 4,
                    fontSize: useFont(12),
                    color: COLORS.blackOpacity(0.7),
                    lineHeight: useFont(16)
                }}>
                    {item.message}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* Header */}
            <View
                style={{
                    height: usePercentageHeight(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: usePercentageWidth(4),
                    backgroundColor: COLORS.primary, paddingTop: usePercentageHeight(4)
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={useFont(20)} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: useFont(16),
                    fontWeight: 'bold',
                    color: COLORS.white,
                    marginLeft: usePercentageWidth(4)
                }}>
                    Notifications
                </Text>
            </View>

            {/* Notifications List */}
            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: usePercentageHeight(4)
                    }}>
                        <Entypo
                            name="bell"
                            size={useFont(40)}
                            color={COLORS.blackOpacity(0.3)}
                            style={{ marginBottom: usePercentageHeight(1) }}
                        />
                        <Text style={{
                            fontSize: useFont(14),
                            color: COLORS.blackOpacity(0.7),
                            textAlign: 'center'
                        }}>
                            No notifications yet
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default NotificationScreen;