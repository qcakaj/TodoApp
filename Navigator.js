import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Screens } from './Stacks/Screens';
import { AuthScreens } from './Stacks/AuthScreens';
import { MyDarkTheme, MyTheme } from './constants/AppThemes';
import { auth } from './constants/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setUserUid } from './store/actions';
import { ActivityIndicator } from 'react-native';




export default function Navigator() {
  const scheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.userReducer.isLoading);

 
  useEffect(() => {
    // if (auth.currentUser) {
    //   setIsAuthenticated(true);
    // }
    onAuthStateChanged(auth, (user) => {
      dispatch(setIsLoading(true));
      if (user) {
        dispatch(setUserUid(user.uid));
        setIsAuthenticated(true);
       dispatch(setIsLoading(false));
      } else {
         setIsAuthenticated(false);
         dispatch(setIsLoading(false));
      }
    });
  }, []);
    
  if(isLoading) {
    return (
      <ActivityIndicator
      //visibility of Overlay Loading Spinner
      visible={true}
    />
    );
  } else {
    return (
      <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyTheme}>
        {isAuthenticated ? <Screens /> : <AuthScreens />}
      </NavigationContainer>
    );
  }
  }
;
