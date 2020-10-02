import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-native-elements'
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const MeView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [me, setMe] = React.useState(async () => getMe());

  async function getMe() {
    var token = await AsyncStorage.getItem('@localmarket:token');
    const res = await axios.get(`${global.dbUrl}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
    setMe(res.data.data);
    setLoading(false);
  }
  
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : <Text>{me.firstname} {me.lastname}</Text>}
      <Button title="Products" onPress={() => navigation.navigate('Products', {screen: 'Products'})}/>
    </View>
  );
};

const styles = StyleSheet.create({
  
});