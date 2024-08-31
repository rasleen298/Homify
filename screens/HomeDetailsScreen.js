import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet,Flatlist } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import  {Home_Mock} from '../assets';

const HomeDetailsScreen = ({ route }) => {
  const { home } = route.params;
  const [location, setLocation] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      // Calculate distance using geolib
      const distance = getDistance(
        { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
        { latitude: home.latitude, longitude: home.longitude }
      );

      setIsWithinRange(distance <= 30); // Check if within 30 meters
    };

    fetchLocation();
  }, []);

  const handleUnlock = () => {
    setTimeout(() => {
      Alert.alert('Success', 'The home has been unlocked!');
    }, 1000);
  };

  return (
    <View style={styles.container}>
        <Image
        source={Home_Mock}
        style={{ 
          width: 200,
          height: 200,
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{home.name}</Text>
      <Text style={{ fontSize: 15 }}>{home.address}</Text>
      <Text style={{ marginVertical: 10 }}>{home.description}</Text>
      {isWithinRange && (
        <TouchableOpacity style={styles.button} onPress={handleUnlock}>
          <Text style={styles.buttonText}>Unlock</Text>
        </TouchableOpacity>
        )}
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex: 1, padding: 16,backgroundColor:"white",alignItems:"center"
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default HomeDetailsScreen;
