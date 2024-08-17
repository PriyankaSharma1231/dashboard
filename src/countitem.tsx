/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const CountItem = ({onPress}) => {
  const cartItems = useSelector(state => state.cart);
  console.log('CART Countitem screen ITEMS', cartItems);

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.cartContainer}>
      {/* <Text style={styles.cartText}>🛒</Text> */}
      {getTotalItems() > 0 ? (
        // <View style={styles.badge}>
        <Text style={styles.badgeText}>{getTotalItems()}</Text>
      ) : (
        // </View>
        <Text style={styles.badgeText}>0</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    position: 'relative',
    padding: 10,
  },
  cartText: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'black',
    fontSize: 18,
  },
});

export default CountItem;
