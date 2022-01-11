import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useColorScheme } from 'react-native';
import { Screens } from './Screens';
import { AuthScreens } from './AuthScreens';
import { MyDarkTheme, MyTheme } from './AppThemes';
import { auth } from './firebaseConfig';




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


