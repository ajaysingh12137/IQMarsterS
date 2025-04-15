import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView,
    TextInput
} from 'react-native';
import { COLORS } from '../../hooks/colors';
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CoursesScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample courses data
    const allCourses = [
        {
            id: '1',
            title: 'Introduction to Calculus',
            instructor: 'Dr. Sarah Johnson',
            department: 'Mathematics',
            enrolled: true,
            progress: 75,
            rating: 4.8,
            icon: 'function',
            color: '#4CAF50'
        },
        {
            id: '2',
            title: 'Classical Mechanics',
            instructor: 'Prof. Robert Chen',
            department: 'Physics',
            enrolled: true,
            progress: 60,
            rating: 4.5,
            icon: 'atom',
            color: '#2196F3'
        },
        {
            id: '3',
            title: 'Data Structures & Algorithms',
            instructor: 'Prof. Alan Turing',
            department: 'Computer Science',
            enrolled: true,
            progress: 90,
            rating: 4.9,
            icon: 'laptop',
            color: '#9C27B0'
        },
        {
            id: '4',
            title: 'Modern Literature',
            instructor: 'Dr. Emily Conrad',
            department: 'English Literature',
            enrolled: true,
            progress: 45,
            rating: 4.3,
            icon: 'book',
            color: '#FF9800'
        },
        {
            id: '5',
            title: 'Organic Chemistry',
            instructor: 'Dr. Michael Reed',
            department: 'Chemistry',
            enrolled: false,
            rating: 4.7,
            icon: 'flask',
            color: '#F44336'
        },
        {
            id: '6',
            title: 'Microeconomics',
            instructor: 'Prof. Lisa Wang',
            department: 'Economics',
            enrolled: false,
            rating: 4.2,
            icon: 'linechart',
            color: '#607D8B'
        },
        {
            id: '7',
            title: 'Human Anatomy',
            instructor: 'Dr. James Wilson',
            department: 'Biology',
            enrolled: false,
            rating: 4.6,
            icon: 'hearto',
            color: '#E91E63'
        },
    ];

    // Filter courses based on active tab and search query
    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.department.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'enrolled') return course.enrolled && matchesSearch;
        if (activeTab === 'available') return !course.enrolled && matchesSearch;

        return false;
    });

    // Render a course item in the grid
    const renderCourseItem = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: COLORS.white,
                borderRadius: 12,
                padding: usePercentageWidth(4),
                marginBottom: usePercentageHeight(2),
                width: '48%',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            }}
            // onPress={() => navigation.navigate('CourseDetailScreen', { courseId: item.id })}
        >
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: item.color + '20',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: usePercentageHeight(1)
            }}>
                <FontAwesome name={item.icon} size={useFont(16)} color={item.color} />
            </View>

            <Text style={{
                fontSize: useFont(12),
                fontWeight: 'bold',
                color: COLORS.blackOpacity(0.8),
                marginBottom: 4,
            }} numberOfLines={2}>
                {item.title}
            </Text>

            <Text style={{
                fontSize: useFont(10),
                color: COLORS.blackOpacity(0.7),
                marginBottom: usePercentageHeight(1),
            }} numberOfLines={1}>
                {item.instructor}
            </Text>

            {item.enrolled && (
                <View style={{ marginBottom: usePercentageHeight(1) }}>
                    <View style={{
                        height: usePercentageHeight(0.6),
                        backgroundColor: COLORS.blackOpacity(0.2),
                        borderRadius: 3,
                    }}>
                        <View style={{
                            height: '100%',
                            width: `${item.progress}%`,
                            backgroundColor: item.color,
                            borderRadius: 3,
                        }} />
                    </View>

                    <Text style={{
                        fontSize: useFont(9),
                        color: COLORS.blackOpacity(0.7),
                        marginTop: 2,
                    }}>
                        {item.progress}% Complete
                    </Text>
                </View>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="star" size={useFont(10)} color="#FFC107" />
                <Text style={{
                    fontSize: useFont(10),
                    color: COLORS.blackOpacity(0.6),
                    marginLeft: 4,
                }}>
                    {item.rating}
                </Text>

                {!item.enrolled && (
                    <View style={{
                        backgroundColor: COLORS.primaryOpacity(0.1),
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 8,
                        marginLeft: 'auto',
                    }}>
                        <Text style={{
                            fontSize: useFont(9),
                            color: COLORS.primary,
                            fontWeight: '600',
                        }}>
                            Enroll
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blackOpacity(0.05) }}>
            {/* Header */}
            <View style={{
                height: usePercentageHeight(10),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: usePercentageWidth(4),
                backgroundColor: COLORS.primary, paddingTop: usePercentageHeight(4)
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={useFont(20)} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: useFont(16),
                    fontWeight: 'bold',
                    color: COLORS.white,
                    marginLeft: usePercentageWidth(4)
                }}>
                    Courses
                </Text>
            </View>

            {/* Search Bar */}
            <View style={{
                paddingHorizontal: usePercentageWidth(4),
                paddingVertical: usePercentageHeight(2),
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    paddingHorizontal: usePercentageWidth(4),
                    paddingVertical: usePercentageHeight(1),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.00,
                    elevation: 1,
                }}>
                    <AntDesign name="search1" size={useFont(16)} color={COLORS.blackOpacity(0.6)} />
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: useFont(12),
                            color: COLORS.blackOpacity(0.8),
                            marginLeft: usePercentageWidth(2),
                            padding: 0,
                        }}
                        placeholder="Search courses, instructors..."
                        placeholderTextColor={COLORS.blackOpacity(0.6)}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <AntDesign name="close" size={useFont(16)} color={COLORS.blackOpacity(0.6)} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Course Tabs */}
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: usePercentageWidth(4),
                marginBottom: usePercentageHeight(2),
            }}>
                <TouchableOpacity
                    style={{
                        paddingVertical: usePercentageHeight(0.8),
                        paddingHorizontal: usePercentageWidth(4),
                        backgroundColor: activeTab === 'all' ? COLORS.primary : COLORS.white,
                        borderRadius: 20,
                        marginRight: usePercentageWidth(2),
                    }}
                    onPress={() => setActiveTab('all')}
                >
                    <Text style={{
                        fontSize: useFont(12),
                        color: activeTab === 'all' ? COLORS.white : COLORS.blackOpacity(0.6),
                        fontWeight: activeTab === 'all' ? 'bold' : 'normal',
                    }}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        paddingVertical: usePercentageHeight(0.8),
                        paddingHorizontal: usePercentageWidth(4),
                        backgroundColor: activeTab === 'enrolled' ? COLORS.primary : COLORS.white,
                        borderRadius: 20,
                        marginRight: usePercentageWidth(2),
                    }}
                    onPress={() => setActiveTab('enrolled')}
                >
                    <Text style={{
                        fontSize: useFont(12),
                        color: activeTab === 'enrolled' ? COLORS.white : COLORS.blackOpacity(0.6),
                        fontWeight: activeTab === 'enrolled' ? 'bold' : 'normal',
                    }}>
                        Enrolled
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        paddingVertical: usePercentageHeight(0.8),
                        paddingHorizontal: usePercentageWidth(4),
                        backgroundColor: activeTab === 'available' ? COLORS.primary : COLORS.white,
                        borderRadius: 20,
                    }}
                    onPress={() => setActiveTab('available')}
                >
                    <Text style={{
                        fontSize: useFont(12),
                        color: activeTab === 'available' ? COLORS.white : COLORS.blackOpacity(0.6),
                        fontWeight: activeTab === 'available' ? 'bold' : 'normal',
                    }}>
                        Available
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Course Grid */}
            <FlatList
                data={filteredCourses}
                renderItem={renderCourseItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: usePercentageWidth(4) }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: usePercentageHeight(4) }}
                ListEmptyComponent={
                    <View style={{
                        padding: usePercentageHeight(4),
                        alignItems: 'center',
                    }}>
                        <MaterialIcons name="search-off" size={useFont(40)} color={COLORS.blackOpacity(0.5)} />
                        <Text style={{
                            fontSize: useFont(14),
                            color: COLORS.blackOpacity(0.6),
                            marginTop: usePercentageHeight(1),
                            textAlign: 'center',
                        }}>
                            No courses found.
                            {searchQuery.length > 0 ? '\nTry a different search term.' : ''}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default CoursesScreen;