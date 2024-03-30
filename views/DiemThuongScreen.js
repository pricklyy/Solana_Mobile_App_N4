import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NFTCard from "./NFTCard";
import { useAuth } from "../configs/authContext";
import { API_LIST_QUIZZ, API_TOTAL_COIN_BY_UID, API_RANK_LIST } from "../configs/api-config";
import { useNavigation } from '@react-navigation/native';
export default function DiemThuongScreen() {
  const [nfts, setNfts] = useState([]);
  const [data, setData] = useState([]);
  const [totalCoin, setTotalCoin] = useState();
  const { user } = useAuth();
  const navigation = useNavigation();
  console.log(user);
  const xKey = "SgoCpRiRdZ8IGvOB"; // Thay thế bằng x-api-key của bạn
  const wallID = "21Enez3QKHJHdiMGVcf3YsNEixYpHwbNbXBsHtDiEGmv"; // Thay thế bằng địa chỉ ví của bạn
  const network = "devnet"; // Sử dụng mạng devnet
  // useEffect(() => {
  //   fetchNFTs();
  //   getCoin();
  // }, []);

  useEffect(() => {
    fetchNFTs();
    getCoin();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchNFTs();
      getCoin();
    });

    return unsubscribe;
  }, [navigation, user]);

  const getCoin = async () => {
    try {
      if (user && user._id) {
        const response = await axios.get(`${API_TOTAL_COIN_BY_UID}/${user._id}`);
        setTotalCoin(response.data.totalScore);
        console.log(response.data.totalScore);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchNFTs = async () => {
    try {
      const nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
      const response = await axios.get(nftUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      const nftData = response.data.result.map((item) => ({
        id: item.mint,
        name: item.name,
        points: 100, // Giả sử mỗi NFT cần 100 điểm
        imageUri: { uri: item.image_uri },
      }));
      setNfts(nftData);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to fetch NFTs");
    }
  };

  const tranferDoiThuong = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", xKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "network": "devnet",
      "token_address": "izz92JNuY4ccDcw171LYfGcDC8SgE1EqBgdXAqovNxS",//lấy từ NFTs
      "from_address": "9FWUokoE27tEtaxCvcUwQwQdtY5bbzcgqX7miKct1geS",//lấy từ Admin
      "to_address": "F8zYJEbLJ3n6rKjHrno5tSG6Uvz3cf1fzpP5uBNU7zhg",//lấy từ address ví người dùng
      "transfer_authority": true,
      "fee_payer": "F8zYJEbLJ3n6rKjHrno5tSG6Uvz3cf1fzpP5uBNU7zhg"//lấy từ address ví người dùng
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.shyft.to/sol/v1/nft/transfer_detach", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  const renderNFTCard = ({ item }) => (
    <NFTCard
      name={item.name}
      points={item.points}
      imageUri={item.imageUri}
      onPress={() => {
        if (totalCoin < item.points) {
          Alert.alert("Thông báo!", "Không đủ điểm", [
            {
              text: "OK",
            },
          ]);
        } else {
          tranferDoiThuong();
        }
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View
          style={[styles.imgBackground, { borderRadius: 50 }]}>
          <Image
            style={{
              height: 100,
              width: 100
            }}
            source={require("../assets/cup.png")}></Image>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 12 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Điểm thưởng</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
              <Text style={{ fontSize: 50, fontWeight: "bold", color: "#ffaf18" }}>{totalCoin} </Text>
              <Image style={{ width: 50, height: 50 }} source={require("../assets/points.png")} />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: 30, height: 30 }} source={require("../assets/gift.png")} />
              <Text style={{ alignSelf: "center", color: "black", fontWeight: "bold" }}>Quà của tôi</Text>
            </View>

            <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <Image style={{ width: 30, height: 30 }} source={require("../assets/history_reward_gift.png")} />
              <Text style={{ alignSelf: "center", color: "black", fontWeight: "bold" }}>Lịch sử</Text>
            </View>

          </View>
        </View>
      </View>


      <Text style={{ fontSize: 16, fontWeight: "bold", alignSelf: "flex-start", margin: 10 }}>Quà hấp dẫn</Text>
      <FlatList
        data={nfts}
        renderItem={renderNFTCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  cardView: {
    backgroundColor: "#fff",
      margin: 20,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      borderRadius:20,
      flexDirection: "row",
      justifyContent: "space-around",
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    padding: 5,
  },
  imgBackground: {
    width: "100%",
    height: 170,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
});
