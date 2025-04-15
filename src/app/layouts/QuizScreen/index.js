import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native';
import { COLORS } from '../../hooks/colors';
import { useFont, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const QuizScreen = () => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    // Sample quiz data
    const quizData = {
        title: 'Daily Knowledge Quiz',
        subject: 'General Knowledge',
        totalQuestions: 5,
        timeLimit: 300, // 5 minutes in seconds
        questions: [
            {
                id: '1',
                question: 'What is the capital of France?',
                options: ['London', 'Berlin', 'Paris', 'Madrid'],
                correctAnswer: 'Paris',
            },
            {
                id: '2',
                question: 'Which planet is known as the Red Planet?',
                options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
                correctAnswer: 'Mars',
            },
            {
                id: '3',
                question: 'What is the chemical symbol for gold?',
                options: ['Go', 'Gd', 'Au', 'Ag'],
                correctAnswer: 'Au',
            },
            {
                id: '4',
                question: 'Who painted the Mona Lisa?',
                options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
                correctAnswer: 'Leonardo da Vinci',
            },
            {
                id: '5',
                question: 'What is the largest ocean on Earth?',
                options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
                correctAnswer: 'Pacific Ocean',
            },
        ],
    };

    useEffect(() => {
        if (!isQuizCompleted) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        if (!isQuizCompleted) {
                            handleQuizComplete();
                        }
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isQuizCompleted]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData.questions[currentQuestionIndex].correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedOption(null);
        } else {
            handleQuizComplete();
        }
    };

    const handleQuizComplete = () => {
        setIsQuizCompleted(true);
    };

    const currentQuestion = quizData.questions[currentQuestionIndex];

    const renderQuizContent = () => {
        if (isQuizCompleted) {
            // Quiz result screen
            const percentage = (score / quizData.totalQuestions) * 100;

            return (
                <View style={{ flex: 1, paddingHorizontal: usePercentageWidth(4) }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 15,
                        padding: usePercentageHeight(2),
                        alignItems: 'center',
                        marginVertical: usePercentageHeight(4),
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                        <Text style={{
                            fontSize: useFont(16),
                            fontWeight: 'bold',
                            color: COLORS.blackOpacity(0.8),
                            marginBottom: usePercentageHeight(2)
                        }}>
                            Quiz Completed!
                        </Text>

                        <View style={{
                            width: usePercentageWidth(30),
                            height: usePercentageWidth(30),
                            borderRadius: usePercentageWidth(15),
                            borderWidth: 8,
                            borderColor: percentage >= 60 ? COLORS.primary : COLORS.primaryOpacity(0.8),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: usePercentageHeight(2)
                        }}>
                            <Text style={{
                                fontSize: useFont(24),
                                fontWeight: 'bold',
                                color: percentage >= 60 ? COLORS.primary : COLORS.primaryOpacity(0.8)
                            }}>
                                {percentage}%
                            </Text>
                        </View>

                        <Text style={{
                            fontSize: useFont(14),
                            fontWeight: 'bold',
                            color: COLORS.blackOpacity(0.8),
                            marginBottom: usePercentageHeight(0.5)
                        }}>
                            Your Score
                        </Text>

                        <Text style={{
                            fontSize: useFont(14),
                            color: COLORS.blackOpacity(0.7),
                            marginBottom: usePercentageHeight(2)
                        }}>
                            {score} out of {quizData.totalQuestions} questions
                        </Text>

                        <View style={{
                            backgroundColor: COLORS.blackOpacity(0.1),
                            borderRadius: 10,
                            padding: usePercentageHeight(1.5),
                            width: '100%',
                            marginBottom: usePercentageHeight(2)
                        }}>
                            <Text style={{
                                fontSize: useFont(12),
                                color: COLORS.blackOpacity(0.7),
                                textAlign: 'center'
                            }}>
                                {percentage >= 80 ? 'Excellent! You mastered this quiz!' :
                                    percentage >= 60 ? 'Good job! Keep practicing to improve.' :
                                        'Keep learning! You\'ll do better next time.'}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.blackOpacity(0.2),
                                    paddingVertical: usePercentageHeight(1),
                                    paddingHorizontal: usePercentageWidth(5),
                                    borderRadius: 8,
                                    marginRight: usePercentageWidth(2)
                                }}
                                onPress={() => navigation.navigate('QuizReviewScreen', { quizData, userAnswers: [] })}
                            >
                                <Text style={{
                                    fontSize: useFont(12),
                                    fontWeight: '600',
                                    color: COLORS.blackOpacity(0.7)
                                }}>
                                    Review Answers
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primary,
                                    paddingVertical: usePercentageHeight(1),
                                    paddingHorizontal: usePercentageWidth(5),
                                    borderRadius: 8,
                                }}
                                onPress={() => navigation.navigate('HomeScreen')}
                            >
                                <Text style={{
                                    fontSize: useFont(12),
                                    fontWeight: '600',
                                    color: COLORS.white
                                }}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }

        // Quiz questions screen
        return (
            <View style={{ flex: 1, paddingHorizontal: usePercentageWidth(4) }}>
                {/* Progress Indicator */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: usePercentageHeight(2),
                    marginBottom: usePercentageHeight(1)
                }}>
                    <Text style={{
                        fontSize: useFont(12),
                        color: COLORS.blackOpacity(0.7)
                    }}>
                        Question {currentQuestionIndex + 1}/{quizData.totalQuestions}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLORS.primaryOpacity(0.1),
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderRadius: 12
                    }}>
                        <AntDesign name="clockcircleo" size={useFont(12)} color={COLORS.primary} />
                        <Text style={{
                            fontSize: useFont(12),
                            color: COLORS.primary,
                            marginLeft: 4
                        }}>
                            {formatTime(timeLeft)}
                        </Text>
                    </View>
                </View>
                {/* Progress Bar */}
                <View style={{
                    height: usePercentageHeight(0.8),
                    backgroundColor: COLORS.blackOpacity(0.2),
                    borderRadius: 4,
                    marginBottom: usePercentageHeight(2)
                }}>
                    <View style={{
                        height: '100%',
                        width: `${((currentQuestionIndex + 1) / quizData.totalQuestions) * 100}%`,
                        backgroundColor: COLORS.primary,
                        borderRadius: 4
                    }} />
                </View>

                {/* Question Card */}
                <View style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 12,
                    padding: usePercentageHeight(2),
                    marginBottom: usePercentageHeight(2),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                }}>
                    <Text style={{
                        fontSize: useFont(14),
                        fontWeight: '600',
                        color: COLORS.blackOpacity(0.8),
                        marginBottom: usePercentageHeight(2)
                    }}>
                        {currentQuestion.question}
                    </Text>

                    {/* Answer Options */}
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                borderWidth: 1,
                                borderColor: selectedOption === option ? COLORS.primary : COLORS.blackOpacity(0.2),
                                borderRadius: 8,
                                padding: usePercentageHeight(1.5),
                                marginBottom: usePercentageHeight(1),
                                backgroundColor: selectedOption === option ? COLORS.primaryOpacity(0.1) : COLORS.white,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onPress={() => handleOptionSelect(option)}
                        >
                            <View style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: selectedOption === option ? COLORS.primary : COLORS.blackOpacity(0.5),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: usePercentageWidth(2)
                            }}>
                                {selectedOption === option && (
                                    <View style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 6,
                                        backgroundColor: COLORS.primary
                                    }} />
                                )}
                            </View>

                            <Text style={{
                                fontSize: useFont(12),
                                color: selectedOption === option ? COLORS.primary : COLORS.blackOpacity(0.7)
                            }}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Next Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: selectedOption ? COLORS.primary : COLORS.blackOpacity(0.3),
                        paddingVertical: usePercentageHeight(1.5),
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={handleNextQuestion}
                    disabled={!selectedOption}
                >
                    <Text style={{
                        fontSize: useFont(14),
                        fontWeight: '600',
                        color: selectedOption ? COLORS.white : COLORS.blackOpacity(0.6)
                    }}>
                        {currentQuestionIndex === quizData.questions.length - 1 ? 'Submit' : 'Next Question'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

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
                <TouchableOpacity onPress={() => {
                    if (!isQuizCompleted) {
                        Alert.alert(
                            "Quit Quiz",
                            "Are you sure you want to quit? Your progress will be lost.",
                            [
                                { text: "Stay", style: "cancel" },
                                { text: "Quit", onPress: () => navigation.goBack() }
                            ]
                        );
                    } else {
                        navigation.goBack();
                    }
                }}>
                    <AntDesign name="arrowleft" size={useFont(20)} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: useFont(16),
                    fontWeight: 'bold',
                    color: COLORS.white,
                    marginLeft: usePercentageWidth(4)
                }}>
                    {quizData.title}
                </Text>
            </View>

            {renderQuizContent()}
        </SafeAreaView>
    );
};

export default QuizScreen;