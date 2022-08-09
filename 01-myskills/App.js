import React from 'react';

import { StatusBar } from 'react-native';
// import { Text } from 'react-native';

import { Home } from './src/pages/Home';

export default function App() {
  return (
    <>
      {/* <Text>Algum texto</Text> */}
      <StatusBar
        barStyle="light-content"
      />
      <Home />
    </>
  );
}
