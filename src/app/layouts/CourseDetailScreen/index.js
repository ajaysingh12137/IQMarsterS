import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    SafeAreaView
} from 'react-native';
import { COLORS } from '../../hooks/colors';
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive';
import { useRoute, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CourseDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { courseId } = route.params;
    const [activeTab, setActiveTab] = useState('content');

    // Sample course data
    const courseData = {
        id: courseId,
        title: 'Data Structures & Algorithms',
        instructor: 'Prof. Alan Turing',
        department: 'Computer Science',
        description: 'This course covers fundamental data structures and algorithms in computer science. Learn how to analyze algorithm efficiency, implement various data structures, and solve common algorithmic problems.',
        enrolled: true,
        progress: 65,
        rating: 4.9,
        totalStudents: 247,
        duration: '12 weeks',
        level: 'Intermediate',
        lastUpdated: 'March 18, 2025',
        icon: 'laptop',
        color: '#800000',
        prerequisites: ['Introduction to Programming', 'Discrete Mathematics'],
        content: [
            {
                id: '1',
                title: 'Introduction to Algorithms',
                type: 'module',
                completed: true,
                items: [
                    { id: '1.1', title: 'What is an Algorithm?', type: 'video', duration: '12:30', completed: true },
                    { id: '1.2', title: 'Algorithm Analysis Basics', type: 'reading', duration: '20 min', completed: true },
                    { id: '1.3', title: 'Big O Notation', type: 'video', duration: '15:45', completed: true },
                    { id: '1.4', title: 'Practice Problems', type: 'quiz', duration: '15 min', completed: true },
                ]
            },
            {
                id: '2',
                title: 'Arrays and Linked Lists',
                type: 'module',
                completed: true,
                items: [
                    { id: '2.1', title: 'Introduction to Arrays', type: 'video', duration: '10:15', completed: true },
                    { id: '2.2', title: 'Array Operations', type: 'reading', duration: '15 min', completed: true },
                    { id: '2.3', title: 'Linked Lists Basics', type: 'video', duration: '14:30', completed: true },
                    { id: '2.4', title: 'Linked List Implementation', type: 'assignment', duration: '1 hour', completed: true },
                ]
            },
            {
                id: '3',
                title: 'Stacks and Queues',
                type: 'module',
                completed: false,
                items: [
                    { id: '3.1', title: 'Stack Data Structure', type: 'video', duration: '11:20', completed: true },
                    { id: '3.2', title: 'Queue Data Structure', type: 'video', duration: '12:45', completed: true },
                    { id: '3.3', title: 'Implementation Practice', type: 'lab', duration: '45 min', completed: false },
                    { id: '3.4', title: 'Applications of Stacks and Queues', type: 'reading', duration: '25 min', completed: false },
                ]
            },
            {
                id: '4',
                title: 'Trees and Graphs',
                type: 'module',
                completed: false,
                items: [
                    { id: '4.1', title: 'Binary Trees', type: 'video', duration: '18:30', completed: false },
                    { id: '4.2', title: 'Tree Traversals', type: 'reading', duration: '20 min', completed: false },
                    { id: '4.3', title: 'Introduction to Graphs', type: 'video', duration: '16:15', completed: false },
                    { id: '4.4', title: 'Graph Algorithms', type: 'assignment', duration: '2 hours', completed: false },
                ]
            }
        ],
        discussions: [
            {
                id: '1',
                user: 'Emily Parker',
                avatar: 'https://via.placeholder.com/40',
                message: 'Im struggling with the time complexity analysis of the recursive algorithms. Any tips?',
                time: '2 days ago',
                replies: 4
            },
            {
                id: '2',
                user: 'Michael Smith',
                avatar: 'https://via.placeholder.com/40',
                message: 'The assignment on linked list implementation was really helpful. I finally understand the concept!',
                time: '3 days ago',
                replies: 2
            },
            {
                id: '3',
                user: 'Jessica Lee',
                avatar: 'https://via.placeholder.com/40',
                message: 'Does anyone have additional resources for graph algorithms? Looking to dive deeper into this topic.',
                time: '5 days ago',
                replies: 7
            }
        ],
        announcements: [
            {
                id: '1',
                title: 'Quiz Deadline Extended',
                message: 'The deadline for Module 3 quiz has been extended to April 20, 2025.',
                date: 'Apr 12, 2025'
            },
            {
                id: '2',
                title: 'Guest Lecture Announcement',
                message: 'We will have a guest lecture on Advanced Algorithm Design by Dr. Jane Smith on April 18.',
                date: 'Apr 10, 2025'
            }
        ]
    };

    // Calculate overall module completion
    const totalItems = courseData.content.reduce((acc, module) => acc + module.items.length, 0);
    const completedItems = courseData.content.reduce((acc, module) =>
        acc + module.items.filter(item => item.completed).length, 0);
    const progress = Math.round((completedItems / totalItems) * 100);

    // Render content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'content':
                return (
                    <View>
                        {courseData.content.map((module, index) => (
                            <View key={module.id} style={{ marginBottom: usePercentageHeight(2) }}>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: COLORS.white,
                                        padding: usePercentageHeight(1.5),
                                        borderRadius: 8,
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.18,
                                        shadowRadius: 1.00,
                                        elevation: 1,
                                    }}
                                    onPress={() => navigation.navigate('ModuleDetailScreen', {
                                        moduleId: module.id,
                                        courseId: courseData.id
                                    })}
                                >
                                    <View style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 18,
                                        backgroundColor: module.completed ? courseData.color + '20' : COLORS.blackOpacity(0.1),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: usePercentageWidth(3),
                                    }}>
                                        <Text style={{
                                            fontSize: useFont(14),
                                            fontWeight: 'bold',
                                            color: module.completed ? courseData.color : COLORS.blackOpacity(0.6)
                                        }}>
                                            {index + 1}
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: useFont(12),
                                            fontWeight: 'bold',
                                            color: COLORS.blackOpacity(0.8),
                                        }}>
                                            {module.title}
                                        </Text>

                                        <Text style={{
                                            fontSize: useFont(10),
                                            color: COLORS.blackOpacity(0.7),
                                            marginTop: 2,
                                        }}>
                                            {module.items.length} items • {module.items.filter(item => item.completed).length} completed
                                        </Text>
                                    </View>

                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        backgroundColor: module.completed ? courseData.color : COLORS.blackOpacity(0.1),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        {module.completed ? (
                                            <AntDesign name="check" size={useFont(12)} color={COLORS.white} />
                                        ) : (
                                            <Text style={{
                                                fontSize: useFont(8),
                                                fontWeight: 'bold',
                                                color: COLORS.blackOpacity(0.6)
                                            }}>
                                                {Math.round((module.items.filter(item => item.completed).length / module.items.length) * 100)}%
                                            </Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                );

            case 'discussion':
                return (
                    <View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primaryOpacity(0.1),
                                borderRadius: 8,
                                paddingVertical: usePercentageHeight(1),
                                paddingHorizontal: usePercentageWidth(4),
                                alignItems: 'center',
                                marginBottom: usePercentageHeight(2),
                            }}
                            onPress={() => navigation.navigate('NewDiscussionScreen', { courseId: courseData.id })}
                        >
                            <Text style={{
                                fontSize: useFont(12),
                                fontWeight: '600',
                                color: COLORS.primary,
                            }}>
                                Start New Discussion
                            </Text>
                        </TouchableOpacity>

                        {courseData.discussions.map(discussion => (
                            <TouchableOpacity
                                key={discussion.id}
                                style={{
                                    backgroundColor: COLORS.white,
                                    borderRadius: 8,
                                    padding: usePercentageHeight(1.5),
                                    marginBottom: usePercentageHeight(1.5),
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.18,
                                    shadowRadius: 1.00,
                                    elevation: 1,
                                }}
                                onPress={() => navigation.navigate('DiscussionDetailScreen', {
                                    discussionId: discussion.id,
                                    courseId: courseData.id
                                })}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: usePercentageHeight(1) }}>
                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        overflow: 'hidden',
                                        marginRight: usePercentageWidth(2),
                                    }}>
                                        <Image
                                            source={{ uri: discussion.avatar }}
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode="cover"
                                        />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: useFont(12),
                                            fontWeight: '600',
                                            color: COLORS.blackOpacity(0.8),
                                        }}>
                                            {discussion.user}
                                        </Text>

                                        <Text style={{
                                            fontSize: useFont(10),
                                            color: COLORS.blackOpacity(0.6),
                                        }}>
                                            {discussion.time}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={{
                                    fontSize: useFont(11),
                                    color: COLORS.blackOpacity(0.7),
                                    marginBottom: usePercentageHeight(1),
                                }}>
                                    {discussion.message}
                                </Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="message1" size={useFont(12)} color={COLORS.blackOpacity(0.6)} />
                                    <Text style={{
                                        fontSize: useFont(10),
                                        color: COLORS.blackOpacity(0.6),
                                        marginLeft: usePercentageWidth(1),
                                    }}>
                                        {discussion.replies} replies
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                );

            case 'announcements':
                return (
                    <View>
                        {courseData.announcements.map(announcement => (
                            <View
                                key={announcement.id}
                                style={{
                                    backgroundColor: COLORS.white,
                                    borderRadius: 8,
                                    padding: usePercentageHeight(1.5),
                                    marginBottom: usePercentageHeight(1.5),
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.18,
                                    shadowRadius: 1.00,
                                    elevation: 1,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: usePercentageHeight(1) }}>
                                    <MaterialIcons name="campaign" size={useFont(16)} color={courseData.color} />

                                    <Text style={{
                                        fontSize: useFont(12),
                                        fontWeight: '600',
                                        color: COLORS.blackOpacity(0.8),
                                        marginLeft: usePercentageWidth(2),
                                        flex: 1,
                                    }}>
                                        {announcement.title}
                                    </Text>

                                    <Text style={{
                                        fontSize: useFont(10),
                                        color: COLORS.blackOpacity(0.6),
                                    }}>
                                        {announcement.date}
                                    </Text>
                                </View>

                                <Text style={{
                                    fontSize: useFont(11),
                                    color: COLORS.blackOpacity(0.7),
                                }}>
                                    {announcement.message}
                                </Text>
                            </View>
                        ))}
                    </View>
                );

            case 'about':
                return (
                    <View>
                        <View style={{
                            backgroundColor: COLORS.white,
                            borderRadius: 8,
                            padding: usePercentageHeight(2),
                            marginBottom: usePercentageHeight(1.5),
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.00,
                            elevation: 1,
                        }}>
                            <Text style={{
                                fontSize: useFont(14),
                                fontWeight: '600',
                                color: COLORS.blackOpacity(0.8),
                                marginBottom: usePercentageHeight(1),
                            }}>
                                About This Course
                            </Text>

                            <Text style={{
                                fontSize: useFont(12),
                                color: COLORS.blackOpacity(0.7),
                                lineHeight: useFont(18),
                            }}>
                                {courseData.description}
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: COLORS.white,
                            borderRadius: 8,
                            padding: usePercentageHeight(2),
                            marginBottom: usePercentageHeight(1.5),
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.00,
                            elevation: 1,
                        }}>
                            <Text style={{
                                fontSize: useFont(14),
                                fontWeight: '600',
                                color: COLORS.blackOpacity(0.8),
                                marginBottom: usePercentageHeight(1),
                            }}>
                                Course Details
                            </Text>

                            <View style={{ flexDirection: 'row', marginBottom: usePercentageHeight(0.8) }}>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.7),
                                    width: usePercentageWidth(30),
                                }}>
                                    Instructor:
                                </Text>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.8),
                                    fontWeight: '500',
                                }}>
                                    {courseData.instructor}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: usePercentageHeight(0.8) }}>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.7),
                                    width: usePercentageWidth(30),
                                }}>
                                    Department:
                                </Text>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.8),
                                    fontWeight: '500',
                                }}>
                                    {courseData.department}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: usePercentageHeight(0.8) }}>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.7),
                                    width: usePercentageWidth(30),
                                }}>
                                    Duration:
                                </Text>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.8),
                                    fontWeight: '500',
                                }}>
                                    {courseData.duration}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: usePercentageHeight(0.8) }}>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.7),
                                    width: usePercentageWidth(30),
                                }}>
                                    Level:
                                </Text>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.8),
                                    fontWeight: '500',
                                }}>
                                    {courseData.level}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: usePercentageHeight(0.8) }}>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.7),
                                    width: usePercentageWidth(30),
                                }}>
                                    Last Updated:
                                </Text>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.8),
                                    fontWeight: '500',
                                }}>
                                    {courseData.lastUpdated}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: usePercentageHeight(0.8) }}>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.7),
                                    width: usePercentageWidth(30),
                                }}>
                                    Total Students:
                                </Text>
                                <Text style={{
                                    fontSize: useFont(12),
                                    color: COLORS.blackOpacity(0.8),
                                    fontWeight: '500',
                                }}>
                                    {courseData.totalStudents}
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            backgroundColor: COLORS.white,
                            borderRadius: 8,
                            padding: usePercentageHeight(2),
                            marginBottom: usePercentageHeight(1.5),
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.00,
                            elevation: 1,
                        }}>
                            <Text style={{
                                fontSize: useFont(14),
                                fontWeight: '600',
                                color: COLORS.blackOpacity(0.8),
                                marginBottom: usePercentageHeight(1),
                            }}>
                                Prerequisites
                            </Text>

                            {courseData.prerequisites.map((prerequisite, index) => (
                                <View key={index} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: index < courseData.prerequisites.length - 1 ? usePercentageHeight(0.8) : 0,
                                }}>
                                    <MaterialIcons name="check-circle" size={useFont(14)} color={courseData.color} />
                                    <Text style={{
                                        fontSize: useFont(12),
                                        color: COLORS.blackOpacity(0.7),
                                        marginLeft: usePercentageWidth(2),
                                    }}>
                                        {prerequisite}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                );

            default:
                return (
                    <View style={{ alignItems: 'center', padding: usePercentageHeight(2) }}>
                        <Text>Tab content not available</Text>
                    </View>
                );
        }
    };

    // Main render
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blackOpacity(.01) }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: usePercentageWidth(4),
                    height: usePercentageHeight(10),
                    backgroundColor: COLORS.primary,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.blackOpacity(0.1), paddingTop: usePercentageHeight(3)
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ padding: usePercentageWidth(1) }}
                    >
                        <AntDesign name="arrowleft" size={useFont(18)} color={COLORS.white} />
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: useFont(16),
                        fontWeight: 'bold',
                        color: COLORS.white,
                        marginLeft: usePercentageWidth(3),
                        flex: 1,
                    }}>
                        Course Details
                    </Text>

                    <TouchableOpacity
                        style={{ padding: usePercentageWidth(1) }}
                        onPress={() => navigation.navigate('CourseResourcesScreen', { courseId: courseData.id })}
                    >
                        <MaterialIcons name="library-books" size={useFont(18)} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Course Header */}
                <View style={{
                    backgroundColor: COLORS.white,
                    padding: usePercentageHeight(2),
                    marginBottom: usePercentageHeight(1),
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            backgroundColor: courseData.color,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: usePercentageWidth(3),
                        }}>
                            <MaterialIcons name={courseData.icon} size={useFont(24)} color={COLORS.white} />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontSize: useFont(16),
                                fontWeight: 'bold',
                                color: COLORS.blackOpacity(0.8),
                            }}>
                                {courseData.title}
                            </Text>

                            <Text style={{
                                fontSize: useFont(12),
                                color: COLORS.blackOpacity(0.7),
                                marginTop: 2,
                            }}>
                                {courseData.instructor} • {courseData.department}
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: usePercentageHeight(1.5),
                    }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 6,
                                backgroundColor: COLORS.blackOpacity(0.1),
                                borderRadius: 3,
                                marginBottom: 6,
                            }}>
                                <View style={{
                                    height: '100%',
                                    width: `${progress}%`,
                                    backgroundColor: courseData.color,
                                    borderRadius: 3,
                                }} />
                            </View>

                            <Text style={{
                                fontSize: useFont(10),
                                color: COLORS.blackOpacity(0.7),
                            }}>
                                {completedItems} of {totalItems} lessons completed ({progress}%)
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: usePercentageWidth(3),
                        }}>
                            <FontAwesome name="star" size={useFont(12)} color="#FFC107" />
                            <Text style={{
                                fontSize: useFont(12),
                                fontWeight: '600',
                                color: COLORS.blackOpacity(0.8),
                                marginLeft: usePercentageWidth(1),
                            }}>
                                {courseData.rating}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Tabs */}
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: COLORS.white,
                    paddingHorizontal: usePercentageWidth(2),
                    marginBottom: usePercentageHeight(1),
                }}>
                    {['content', 'discussion', 'announcements', 'about'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={{
                                paddingVertical: usePercentageHeight(1.2),
                                paddingHorizontal: usePercentageWidth(3),
                                borderBottomWidth: 2,
                                borderBottomColor: activeTab === tab ? courseData.color : 'transparent',
                            }}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={{
                                fontSize: useFont(12),
                                fontWeight: activeTab === tab ? '600' : 'normal',
                                color: activeTab === tab ? courseData.color : COLORS.blackOpacity(0.7),
                                textTransform: 'capitalize',
                            }}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                <ScrollView
                    style={{ flex: 1, paddingHorizontal: usePercentageWidth(4) }}
                    showsVerticalScrollIndicator={false}
                >
                    {renderTabContent()}

                    <View style={{ height: usePercentageHeight(2) }} />
                </ScrollView>

                {/* Bottom Action Button */}
                <View style={{
                    padding: usePercentageHeight(2),
                    backgroundColor: COLORS.white,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.blackOpacity(0.1),
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: courseData.color,
                            borderRadius: 8,
                            paddingVertical: usePercentageHeight(1.2),
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            // Find the next incomplete item
                            let nextIncompleteItem = null;
                            let nextIncompleteModule = null;

                            for (const module of courseData.content) {
                                if (!module.completed) {
                                    const incompleteItem = module.items.find(item => !item.completed);
                                    if (incompleteItem) {
                                        nextIncompleteItem = incompleteItem;
                                        nextIncompleteModule = module;
                                        break;
                                    }
                                }
                            }

                            if (nextIncompleteItem && nextIncompleteModule) {
                                navigation.navigate('ContentPlayerScreen', {
                                    courseId: courseData.id,
                                    moduleId: nextIncompleteModule.id,
                                    itemId: nextIncompleteItem.id
                                });
                            } else {
                                // All completed, go to first module
                                navigation.navigate('ModuleDetailScreen', {
                                    courseId: courseData.id,
                                    moduleId: courseData.content[0].id
                                });
                            }
                        }}
                    >
                        <Text style={{
                            fontSize: useFont(14),
                            fontWeight: '600',
                            color: COLORS.white,
                        }}>
                            {progress < 100 ? 'Continue Learning' : 'Review Course'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CourseDetailScreen;