import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import axios from "axios";
import { API_RANK_LIST } from "../configs/api-config";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../configs/authContext";

export default function RankScreen() {
  const [rankings, setRankings] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    fetchRankings();
    const unsubscribe = navigation.addListener("focus", () => {
      fetchRankings();
    });

    return unsubscribe;
  }, [navigation, user]);

  const fetchRankings = async () => {
    try {
      const response = await axios.get(API_RANK_LIST);
      setRankings(response.data);
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    const itemId = item.user?._id;
    const currentUserId = user?._id;
    const rankIcon = index < 3 ? getRankIcon(index) : null;
    let iconColor = "#000";

    switch (index) {
      case 0:
        iconColor = "gold";
        break;
      case 1:
        iconColor = "silver";
        break;
      case 2:
        iconColor = "#CD7F32";
        break;
      default:
        iconColor = "#000";
        break;
    }

    return (
      <View
        style={[
          styles.rankItem,
          itemId === currentUserId && styles.currentUserItem,
          {borderRadius: 70}
        ]}
      >
        {item.user && (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 70,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {rankIcon && (
                  <FontAwesome
                    name={rankIcon}
                    style={[styles.rankIcon, { color: iconColor }]}
                  />
                )}
                <Text style={{ marginRight: 30, fontWeight:"bold" }}>{index + 1}</Text>
              </View>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <Text style={[styles.username, { margin: 10 }]}>
                {item.user.name}
              </Text>
            </View>
            
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold",color:"red"}}>
                {item.scoreWithinSevenDays} 
              </Text>
              {/* <Text style={{ fontWeight: "bold", margin:5}}>
                Score
              </Text> */}
              <Image style={{ width: 30, height: 30, alignSelf: "center" }} source={require("../assets/points.png")} />
            </View>
          </>
        )}
      </View>
    );
  };

  const getRankIcon = (index) => {
    return "trophy";
  };

  return (
    <View style={styles.mainCtn}>
      <View style={{ alignItems: "center", flex: 0.8 }}>
        <Text style={styles.title}>Xếp hạng</Text>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/trophy.png")}
        />
      </View>
      <View style={styles.listCtn}>
        {/* <StatusBar hidden={true} /> */}
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.list}
          scrollEnabled={true}
          data={rankings}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6957E7",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "#FFF",
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    marginBottom: 5
  },
  currentUserItem: {
    backgroundColor: "#f7f7f7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignSelf: "center",
  },
  rankIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },

  mainCtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6957E7",
  },
  entry: {
    width: "100%",
    height: 50,
  },
  listCtn: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    overflow: "hidden",
  },
  list: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
  },
});
