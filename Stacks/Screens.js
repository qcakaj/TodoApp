import React from 'react';
import Home from '../screens/Home';
import TodoList from '../screens/TodoList';
import EditList from '../screens/EditList';
import Colors from '../constants/Colors';
import Settings from '../screens/Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const Stack = createNativeStackNavigator();
export const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Todo' component={Home}
        options={({ route }) => {
          return ({
            headerStyle: {},
            animation: "slide_from_right",
          });
        }} />
      <Stack.Screen
        name='Settings'
        component={Settings}

        options={({ route }) => {
          return ({
            animation: "slide_from_right",
          });
        }} />

      <Stack.Screen
        name='Todo List'
        component={TodoList}
        options={({ route }) => {
          return ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: route.params.color
            },
            headerTintColor: "white",
            animation: "slide_from_right",
          });
        }} />
      <Stack.Screen
        name="Edit"
        component={EditList}
        options={({ route }) => {
          return ({
            title: route.params.title ? `Edit ${route.params.title} list` : "Create new list",
            headerStyle: {
              backgroundColor: route.params.color || Colors.blue
            },
            headerTintColor: "white",
            animation: "slide_from_right",
          });
        }}>
      </Stack.Screen>
    </Stack.Navigator>
  );
};
