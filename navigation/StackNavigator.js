import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './../src/Home';
import Detailes from './../src/Detailes';
const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{
            header: ({}) => null,
          }}
        />
        <Stack.Screen
          name="Detailes"
          component={Detailes}
          options={{
            header: ({}) => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
