import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { COLORS } from '../../hooks/colors';
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Images } from '../../../assets/Images';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('home');

  // Sample leaderboard data
  const leaderboardData = [
    { id: '1', name: 'Alice', points: 95, avatar: 'https://via.placeholder.com/40' },
    { id: '2', name: 'Bob', points: 90, avatar: 'https://via.placeholder.com/40' },
    { id: '3', name: 'Carol', points: 85, avatar: 'https://via.placeholder.com/40' },
    { id: '4', name: 'David', points: 82, avatar: 'https://via.placeholder.com/40' },
    { id: '5', name: 'Emma', points: 79, avatar: 'https://via.placeholder.com/40' },
  ];

  // Sample courses data
  const coursesData = [
    { id: '1', title: 'Mathematics', progress: 75, icon: 'calculator' },
    { id: '2', title: 'Physics', progress: 60, icon: 'linode' },
    { id: '3', title: 'Computer Science', progress: 90, icon: 'laptop' },
    { id: '4', title: 'English Literature', progress: 45, icon: 'book' },
  ];

  // Sample upcoming assignments
  const upcomingAssignments = [
    { id: '1', title: 'Calculus Problem Set', dueDate: 'Apr 15', subject: 'Mathematics' },
    { id: '2', title: 'Physics Lab Report', dueDate: 'Apr 17', subject: 'Physics' },
    { id: '3', title: 'Programming Assignment', dueDate: 'Apr 20', subject: 'Computer Science' },
  ];

  // Render a course item
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: usePercentageWidth(4),
        marginRight: usePercentageWidth(3),
        width: usePercentageWidth(45),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
      onPress={() => navigation.navigate('CourseDetailScreen', { courseId: item.id })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: usePercentageHeight(1) }}>
        <View style={{
          backgroundColor: COLORS.primaryOpacity(0.2),
          borderRadius: 8,
          padding: 8
        }}>
          <FontAwesome name={item.icon} size={useFont(14)} color={COLORS.primary} />
        </View>
        <Text style={{
          marginLeft: usePercentageWidth(2),
          fontSize: useFont(12),
          fontWeight: 'bold',
          color: COLORS.blackOpacity(0.8),
          flex: 1
        }}>
          {item.title}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={{ marginTop: usePercentageHeight(1) }}>
        <View style={{
          height: usePercentageHeight(0.8),
          backgroundColor: COLORS.blackOpacity(0.2),
          borderRadius: 5
        }}>
          <View style={{
            height: '100%',
            width: `${item.progress}%`,
            backgroundColor: COLORS.primary,
            borderRadius: 5
          }} />
        </View>
        <Text style={{
          marginTop: usePercentageHeight(0.5),
          fontSize: useFont(10),
          color: COLORS.blackOpacity(0.8)
        }}>
          {item.progress}% Complete
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Render a leaderboard item
  const renderLeaderboardItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: index < 3 ? COLORS.primaryOpacity(0.1) : COLORS.white,
        padding: usePercentageHeight(1),
        borderRadius: 8,
        marginBottom: usePercentageHeight(1),
      }}
    >
      <Text style={{
        width: usePercentageWidth(8),
        fontSize: useFont(12),
        fontWeight: 'bold',
        color: index < 3 ? COLORS.primary : COLORS.blackOpacity(0.7),
        textAlign: 'center'
      }}>
        #{index + 1}
      </Text>

      <View style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.blackOpacity(0.2),
        overflow: 'hidden',
        marginRight: usePercentageWidth(2)
      }}>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      <Text style={{
        flex: 1,
        fontSize: useFont(12),
        fontWeight: '600',
        color: COLORS.blackOpacity(0.8)
      }}>
        {item.name}
      </Text>

      <Text style={{
        fontSize: useFont(12),
        fontWeight: 'bold',
        color: index < 3 ? COLORS.primary : COLORS.blackOpacity(0.7)
      }}>
        {item.points} pts
      </Text>
    </TouchableOpacity>
  );

  // Render an assignment item
  const renderAssignmentItem = ({ item }) => (
    <View style={{
      backgroundColor: COLORS.white,
      borderRadius: 8,
      padding: usePercentageHeight(1.5),
      marginBottom: usePercentageHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,
      elevation: 1,
    }}>
      <View style={{
        width: usePercentageWidth(10),
        height: usePercentageWidth(10),
        borderRadius: 8,
        backgroundColor: COLORS.primaryOpacity(0.15),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: usePercentageWidth(3)
      }}>
        <AntDesign name="filetext1" size={useFont(16)} color={COLORS.primary} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: useFont(12),
          fontWeight: 'bold',
          color: COLORS.blackOpacity(0.8)
        }}>
          {item.title}
        </Text>
        <Text style={{
          fontSize: useFont(10),
          color: COLORS.blackOpacity(0.7),
          marginTop: 2
        }}>
          {item.subject} • Due {item.dueDate}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primaryOpacity(0.1),
          padding: 8,
          borderRadius: 6
        }}
        onPress={() => navigation.navigate('AssignmentScreen', { assignmentId: item.id })}
      >
        <Text style={{
          fontSize: useFont(10),
          color: COLORS.primary,
          fontWeight: '600'
        }}>
          View
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blackOpacity(0.01) }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* Header with Title and Profile Icon */}
      <View
        style={{
          height: usePercentageHeight(11),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: usePercentageWidth(4),
          backgroundColor: COLORS.primary, paddingTop: usePercentageHeight(4)
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: useFont(18), fontWeight: 'bold', color: COLORS.white }}>
            IQMasters
          </Text>
          {/* <Image source={Images.LOGO} style={{height:usePercentageHeight(5),width:usePercentageWidth(10)}}/> */}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ marginRight: usePercentageWidth(4) }}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Ionicons name="notifications" size={useFont(18)} color={COLORS.white} />
            <View style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: 'red',
              width: 14,
              height: 14,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: COLORS.white, fontSize: useFont(8), fontWeight: 'bold' }}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
            <Entypo name="user" size={useFont(18)} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={{ paddingHorizontal: usePercentageWidth(4), paddingVertical: usePercentageHeight(2) }}>
          <Text style={{ fontSize: useFont(20), fontWeight: 'bold', color: COLORS.blackOpacity(0.8) }}>
            Welcome back!
          </Text>
          <Text style={{ fontSize: useFont(12), color: COLORS.blackOpacity(0.7), marginTop: 4 }}>
            You have 3 new assignments and 1 quiz today
          </Text>
        </View>

        {/* Daily Quiz Card */}
        <View style={{ paddingHorizontal: usePercentageWidth(3), marginBottom: usePercentageHeight(2) }}>
          <View style={{
            backgroundColor: COLORS.primaryOpacity(0.9),
            borderRadius: 15,
            padding: usePercentageHeight(2),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: useFont(16), fontWeight: 'bold', color: COLORS.white }}>
                  Daily Challenge
                </Text>
                <Text style={{ fontSize: useFont(12), color: COLORS.whiteOpacity(0.8), marginTop: 4 }}>
                  Test your knowledge with today's quiz
                </Text>
              </View>
              <Entypo name="trophy" size={useFont(24)} color={COLORS.whiteOpacity(0.9)} />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('QuizScreen')}
              style={{
                backgroundColor: COLORS.white,
                paddingVertical: usePercentageHeight(1),
                paddingHorizontal: usePercentageWidth(4),
                borderRadius: 8,
                alignSelf: 'flex-start',
                marginTop: usePercentageHeight(1),
              }}
            >
              <Text
                style={{
                  fontSize: useFont(12),
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}
              >
                Start Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Courses Section */}
        <View style={{ paddingHorizontal: usePercentageWidth(2), marginBottom: usePercentageHeight(2) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: usePercentageHeight(1) }}>
            <Text style={{ fontSize: useFont(14), fontWeight: '600', color: COLORS.blackOpacity(0.8) }}>
              My Courses
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CoursesScreen')}>
              <Text style={{ fontSize: useFont(12), color: COLORS.primary }}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={coursesData}
            renderItem={renderCourseItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: usePercentageWidth(1) }}
          />
        </View>

        {/* Upcoming Assignments Section */}
        {/* <View style={{ paddingHorizontal: usePercentageWidth(2), marginBottom: usePercentageHeight(2) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: usePercentageHeight(1) }}>
            <Text style={{ fontSize: useFont(14), fontWeight: '600', color: COLORS.blackOpacity(0.8) }}>
              Upcoming Assignments
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllAssignmentsScreen')}>
              <Text style={{ fontSize: useFont(12), color: COLORS.primary }}>View All</Text>
            </TouchableOpacity>
          </View>

          {upcomingAssignments.map(item => (
            <View key={item.id}>
              {renderAssignmentItem({ item })}
            </View>
          ))}
        </View> */}

        {/* Leaderboard Section */}
        <View style={{ paddingHorizontal: usePercentageWidth(2), marginBottom: usePercentageHeight(4) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: usePercentageHeight(1) }}>
            <Text style={{ fontSize: useFont(14), fontWeight: '600', color: COLORS.blackOpacity(0.8) }}>
              Leaderboard
            </Text>
            <TouchableOpacity 
            // onPress={() => navigation.navigate('LeaderboardScreen')}
            >
              <Text style={{ fontSize: useFont(12), color: COLORS.primary }}>View All</Text>
            </TouchableOpacity>
          </View>

          {leaderboardData.slice(0, 5).map((item, index) => (
            <View key={item.id}>
              {renderLeaderboardItem({ item, index })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{
        flexDirection: 'row',
        height: usePercentageHeight(7.5),
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.blackOpacity(0.2),
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedTab === 'home' ? COLORS.primaryOpacity(0.1) : COLORS.white
          }}
          onPress={() => setSelectedTab('home')}
        >
          <AntDesign
            name="home"
            size={useFont(18)}
            color={selectedTab === 'home' ? COLORS.primary : COLORS.blackOpacity(0.7)}
          />
          <Text style={{
            fontSize: useFont(10),
            color: selectedTab === 'home' ? COLORS.primary : COLORS.blackOpacity(0.7),
            marginTop: 2
          }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedTab === 'courses' ? COLORS.primaryOpacity(0.1) : COLORS.white
          }}
          onPress={() => {
            setSelectedTab('courses');
            navigation.navigate('CoursesScreen');
          }}
        >
          <MaterialIcons
            name="menu-book"
            size={useFont(18)}
            color={selectedTab === 'courses' ? COLORS.primary : COLORS.blackOpacity(0.7)}
          />
          <Text style={{
            fontSize: useFont(10),
            color: selectedTab === 'courses' ? COLORS.primary : COLORS.blackOpacity(0.7),
            marginTop: 2
          }}>
            Courses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedTab === 'assignments' ? COLORS.primaryOpacity(0.1) : COLORS.white
          }}
          onPress={() => {
            setSelectedTab('assignments');
            // navigation.navigate('AssignmentsScreen');
          }}
        >
          <AntDesign
            name="filetext1"
            size={useFont(18)}
            color={selectedTab === 'assignments' ? COLORS.primary : COLORS.blackOpacity(0.7)}
          />
          <Text style={{
            fontSize: useFont(10),
            color: selectedTab === 'assignments' ? COLORS.primary : COLORS.blackOpacity(0.7),
            marginTop: 2
          }}>
            Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedTab === 'chat' ? COLORS.primaryOpacity(0.1) : COLORS.white
          }}
          onPress={() => {
            setSelectedTab('chat');
            // navigation.navigate('ChatScreen');
          }}
        >
          <MaterialIcons
            name="chat"
            size={useFont(18)}
            color={selectedTab === 'chat' ? COLORS.primary : COLORS.blackOpacity(0.7)}
          />
          <Text style={{
            fontSize: useFont(10),
            color: selectedTab === 'chat' ? COLORS.primary : COLORS.blackOpacity(0.7),
            marginTop: 2
          }}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;