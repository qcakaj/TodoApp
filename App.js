import React, { useState, useEffect } from 'react';
import { Store } from './store/store';
import { Provider } from 'react-redux';
import Navigator from './Navigator';



export default function App() {
  return (
    <Provider store={Store}>
        <Navigator/>
    </Provider>
  );
}

