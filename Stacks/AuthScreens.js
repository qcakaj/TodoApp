import React from 'react';
import Login from '../screens/Login';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const AuthStack = createNativeStackNavigator();
export const AuthScreens = () => {
  const { colors } = useTheme();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={({ route }) => {
          return ({
            headerStyle: {
              backgroundColor: colors.card
            },
            animation: "slide_from_right",
          });
        }} />
    </AuthStack.Navigator>
  );
};
