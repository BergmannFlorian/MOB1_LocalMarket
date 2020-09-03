import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, AsyncStorage } from 'react-native';

export const ProductsView = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getProducts = (token) => {
        fetch('http://10.229.33.29:81/api/products', {
            method: 'GET',
            headers: {"Authorization": "Bearer " + token}
        })
        .then((response) => response.json())
        .then((json) => {
            setData(json.data);
            console.log(json.data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    };

    _getToken = async () => {
        const token = await AsyncStorage.getItem('@localmarket:token');
        console.log(token);
        if (token !== null) {
            getProducts(token);
        }
    };
    _getToken();


    return (
    <View>
        {isLoading ? <ActivityIndicator/> : <Text>Chargé</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  
});