import React from 'react';
import Home from './src/Screen/home';
import test from './src/Screen/test';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="test_screen" component={test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
