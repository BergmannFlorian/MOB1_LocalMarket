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

import UserStack from './stack/user';
import ProductsStack from './stack/products';
import BasketStack from './stack/basket';
import { HelpView } from './view/help';

const Tab = createBottomTabNavigator();
console.disableYellowBox = true;

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Mon compte" component={UserStack} />
        <Tab.Screen name="Produits" component={ProductsStack} />
        <Tab.Screen name="Panier" component={BasketStack} />
        <Tab.Screen name="Aide" component={HelpView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;