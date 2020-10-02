import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProductsView } from './view/products/products';
import { ProductView } from './view/products/product';

const Stack = createStackNavigator();

function ProductsStack(){
    return(
        <Stack.Navigator initialRouteName='Products'>
            <Stack.Screen name="Products" component={ProductsView} />
            <Stack.Screen name="Product" component={ProductView} />
        </Stack.Navigator>
    )
}
export default ProductsStack;