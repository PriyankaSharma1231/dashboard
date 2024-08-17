/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementcount,
  decrementcount,
} from './store/cartSlice';
import CountItem from './countitem';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
      setModalVisible(false);
    }
  };

  const handleRemoveFromCart = () => {
    if (selectedProduct) {
      dispatch(removeFromCart(selectedProduct));
      setModalVisible(false);
    }
  };

  const handleIncrement = () => {
    if (selectedProduct) {
      dispatch(incrementcount(selectedProduct));
    }
  };

  const handleDecrement = () => {
    if (selectedProduct) {
      dispatch(decrementcount(selectedProduct));
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer2}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedProduct(item);
          setModalVisible(true);
        }}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
      <StarRating rating={item.rating.rate} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const quantityInCart =
    cart.find(item => item.id === selectedProduct?.id)?.quantity || 0;

  const StarRating = ({rating}) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.containerstart}>
        {[...Array(fullStars)].map((_, index) => (
          <Text key={`full-${index}`} style={styles.star}>
            ★
          </Text>
        ))}
        {halfStar && <Text style={styles.star}>☆</Text>}
        {[...Array(emptyStars)].map((_, index) => (
          <Text key={`empty-${index}`} style={styles.star}>
            ☆
          </Text>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.headerTitle}>Cart Items: </Text>
          <CountItem />
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Image
                source={{uri: selectedProduct.image}}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{selectedProduct.category}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price:</Text>
                <Text style={styles.productPrice}>{selectedProduct.price}</Text>
              </View>
              <Text style={styles.productDescription}>
                {selectedProduct.description}
              </Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={handleDecrement}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantityInCart}</Text>
                <TouchableOpacity
                  onPress={handleIncrement}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddToCart} style={styles.btn}>
                  <Text style={styles.addToCartText}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.btnclose}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleRemoveFromCart}
                  style={styles.btnremove}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    // padding: 15,
    // marginTop: 15,
    // backgroundColor: 'white',
    // elevation: 1,
    borderRadius: 12,
    // marginHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  itemContainer2: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 100,
    padding: 15,
    marginTop: 10,
    backgroundColor: '#D4F3EF',
    // elevation: 1,
    borderRadius: 12,
    marginHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    // bottom: 10,
    // height: '30%',
    color: 'black',
    width: '80%',

    // backgroundColor: 'red',
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // height: 100,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 350,
    padding: 15,
    marginTop: 30,
    backgroundColor: '#ABF0E9',
    borderRadius: 12,
    // height: '75%',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 15,
    width: 300,
    color: 'black',
    marginTop: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
  },
  priceLabel: {
    color: 'black',
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  quantityButton: {
    backgroundColor: 'powderblue',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'black',
    fontSize: 20,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: '#FF6969',
    // marginLeft: 50,
    flex: 1,
    position: 'absolute',
    // left: 0,
    right: 0,
    justifyContent: 'center',
    width: 120,
    height: 40,
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
    borderRadius: 20,
    // marginHorizontal: 15,
  },
  btnclose: {
    backgroundColor: 'lightgray',
    width: 100,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 15,
  },
  btnremove: {
    backgroundColor: 'lightgray',
    width: 100,
    height: 40,
    // marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  addToCartText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  removeText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  header: {
    padding: 10,
    backgroundColor: '#63B7AF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  containerstart: {
    flexDirection: 'row',
    // bottom: 10,
  },
  star: {
    color: '#FFD700', // Gold color for stars
    fontSize: 20,
  },
  headerText: {
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: '700',
    paddingTop: 20,
    fontSize: 22,
    // fontFamily: 'POPPINS-BOLD',
  },
});

export default ProductList;
