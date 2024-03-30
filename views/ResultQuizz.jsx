import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResultQuizz = ({ route }) => {
    const { correctAnswersCount, incorrectAnswersCount, score, questions } = route.params;
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const navigateToHome = () => {
        navigation.navigate('Màn Hình Chính');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={{ height: 20 }} />
                <Text style={styles.heading}>Quiz Result</Text>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Total Score: {score}</Text>
                    <Text style={styles.resultText1}>Correct Answers: {correctAnswersCount}</Text>
                    <Text style={styles.resultText2}>Incorrect Answers: {incorrectAnswersCount}</Text>
                </View>
                <Text style={styles.heading}>Questions and Answers</Text>
                {questions.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{`Question ${index + 1}: ${question.content}`}</Text>
                        <View>
                            {question.allAnswers.map((answer, answerIndex) => (
                                <Text
                                    key={answerIndex}
                                    style={[
                                        styles.answerText,
                                        question.userAnswer === answer ? (question.userAnswer === question.answers.find(ans => ans.correct.toLowerCase() === 'true').answer ? styles.correctAnswer : styles.incorrectAnswer) : null,
                                    ]}
                                >
                                    {`${answerIndex + 1}. ${answer}`}
                                    {question.userAnswer === answer ? ' (Your Answer)' : null}
                                    {question.answers.find(ans => ans.correct.toLowerCase() === 'true').answer === answer ? ' (Correct Answer)' : null}
                                </Text>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#252c4a',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color:'#fff'
    },
    resultContainer: {
        marginBottom: 20,
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color:'#fff'
        
    },
    resultText1: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color:'green'
    },
    resultText2: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color:'red'
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#fff'
    },
    answerText: {
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 5,
        color:'#fff'
    },
    correctAnswer: {
        color: 'green',
        fontWeight:'bold'
    },
    incorrectAnswer: {
        color: 'red',
        fontWeight:'bold'
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 2,
    },
    homeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        width:150,
        alignItems:'center',
        borderRadius : 20,
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ResultQuizz;
