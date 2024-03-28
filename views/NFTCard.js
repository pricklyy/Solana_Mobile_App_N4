import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const NFTCard = ({ name, points, imageUri, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={imageUri} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.pointsContainer}>
      <Text style={styles.points}>{points}</Text>
        <Image
          source={require('../assets/point.png')} 
          style={styles.pointsIcon}
        />
      </View>
      <TouchableOpacity style={styles.redeemButton} onPress={onPress}>
        <Text style={styles.redeemText}>Đổi ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    width: 170, 
  },
  image: {
    width: '100%',
    height: 120, 
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  redeemButton: {
    flexDirection: 'row',
    backgroundColor: '#FFD700', 
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  redeemText: {
    fontSize: 14,
    color: '#fff', 
    fontWeight: 'bold',
  },
  redeemIcon: {
    width: 20,
    height: 20, 
    marginLeft: 5,
  },  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIcon: {
    width: 25,  
    height: 25, 
    marginRight: 5,
  },
  points: {
    fontSize: 14,
    color: '#666',
    fontWeight:"bold",
    margin:5
  },
  
});

export default NFTCard;