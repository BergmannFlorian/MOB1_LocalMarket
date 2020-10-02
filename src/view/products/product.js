import React, { useState } from 'react';
import axios from 'axios';
import { Dimensions, ActivityIndicator, StyleSheet, View, TouchableOpacity, Text, AsyncStorage, ScrollView } from 'react-native';
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
            <View style={styles.productBackground}>
                <Image source={{ uri: `${global.dbUrl}/storage/pictures/${product.picture}` }} style={styles.picture} />
                <View style={styles.details}>
                    <Text>💰 {product.price} CHF / {product.unit}</Text>
                    <Text>📦 {product.stock} disponibles(s)</Text>
                </View>
                <ScrollView style={styles.description}>
                    <Text style={styles.descriptionText}>{product.details}</Text>
                </ScrollView>
                <View style={styles.providerGroup}>
                    <Text style={styles.providerTitle}>Fournisseur(s):</Text>
                    <ScrollView style={styles.providers}>
                        {/* {getProviders().map(provider => <Text>{provider}</Text>)} */}
                        <Text style={styles.provider}>Provider One</Text>
                        <Text style={styles.provider}>Provider Two</Text>
                        <Text style={styles.provider}>Provider Three</Text>
                        <Text style={styles.provider}>Provider Three</Text>
                        <Text style={styles.provider}>Provider Three</Text>
                        <Text style={[styles.provider, styles.noBorders]}>Provider Three</Text>
                    </ScrollView>
                </View>                    
            </View>
        }
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
    },
    detailProduct: {
        justifyContent: "center",
        alignItems: "center",
    },
    productBackground: {
        marginTop: 20,
        width: Dimensions.get("window").width - 20,
        height: Dimensions.get("window").height - 120,
        padding: 40
    },
    picture: {
        width: "100%",
        height: 150,
        resizeMode: 'contain',
        overflow: "hidden",
        borderRadius: 100,
    },
    details: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    description: {
        height: "20%",
        marginBottom: 20,
    },
    descriptionText: {
        lineHeight: 25,
    },
    providerGroup: {
        borderWidth: 1,
        borderColor: "transparent",
        borderTopColor: "rgba(0, 0, 0, 0.2)",
        paddingTop: 20,
    },
    providerTitle: {
        fontSize: 20,
        textDecorationLine: "underline",
        marginBottom: 10
    },
    providers: {        
        height: 100,
    },
    provider: {
        padding: 2,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: "rgba(0, 0, 0, 0.2)",        
    },
    noBorders: {
        borderBottomColor: "transparent",
    },
    market: {
        position: "absolute",
        right: 20,
        top: 20,
        width: 40,
        height: 40,
        paddingTop: 7,
        paddingLeft: 2,
        borderRadius: 100,
        overflow:"hidden",
        backgroundColor: "rgb(109, 116, 220)",

    }
});