import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TextInput, Button, Alert, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

export const BasketView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState(new Array);
  const [listProducts, setListProducts] = React.useState(async () => getProducts(), []);

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
            product.quantity = purchases[index].quantity
            //move product from list to basket
            temp_products.push(product);
            temp_listProducts = temp_listProducts.filter(product => product.id != purchases[index].product_id);
          }
        }
        setProducts(temp_products);
      }
      setListProducts(temp_listProducts);
    }else Alert.alert("Erreur de chargement, si le problème persiste, merci de conctacter le support")
    setLoading(false);
  };

  async function addToBasket(id){
    var purchases = JSON.parse(await AsyncStorage.getItem('@localmarket:basket'));
    if(purchases == null)purchases = new Array;
    if(purchases.find(product => product.product_id == id) == undefined){
      purchases.push({product_id: id, quantity: 0});
      var temp_products = products;
      product = listProducts.find(product => product.id == id)
      product.quantity = 0;
      temp_products.push(product);
      AsyncStorage.setItem('@localmarket:basket', JSON.stringify(purchases));
      setListProducts(listProducts.filter(product => product.id != id));
      setProducts(temp_products);
    }
  }
  async function removeFromBasket(id){
    var purchases = JSON.parse(await AsyncStorage.getItem('@localmarket:basket'));
    var temp_listProducts = listProducts;
    temp_listProducts.push(products.find(product => product.id == id));
    AsyncStorage.setItem('@localmarket:basket', JSON.stringify(purchases.filter(product => product.product_id != id)));
    setProducts(products.filter(product => product.id != id));
    setListProducts(temp_listProducts);
  }

  async function updateQuantity(id, quantity){
    if(!isNaN(quantity) && quantity>=0 && quantity!=""){
      var purchases = JSON.parse(await AsyncStorage.getItem('@localmarket:basket'));
      purchases.find(product => product.product_id == id).quantity = quantity;
      AsyncStorage.setItem('@localmarket:basket', JSON.stringify(purchases));
      getProducts();
    }
  }

  async function purgeBasket(){
    AsyncStorage.setItem('@localmarket:basket', JSON.stringify([]));
    getProducts();
  }

  return (
    <View>
      {isLoading ? <ActivityIndicator/> :
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image style={styles.picture} source={{ uri: `${global.dbUrl}/storage/pictures/${item.picture}` }} />
              <View style={styles.informations}>
                <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.lastUpdate} numberOfLines={1} ellipsizeMode="clip" >{item.updated_at}</Text>
                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={1}>{item.details}</Text>
                <Text style={styles.stock} >📦 {item.stock} disponibles(s)</Text>
                <Text style={styles.price} >💰 {item.price} CHF / {item.unit}</Text>
                <View style={styles.quantity}>
                  <Text style={styles.label}>Quantité:</Text>
                  <TextInput
                      style={styles.textInput}
                      placeholderTextColor="rgb(180, 180, 180)"
                      keyboardType="numeric"
                      value={String(item.quantity)}
                      onChangeText={(value) => updateQuantity(item.id, value)}
                  />
                </View>
                <View style={styles.button}>
                 <Button title="Supprimer" onPress={() => removeFromBasket(item.id)}/>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => String(item.id)}
          />
        }
      <View style={{ position: "relative", bottom: 0, width: "100%" }}>
        {listProducts.length > 0 ? (
          <Picker
          style={styles.picker}
          onValueChange={(value) => addToBasket(value)} >
                <Picker.Item
                    label="Cliquez pour séléctionner un produit a ajouter au panier"
                    value="-1"
                    key="0" />
                {listProducts.map((product) => (
                  <Picker.Item
                  label={product.name}
                  value={product.id}
                  key={String(product.id)}
                  />
                  ))}
            </Picker>
        ) : null}
      </View>
      <Button title="Vider le panier" onPress={() => purgeBasket()}/>
    </View>  
  );
};

const styles = StyleSheet.create({
  background: {
      backgroundColor: "rgba(200, 200, 200, 0.5)",        
      borderColor: 'transparent',
      marginTop: 3,
      borderWidth: 1,
      color: 'white',
      borderRadius: 1,        
      shadowColor: 'black',
      shadowOpacity: 10,
      elevation: 2,
      padding: 10,
  },
  button: {
    position: "absolute",
    right: 15,
    bottom: 8,
    width: 100,
  },
  product: {        
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
  },
  picture: {
      borderWidth: 1,
      width: 150,
      height: 150,
      resizeMode: 'contain',
      overflow:"hidden"
  },
  informations: {
      flex:1,
      padding: 15,
      paddingTop: 5
  },
  title: {     
      width: "70%",
      fontSize: 15,
      textDecorationLine: "underline",
      fontStyle: 'italic',
      textTransform: "capitalize",
  },
  lastUpdate: {
      position: "absolute",
      right: 15,
      top: 8,
      width: 60,
      fontSize: 12,
      overflow: "hidden",
      color: "rgba(0, 0, 0, 0.6)"
  },
  description: {
      paddingTop: 15,
      paddingBottom: 15,
  },
  stock: {
      height: 40, 
  },
  price:{
      position: "absolute",
      left: 15,
      bottom: 5
  },
  market: {        
      position: "absolute",
      right: 15,
      bottom: 15,
      width: 40,
      height: 40,
      paddingTop: 7,
      paddingLeft: 2,
      borderRadius: 100,
      overflow:"hidden",
      backgroundColor: "rgba(0, 0, 255, 0.4)",
  },
  picker: {
    backgroundColor: "rgba(200, 200, 200, 0.8)",
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 1)",
    paddingTop: 20,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pickerTitle: {
    borderWidth: 1,
    borderColor: "transparent",
    borderTopColor: "rgba(0, 0, 0, 1)",
    paddingTop: 20,
    position: 'relative',
    left: 0,
    right: 0,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  quantity: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "absolute",
    right: 155,
    bottom: 8,
  },
  label: {
      top: 5
  },
  textInput: {
      textAlign: "center",
      position: "relative",
      left: 5,
      padding: 0,
      backgroundColor: 'rgba(150, 150, 150, 0.45)',
      width: 100,
      paddingLeft: 10
  },
});