import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { useAuth } from "../configs/authContext";
import { API_LIST_QUIZZ, API_TOTAL_COIN_BY_UID, API_RANK_LIST } from "../configs/api-config";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [totalCoin, setTotalCoin] = useState(0);
  const [userRank, setUserRank] = useState(null);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
    fetchTotalCoin();
    fetchRankings();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
      fetchTotalCoin();
      fetchRankings();
    });

    return unsubscribe;
  }, [navigation, user]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_LIST_QUIZZ);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTotalCoin = async () => {
    try {
      if (user && user._id) {
        const response = await axios.get(`${API_TOTAL_COIN_BY_UID}/${user._id}`);
        setTotalCoin(response.data.totalScore);
      }
    } catch (error) {
      console.error("Error fetching total coin:", error);
    }
  };

  const fetchRankings = async () => {
    try {
      const response = await axios.get(API_RANK_LIST);
      const rankings = response.data;
      const userRankIndex = rankings.findIndex(item => item.user?._id === user._id);
      setUserRank(userRankIndex !== -1 ? userRankIndex + 1 : null);
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToDetail(item._id)}>
      <View style={{ alignItems: "center", width: "100%", flexDirection: 'row' }}>
        <View style={{
          borderWidth: 4,
          height: "100%",
          borderColor:'blue'
        }}></View>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View>
          <Text style={[styles.textTitle, {fontWeight: 'bold'}]}>{item.name}</Text>
          <Text style={styles.textQuestion}>{item.questions.length} câu hỏi</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const navigateToDetail = (quizId) => {
    navigation.navigate('GameDetail', { testId: quizId });
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#6ffcf8", borderRadius: 30 }}>
        <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: "400" }}>Hi, {user.username}</Text>
            <Text style={{ fontSize: 15, color: "#9F9F9F" }}>Let's make this day productive</Text>
          </View>
          <Image style={{ width: 65, height: 65, borderRadius: 50 }} source={{ uri: user.avatar }} />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <View style={{ borderWidth: 1, width: "90%", opacity: 0.3 }} />
        </View>

        <View style={styles.cardView}>
          <View style={{ flexDirection: "row" }}>
            <Image style={{ width: 75, height: 75, alignSelf: "center" }} source={require("../assets/cup.png")} />
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Xếp hạng</Text>
              <Text style={{ fontSize: 30, color: "#0CA9A9", fontWeight: "bold", textAlign: "center" }}>
                {userRank ? userRank : "-"}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 40, color: "#0CA9A9", fontWeight: "bold", textAlign: "center" }}>
              {totalCoin}
            </Text>
            <Image style={{ width: 50, height: 50, alignSelf: "center" }} source={require("../assets/points.png")} />

          </View>
        </View>
      </View>



      <Text style={{ fontSize: 25, fontWeight: "bold", margin: 20, fontFamily: "" }}> Nhiệm vụ</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  cardView: {
    backgroundColor: "#6ffcf8",
    margin: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    //elevation: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#BDBDBD",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    borderRadius: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  textTitle: {
    textAlign: "left",
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  textQuestion: {
    textAlign: "left",
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
    color: "#9F9F9F",
  },
});