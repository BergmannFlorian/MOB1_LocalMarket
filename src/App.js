/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HelpView } from './view/help';
import { HomeView } from './view/home';
import { LoginView } from './view/user/login';
import { MeView } from './view/user/me';
import { RegisteryView } from './view/user/registery';
import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Help" component={HelpView} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Me" component={MeView} />
        <Stack.Screen name="Registery" component={RegisteryView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;