import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements';

export const ProductsView = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = React.useState(async () => getProducts());
    
    async function getProducts() {
        var token = await AsyncStorage.getItem('@localmarket:token');
        const res = await axios.get(`http://10.229.33.29:81/api/products`, { headers: { Authorization: `Bearer ${token}` } });
        setProducts(res.data.data);
        console.log(res.data.data);
        setLoading(false);
    };

    return (
    <View>
        {isLoading ? <ActivityIndicator/> :
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.product}>
                            <Image style={styles.picture} source={{ uri: `http://http://10.229.33.29:81/storage/pictures/${item.picture}` }} />
                            <View style={styles.informations}>
                                <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                                <Text style={styles.lastUpdate} numberOfLines={1} ellipsizeMode="clip" >{item.updatedAt}</Text>
                                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={1}>{item.details}</Text>
                                <Text style={styles.stock} >📦 {item.stock} disponibles(s)</Text>
                                <Text style={styles.price} >💰 {item.price} CHF / {item.unit}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
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