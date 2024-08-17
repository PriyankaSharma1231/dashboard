/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import ProductList from './src/productlist';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
};
export default App;
