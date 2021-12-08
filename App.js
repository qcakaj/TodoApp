import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import TodoList from './screens/TodoList';
import EditList from './screens/EditList';
import Login from './screens/Login';
import Colors from './constants/Colors';
import Settings from './screens/Settings';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';



const firebaseConfig = {
  apiKey: "AIzaSyDbCLHJohLs2YHaTZO5PEW4tF-LvWGzG7E",
  authDomain: "todoapp-92ef7.firebaseapp.com",
  projectId: "todoapp-92ef7",
  storageBucket: "todoapp-92ef7.appspot.com",
  messagingSenderId: "321022956486",
  appId: "1:321022956486:web:9131a8de1e5084bf9818c7"
};

initializeApp(firebaseConfig);

const auth = getAuth();


const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={({ route }) => {
          return ({
            animation: "slide_from_right",
          });
        }} />
    </AuthStack.Navigator>
  );
}
const Screens = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name='Todo' component={Home} 
             options={({ route}) => {
              return ({
        
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
}
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      setIsAuthenticated(true);
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    })
  }, []);

  return (
    <PaperProvider>
    <NavigationContainer>
      {isAuthenticated ? <Screens/> : <AuthScreens />}
    </NavigationContainer>
    </PaperProvider>
  );
};


