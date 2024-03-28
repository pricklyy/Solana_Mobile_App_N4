import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { API_TAKE_QUIZZ, API_RANK_LIST } from '../configs/api-config';
import { useNavigation } from '@react-navigation/native';
import { useQuizHistory } from '../configs/QuizHistoryContext';
import axios from 'axios';

const fetchRankings = async (setRankings) => {
    try {
        const response = await axios.get(API_RANK_LIST);
        setRankings(response.data);
        console.log("Data rank:", response.data);
    } catch (error) {
        console.error("Error fetching rankings:", error);
    }
};

const StartQuizz = ({ navigation, route }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [testDetail, setTestDetail] = useState(null);
    const { userId, quizDetail } = route.params;
    const [answerStatus, setAnswerStatus] = useState(null);
    const [score, setScore] = useState(0);
    const { history, updateHistory } = useQuizHistory();
    const [rankings, setRankings] = useState([]);
    useEffect(() => {
        setTestDetail(quizDetail);
        if (quizDetail && quizDetail.questions) {
            setSelectedAnswers(Array(quizDetail.questions.length).fill(null));
        }
    }, [quizDetail]);

    useEffect(() => {
        fetchRankings(setRankings);
    }, []);


    const handleAnswer = (answer) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentIndex] = answer.answer;
        setSelectedAnswers(updatedSelectedAnswers);

        if (answer.isCorrect) {
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('incorrect');
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < quizDetail.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            handleQuizCompletion();
        }
    };

    const handleQuizCompletion = () => {
        if (selectedAnswers.every(answer => answer !== null)) {
            const answerData = {
                testId: quizDetail._id,
                userId: userId,
                answers: selectedAnswers
            };

            axios.post(`${API_TAKE_QUIZZ}`, answerData)
                .then(response => {
                    const { correctAnswersCount, incorrectAnswersCount, score } = response.data.session;
                    alert(`Correct answers: ${correctAnswersCount}\nIncorrect answers: ${incorrectAnswersCount}\nScore: ${score}`);
                    setScore(score);
                    const questionsWithAnswers = testDetail.questions.map(question => ({
                        ...question,
                        userAnswer: selectedAnswers[testDetail.questions.indexOf(question)],
                        allAnswers: question.answers.map(ans => ans.answer)
                    }));
                    const newHistory = [...history, questionsWithAnswers]; 
                    updateHistory(newHistory);
                    fetchRankings(setRankings);
                    navigation.navigate('ResultScreen', { correctAnswersCount, incorrectAnswersCount, score, questions: questionsWithAnswers });
                    // navigation.navigate('QuizScreen');
                   
                })
                .catch(error => {
                    console.error('Error submitting answer:', error);
                });
        } else {
            alert("Please answer all questions before submitting.");
        }
    };


    return (
        <View style={styles.container}>
            {testDetail && testDetail.questions && testDetail.questions.length > 0 ? (
                <>
                    {testDetail.questions[currentIndex] ? (
                        <View>
                            <Text style={styles.question}>{testDetail.questions[currentIndex].content}</Text>
                            <View style={styles.answersContainer}>
                                {testDetail.questions[currentIndex].answers && testDetail.questions[currentIndex].answers.length > 0 ? (
                                    testDetail.questions[currentIndex].answers.map((answer, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.answerButton,
                                                selectedAnswers[currentIndex] === answer.answer && styles.selectedAnswer,
                                            ]}
                                            onPress={() => handleAnswer(answer)}
                                        >
                                            <Text style={styles.answerText}>{answer.answer}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.question}></Text>
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={handleNextQuestion}
                                disabled={selectedAnswers[currentIndex] === null}>
                                <Text style={styles.nextButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styles.question}></Text>
                    )}
                </>
            ) : (
                <Text style={styles.question}></Text>
            )}
            {/* <Text style={styles.score}>Score: {score}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    answersContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    answerButton: {
        backgroundColor: '#eee',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    selectedAnswer: {
        backgroundColor: '#acd900',
    },
    nextButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    score: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StartQuizz;
