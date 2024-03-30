import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { useAuth } from "../configs/authContext";
import { API_LIST_QUIZZ, API_TOTAL_COIN_BY_UID, API_RANK_LIST } from "../configs/api-config";
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";
export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [totalCoin, setTotalCoin] = useState(0);
  const [userRank, setUserRank] = useState(null);
  const navigation = useNavigation();
  const { user } = useAuth();

  const slides = [
    require('../assets/solana.jpg'),
    require('../assets/nft.jpg'),
    require('../assets/sp.png'),

  ]
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
    <TouchableOpacity onPress={() => navigateToDetail(item._id)}>
      <View style={styles.containerItemCard}>
        <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.imageItem} />
        </View>
        
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
      <View style={{ backgroundColor: "#6957E7" }}>
        <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between",height:140 }}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: "bold",color:'#fff' }}>Hi, {user.username}</Text>
            <Text style={{ fontSize: 15, color: "#fff" }}>Welcome back!!!</Text>
          </View>
          <Image style={{ width: 65, height: 65, borderRadius: 50 }} source={{ uri: user.avatar }} />
        </View>
        
      </View>

      
      <View>
      
        <View style={styles.cardView}>
          <View style={{ flexDirection: "row" }}>
            <Image style={{ width: 75, height: 75, alignSelf: "center" }} source={require("../assets/cup.png")} />
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Xếp hạng</Text>
              <Text style={{ fontSize: 30, color: "#ffaf18", fontWeight: "bold", textAlign: "center" }}>
                {userRank ? userRank : "-"}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 40, color: "#ffaf18", fontWeight: "bold", textAlign: "center" }}>
              {totalCoin}
            </Text>
            <Image style={{ width: 50, height: 50, alignSelf: "center" }} source={require("../assets/points.png")} />

          </View>
        </View>
      </View>
    
    {/* <Image style={{height:"20%",width:'90%',borderRadius:30,left:20,bottom:40}} source={{uri : 'https://blogtienao.com/wp-content/uploads/2024/01/solana.jpeg.webp'}}/> */}

    <View style={{top:-60}}>
      <SliderBox images={slides} dotColor='black'
      autoPlay={true}
      autoplayInterval={1000}
      circleLoop={true}
      style={styles.sliderImg}
      />
    </View>

    
    <Text style={{ fontSize: 25, fontWeight: "bold", margin: 20,top:-50}}> Nhiệm vụ</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        style={styles.itemCard}
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
    backgroundColor: "#fff",
      margin: 20,
      padding: 10,
      bottom:75,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      borderRadius:20,
      flexDirection: "row",
      justifyContent: "space-around",
      
   
  },
  containerItemCard: {
    width: 182,
    height:240,
    marginEnd:22,
    borderRadius:15,
    backgroundColor:'#fff',
    left:10,

  },
  imageContainer  :{
    flex : 1,
    width : '100%',
    overflow:'hidden',
    borderRadius : 15,
  },
  imageItem : {
    aspectRatio : 1,
    resizeMode: 'cover',
    width:'100%'
  },
  carouselContainer : {
    flex : 1,
    alignItems : 'center',
    bottom: 20,
  },
  sliderImg: {
    height:150,
    width:400,
    borderRadius : 30,
    marginLeft : 6
  },
  itemCard: {
    left : 5,
    top:-50,
    
    
  },
  textTitle :{
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