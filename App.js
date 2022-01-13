import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Screens } from './Stacks/Screens';
import { AuthScreens } from './Stacks/AuthScreens';
import { MyDarkTheme, MyTheme } from './constants/AppThemes';
import { auth } from './constants/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useColorScheme } from 'react-native';





export default function App() {
  const scheme = useColorScheme();
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
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyTheme}>
      {isAuthenticated ? <Screens/> : <AuthScreens />}
    </NavigationContainer>
  );
};


