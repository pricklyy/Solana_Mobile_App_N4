import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_QUIZZ_DETAIL } from '../configs/api-config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../configs/authContext';

export default function GameDetail({ route, navigation }) {
  const [quizDetail, setQuizDetail] = useState(null);
  const { user } = useAuth();
  const [userId, setUserId] = useState(null); 
  const [userDataLoaded, setUserDataLoaded] = useState(false); 

  useEffect(() => {
    setUserId(user ? user._id : null); 
    if (user) {
      setUserDataLoaded(true); 
    }
  }, [user]);

  useEffect(() => {
    const { testId } = route.params;
    fetchQuizDetail(testId);
  }, []);

  const fetchQuizDetail = async (testId) => {
    try {
      const response = await axios.get(`${API_QUIZZ_DETAIL}/${testId}`);
      setQuizDetail(response.data);
      // console.log("Data question: ", response.data)
    } catch (error) {
      console.error('Error fetching quiz detail:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleStartQuiz = () => {
    if (userId && quizDetail && quizDetail.questions && quizDetail.questions.length > 0) {
      console.log("Navigating to StartQuizz with userId:", userId, "and quizDetail:", quizDetail);
      navigation.navigate('StartQuizz', { userId: userId, quizDetail: quizDetail });
    } else {
      console.log("User is not logged in or quizDetail is not available or no questions found");
    }
  };
  
  
  console.log("User data:", user);

  if (!quizDetail || !userDataLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.backIcon}>
          <Icon name="arrow-left" size={20} color="#fff" onPress={handleGoBack} />
        </View>
        <Image source={{ uri: quizDetail.image }} style={styles.image} />
      </View>
      <Text style={styles.textTitle}>{quizDetail.name}</Text>
      <Text style={styles.text}>{quizDetail.description}</Text>
      <Text style={styles.text}>Number of Questions: {quizDetail && quizDetail.questions ? quizDetail.questions.length : 'N/A'}</Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
  startButton: {
    backgroundColor: '#008080',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
