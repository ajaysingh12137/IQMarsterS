import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { COLORS } from '../../hooks/colors';
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  // Sample student data
  const studentData = {
    name: 'John Smith',
    email: 'john.smith@student.edu',
    id: 'STU12345',
    avatar: 'https://via.placeholder.com/100',
    level: 'Sophomore',
    points: 850,
    rank: 12,
    completedCourses: 8,
    completedAssignments: 42,
    completedQuizzes: 36
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blackOpacity(0.05) }}>
      {/* Header */}
      <View
        style={{
          height: usePercentageHeight(10),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: usePercentageWidth(4),
          backgroundColor: COLORS.primary,paddingTop:usePercentageHeight(4)
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
          Profile
        </Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={{
          alignItems: 'center',
          paddingVertical: usePercentageHeight(3),
          backgroundColor: COLORS.white,
        }}>
          <View style={{
            width: usePercentageWidth(25),
            height: usePercentageWidth(25),
            borderRadius: usePercentageWidth(12.5),
            backgroundColor: COLORS.blackOpacity(0.2),
            overflow: 'hidden',
            marginBottom: usePercentageHeight(1.5)
          }}>
            <Image 
              source={{ uri: studentData.avatar }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          
          <Text style={{ 
            fontSize: useFont(18), 
            fontWeight: 'bold', 
            color: COLORS.blackOpacity(0.8) 
          }}>
            {studentData.name}
          </Text>
          
          <Text style={{ 
            fontSize: useFont(12), 
            color: COLORS.blackOpacity(0.7),
            marginTop: 4
          }}>
            {studentData.email}
          </Text>
          
          <View style={{
            flexDirection: 'row',
            marginTop: usePercentageHeight(1.5),
            backgroundColor: COLORS.primaryOpacity(0.1),
            paddingVertical: usePercentageHeight(0.7),
            paddingHorizontal: usePercentageWidth(4),
            borderRadius: 20,
          }}>
            <Text style={{ 
              fontSize: useFont(12), 
              color: COLORS.primary,
              fontWeight: '600' 
            }}>
              Student ID: {studentData.id}
            </Text>
          </View>
        </View>
        
        {/* Stats Section */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: COLORS.white,
          marginTop: usePercentageHeight(1.5),
          paddingVertical: usePercentageHeight(2),
          paddingHorizontal: usePercentageWidth(4),
        }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: useFont(20), fontWeight: 'bold', color: COLORS.primary }}>
              {studentData.points}
            </Text>
            <Text style={{ fontSize: useFont(12), color: COLORS.blackOpacity(0.7) }}>
              Total Points
            </Text>
          </View>
          
          <View style={{ 
            width: 1, 
            backgroundColor: COLORS.blackOpacity(0.2),
            marginHorizontal: usePercentageWidth(2) 
          }} />
          
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: useFont(20), fontWeight: 'bold', color: COLORS.primary }}>
              #{studentData.rank}
            </Text>
            <Text style={{ fontSize: useFont(12), color: COLORS.blackOpacity(0.7) }}>
              Current Rank
            </Text>
          </View>
          
          <View style={{ 
            width: 1, 
            backgroundColor: COLORS.blackOpacity(0.2),
            marginHorizontal: usePercentageWidth(2) 
          }} />
          
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: useFont(20), fontWeight: 'bold', color: COLORS.primary }}>
              {studentData.level}
            </Text>
            <Text style={{ fontSize: useFont(12), color: COLORS.blackOpacity(0.7) }}>
              Level
            </Text>
          </View>
        </View>
        
        {/* Achievements Section */}
        <View style={{
          backgroundColor: COLORS.white,
          marginTop: usePercentageHeight(1.5),
          paddingVertical: usePercentageHeight(2),
          paddingHorizontal: usePercentageWidth(4),
        }}>
          <Text style={{ 
            fontSize: useFont(14), 
            fontWeight: '600', 
            color: COLORS.blackOpacity(0.8),
            marginBottom: usePercentageHeight(1.5)
          }}>
            Achievements
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center', width: usePercentageWidth(28) }}>
              <View style={{
                width: usePercentageWidth(12),
                height: usePercentageWidth(12),
                borderRadius: usePercentageWidth(6),
                backgroundColor: COLORS.primaryOpacity(0.15),
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: usePercentageHeight(1)
              }}>
                <FontAwesome name="book" size={useFont(20)} color={COLORS.primary} />
              </View>
              <Text style={{ fontSize: useFont(16), fontWeight: 'bold', color: COLORS.blackOpacity(0.8) }}>
                {studentData.completedCourses}
              </Text>
              <Text style={{ fontSize: useFont(10), color: COLORS.blackOpacity(0.7), textAlign: 'center' }}>
                Courses Completed
              </Text>
            </View>
            
            <View style={{ alignItems: 'center', width: usePercentageWidth(28) }}>
              <View style={{
                width: usePercentageWidth(12),
                height: usePercentageWidth(12),
                borderRadius: usePercentageWidth(6),
                backgroundColor: COLORS.primaryOpacity(0.15),
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: usePercentageHeight(1)
              }}>
                <AntDesign name="filetext1" size={useFont(20)} color={COLORS.primary} />
              </View>
              <Text style={{ fontSize: useFont(16), fontWeight: 'bold', color: COLORS.blackOpacity(0.8) }}>
                {studentData.completedAssignments}
              </Text>
              <Text style={{ fontSize: useFont(10), color: COLORS.blackOpacity(0.7), textAlign: 'center' }}>
                Assignments Completed
              </Text>
            </View>
            
            <View style={{ alignItems: 'center', width: usePercentageWidth(28) }}>
              <View style={{
                width: usePercentageWidth(12),
                height: usePercentageWidth(12),
                borderRadius: usePercentageWidth(6),
                backgroundColor: COLORS.primaryOpacity(0.15),
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: usePercentageHeight(1)
              }}>
                <AntDesign name="Trophy" size={useFont(20)} color={COLORS.primary} />
              </View>
              <Text style={{ fontSize: useFont(16), fontWeight: 'bold', color: COLORS.blackOpacity(0.8) }}>
                {studentData.completedQuizzes}
              </Text>
              <Text style={{ fontSize: useFont(10), color: COLORS.blackOpacity(0.7), textAlign: 'center' }}>
                Quizzes Completed
              </Text>
            </View>
          </View>
        </View>
        
        {/* Account Settings */}
        <View style={{
          backgroundColor: COLORS.white,
          marginTop: usePercentageHeight(1.5),
          paddingVertical: usePercentageHeight(2),
          paddingHorizontal: usePercentageWidth(4),
        }}>
          <Text style={{ 
            fontSize: useFont(14), 
            fontWeight: '600', 
            color: COLORS.blackOpacity(0.8),
            marginBottom: usePercentageHeight(1.5)
          }}>
            Account Settings
          </Text>
          
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: usePercentageHeight(1.5),
            borderBottomWidth: 1,
            borderBottomColor: COLORS.blackOpacity(0.1)
          }}>
            <AntDesign name="user" size={useFont(16)} color={COLORS.primary} />
            <Text style={{ 
              marginLeft: usePercentageWidth(3),
              fontSize: useFont(13),
              color: COLORS.blackOpacity(0.7)
            }}>
              Edit Profile
            </Text>
            <AntDesign 
              name="right" 
              size={useFont(12)} 
              color={COLORS.blackOpacity(0.5)}
              style={{ position: 'absolute', right: 0 }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: usePercentageHeight(1.5),
            borderBottomWidth: 1,
            borderBottomColor: COLORS.blackOpacity(0.1)
          }}>
            <AntDesign name="lock" size={useFont(16)} color={COLORS.primary} />
            <Text style={{ 
              marginLeft: usePercentageWidth(3),
              fontSize: useFont(13),
              color: COLORS.blackOpacity(0.7)
            }}>
              Change Password
            </Text>
            <AntDesign 
              name="right" 
              size={useFont(12)} 
              color={COLORS.blackOpacity(0.5)}
              style={{ position: 'absolute', right: 0 }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: usePercentageHeight(1.5),
            borderBottomWidth: 1,
            borderBottomColor: COLORS.blackOpacity(0.1)
          }}>
            <AntDesign name="bells" size={useFont(16)} color={COLORS.primary} />
            <Text style={{ 
              marginLeft: usePercentageWidth(3),
              fontSize: useFont(13),
              color: COLORS.blackOpacity(0.7)
            }}>
              Notification Settings
            </Text>
            <AntDesign 
              name="right" 
              size={useFont(12)} 
              color={COLORS.blackOpacity(0.5)}
              style={{ position: 'absolute', right: 0 }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: usePercentageHeight(1.5),
          }}>
            <AntDesign name="setting" size={useFont(16)} color={COLORS.primary} />
            <Text style={{ 
              marginLeft: usePercentageWidth(3),
              fontSize: useFont(13),
              color: COLORS.blackOpacity(0.7)
            }}>
              App Settings
            </Text>
            <AntDesign 
              name="right" 
              size={useFont(12)} 
              color={COLORS.blackOpacity(0.5)}
              style={{ position: 'absolute', right: 0 }}
            />
          </TouchableOpacity>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity style={{
          marginHorizontal: usePercentageWidth(4),
          marginVertical: usePercentageHeight(3),
          backgroundColor: COLORS.primaryOpacity(0.1),
          paddingVertical: usePercentageHeight(1.5),
          borderRadius: 8,
          alignItems: 'center'
        }}>
          <Text style={{ 
            fontSize: useFont(14), 
            fontWeight: '600', 
            color: COLORS.primary 
          }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;