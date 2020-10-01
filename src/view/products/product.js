import React, { useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Image } from 'react-native-elements';

export const ProductView = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = React.useState(async () => getProduct(route.params));
    
    async function getProduct(productId) {
        var token = await AsyncStorage.getItem('@localmarket:token');
        const res = await axios.get(`${global.dbUrl}/api/products/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
        setProduct(res.data.data);
        setLoading(false);
    };

    return (
    <View>
        {isLoading ? <ActivityIndicator/> :
            <TouchableOpacity style={styles.product}>
            <Image style={styles.picture} source={{ uri: `${global.dbUrl}/storage/pictures/${product.picture}` }} />
            <View style={styles.informations}>
                <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.lastUpdate} numberOfLines={1} ellipsizeMode="clip" >{product.updatedAt}</Text>
                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={1}>{product.details}</Text>
                <Text style={styles.stock} >📦 {product.stock} disponibles(s)</Text>
                <Text style={styles.price} >💰 {product.price} CHF / {product.unit}</Text>
            </View>
        </TouchableOpacity>
        }
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
    product: {        
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    picture: {
        borderColor: "rgba(0, 0, 0, 0.2)", //TODO to remove later
        backgroundColor: "white",
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
        width: 65,
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
    }
});