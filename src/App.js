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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import UserStack from './user';
import ProductsStack from './products';
import { HelpView } from './view/help';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Me" component={UserStack} />
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="Help" component={HelpView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;