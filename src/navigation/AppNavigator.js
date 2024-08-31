import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeListScreen from '../../screens/HomeListScreen';
import HomeDetailsScreen from '../../screens/HomeDetailsScreen';
import LoginScreen from '../../screens/LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeList" component={HomeListScreen} />
        <Stack.Screen name="HomeDetails" component={HomeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
