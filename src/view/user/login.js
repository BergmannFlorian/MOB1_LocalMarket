import React, { useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, ScrollView, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button } from 'react-native-elements'
import { Formik } from 'formik';

export const LoginView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  React.useState(async () => tryLogin());
  
  async function tryLogin(){
    var token = await AsyncStorage.getItem('@localmarket:token');
    if(token != null)login(token);
    else setLoading(false)
  }

  async function login(token) {
    setLoading(true)
    const res = await axios.get(`${global.dbUrl}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
    if(res.status == 200){
      AsyncStorage.setItem('@localmarket:token', token);
      navigation.navigate('Me');
    }else {
      Alert.alert("Token invalide");
      setLoading(false)
    }
  };

  return (
    <Formik
    initialValues={{ token: 'pZXNYLXOtusKnrXuwmmhxNSwAJSO2ab8EzLTD70FBCfZnahrqrSKTpxYKywN'}}
    onSubmit={values => {
      login(values.token);
    }}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
          {isLoading ? <ActivityIndicator/> :
          <View style={{ flex: 1, padding: 24 }}>
            <Input label="Token d'authentification" placeholder="Token" onChangeText={handleChange('token')} value={values.token}/>
            <View>
              <Button title="Se connecter" onPress={handleSubmit}/>
              <Button title="S'enregistrer" onPress={() => navigation.navigate('Registery')}/>
            </View>
          </View>
          }
      </ScrollView>
    )}
    </Formik>
  )
};

const styles = StyleSheet.create({

});
