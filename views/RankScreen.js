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
              <Text style={{ fontWeight: "bold", margin:5}}>
                Score
              </Text>
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
    // <View style={styles.container}>
    //   <View style={{ alignItems: "center" }}>
    //     <Text style={styles.title}>Weekly Rankings</Text>
    //     <Image
    //       style={{ width: 250, height: 180 }}
    //       source={require("../assets/image_rank.png")}
    //     />
    //   </View>

    //   {/* <View style={styles.listCtn}>
    //     <FlatList
    //       style={styles.list}
    //       // contentContainerStyle={styles.list}
    //       scrollEnabled={true}
    //       data={rankings}
    //       keyExtractor={(item) => item._id}
    //     />
    //   </View> */}

    //   <FlatList
    //       style={styles.list}
    //         data={rankings}
    //         renderItem={renderItem}
    //         keyExtractor={(item) => item._id}
    //       />
    // </View>

    <View style={styles.mainCtn}>
      <View style={{ alignItems: "center", flex: 0.8 }}>
        <Text style={styles.title}>Weekly Rankings</Text>
        <Image
          style={{ width: 300, height: 200 }}
          source={require("../assets/image_rank.png")}
        />
      </View>
      <View style={styles.listCtn}>
        <StatusBar hidden={true} />
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
    backgroundColor: "#56AFAD",
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
  },
  currentUserItem: {
    backgroundColor: "#62D362",
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
  // list: {
  //   paddingHorizontal: 10,
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   backgroundColor: 'white',
  // },

  //test
  mainCtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#459593",
  },
  entry: {
    width: "100%",
    height: 50,
  },
  listCtn: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    overflow: "hidden",
  },
  list: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
  },
});
