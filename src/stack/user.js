import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginView } from '../view/user/login';
import { MeView } from '../view/user/me';
import { RegisteryView } from '../view/user/registery';

const Stack = createStackNavigator();

function UserStack(){
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Me" component={MeView} />
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Registery" component={RegisteryView} />
        </Stack.Navigator>
    )
}
export default UserStack;