import React from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const HomeView = ({ navigation }) => {
  
  async function tryLogin(){
    var token = await AsyncStorage.getItem('@localmarket:token');
    if(token !== null){
      const res = await axios.get(`${global.dbUrl}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
      if(res.status == 200)navigation.navigate('Me');
      else navigation.navigate('Login');
    }else navigation.navigate('Login');
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home View</Text>
      <Button title="Help" onPress={() => navigation.navigate('Help')}/>
      <Button title="Login" onPress={() => tryLogin()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  
});