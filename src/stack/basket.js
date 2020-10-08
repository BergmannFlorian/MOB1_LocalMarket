import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ProductsStack(){
    return(
        <Stack.Navigator initialRouteName='Products'>

        </Stack.Navigator>
    )
}
export default ProductsStack;