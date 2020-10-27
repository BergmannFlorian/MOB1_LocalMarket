import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';

export const BasketView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState(new Array);
  const [listProducts, setListProducts] = React.useState(async () => getProducts());

  async function getProducts() {
    var token = await AsyncStorage.getItem('@localmarket:token');
    const res = await axios.get(`${global.dbUrl}/api/products`, { headers: { Authorization: `Bearer ${token}` } });
    var temp_listProducts = res.data.data;
    var purchases = JSON.parse(await AsyncStorage.getItem('@localmarket:basket'));

    if(res.status == 200){

      if(purchases != null){
        var temp_products = new Array;
        for (var index in purchases) {
          var product = temp_listProducts.find(product => product.id == purchases[index].product_id);
          if(product != undefined){
            temp_products.push(product);
            temp_listProducts = temp_listProducts.filter(product => product.id != purchases[index].product_id);
          }
        }
        setProducts(temp_products);
      }
      setListProducts(temp_listProducts);
      setLoading(false);
    }else Alert.alert("Erreur de chargement, si le problème persiste, merci de conctacter le support")
  };

  async function addToBasket(id){
    var purchases = JSON.parse(await AsyncStorage.getItem('@localmarket:basket'));
    if(purchases == null)purchases = new Array;
    if(purchases.find(product => product.product_id == id) == undefined){
      purchases.push({product_id: id, quantity: 0});
      product_s = products;
      product_s.push(listProducts.find(product => product.id == id));
      setListProducts(listProducts.filter(product => product.id != id));
      AsyncStorage.setItem('@localmarket:basket', JSON.stringify(purchases));
      setProducts(product_s);
    }
  }
  async function removeFromBasket(id){
    var purchases = JSON.parse(await AsyncStorage.getItem('@localmarket:basket'));
    listProduct_s = listProducts;
    listProduct_s.push(products.find(product => product.id == id));
    setProducts(products.filter(product => product.id != id));
    AsyncStorage.setItem('@localmarket:basket', purchases.filter(product => product.product_id != id));
    setListProducts(product_s);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Basket View</Text>
      <Button title="Rafraichir" onPress={() => getProducts()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  
});