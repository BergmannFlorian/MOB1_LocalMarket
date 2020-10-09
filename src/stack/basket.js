import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BasketView } from '../view/basket/basket';

const Stack = createStackNavigator();

function BasketStack(){
    return(
        <Stack.Navigator initialRouteName='Basket'>
            <Stack.Screen name="Basket" component={BasketView} />
        </Stack.Navigator>
    )
}
export default BasketStack;