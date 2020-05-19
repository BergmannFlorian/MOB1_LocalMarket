/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HelpView } from './view/help';
import { HomeView } from './view/home';
import { LoginView } from './view/user/login';
import { MeView } from './view/user/me';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Help" component={HelpView} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Me" component={MeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;