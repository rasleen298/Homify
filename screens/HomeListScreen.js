import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import  {Home_Mock} from '../assets';

const HomeListScreen = ({ navigation }) => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      const response = await require('../api/homesApi.json');
      setHomes(response);
    };
    fetchHomes();
  }, []);

  return (
    <View style={{ flex: 1, marginTop:10, marginHorizontal:10, padding:10}}>
      <FlatList
        data={homes}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('HomeDetails', { home: item })}>
            <View style={{ backgroundColor:"white", borderWidth:1,borderColor:"black",padding:10, alignItems:"center" }}>
            <Image
        source={Home_Mock}
        style={{ 
          width: 200,
          height: 200,
        }}
      />
              {/* <Image source={{ uri: item.image }} style={{ height: 150, borderRadius: 8 }} /> */}
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.address}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeListScreen;
