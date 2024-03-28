import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import axios from "axios";
import { useAuth } from "../configs/authContext"; 
import { API_HISTORY_TAKE_QUIZ_BY_UID } from "../configs/api-config";
import { useNavigation } from '@react-navigation/native';

export default function QuizScreen() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        fetchHistory();
    });

    return unsubscribe;
}, [navigation]);

  const fetchHistory = async () => {
    try {
      if (user && user._id) {
        const response = await axios.get(
          `${API_HISTORY_TAKE_QUIZ_BY_UID}/${user._id}`
        );
        if (Array.isArray(response.data)) {
          const updatedHistory = response.data.map(item => {
            const updatedItem = { ...item };
            updatedItem.questionsAndAnswers = item.answers.map(answer => ({
              questionId: answer.questionId,
              text: answer.questionId.text,
              userAnswer: answer.selectedAnswerIndex,
              isCorrect: answer.isCorrect
            }));
            return updatedItem;
          });
          // console.log("Updated history:", updatedHistory); 
          setHistory(updatedHistory);
        } else {
          console.error("Error fetching quiz history: Response data is not an array");
        }
      }
    } catch (error) {
      console.error("Error fetching quiz history:", error);
    }
  };
  
  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Image source={{ uri: item.testId.image }} style={{ width: 100, height: 100 }} />
      <Text>Test Name: {item.testId.name}</Text>
      <Text>Number of Questions: {item.testId.questions.length}</Text>
      <Text>Score: {item.score}</Text>
      <Text>Correct Answers Count: {item.correctAnswersCount}</Text>
      <Text>Incorrect Answers Count: {item.incorrectAnswersCount}</Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
      />
        <View style={styles.modalContainer}>
          {selectedItem && (
            <View style={styles.modalContent}>
              <Text>Test Name: {selectedItem.testId.name}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
