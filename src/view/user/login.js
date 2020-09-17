import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, AsyncStorage, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { Formik } from 'formik';
import { RegisteryView } from './registery';

export const LoginView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const login = (token) => {
    fetch('http://10.229.33.29:81/api/me', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => {
      if(response.status == 200){
        AsyncStorage.setItem('@localmarket:token', token);
        navigation.navigate('Me', {token: token});
      }else{
        Alert.alert("Token invalid");
      }
    })
    .catch((error) => console.error(error))
  };
  _getToken = async () => {
    const token = await AsyncStorage.getItem('@localmarket:token');
    console.log(token);
    if (token !== null) {
      login(token);
    }
  };
  _getToken();

  return (
    <Formik
    initialValues={{ token: 'TWxOIDLr84D3PvID6nUfmZQmSpGjrmSror72s1StFCoKsvx1WvvFdQVBkQnt'}}
    onSubmit={values => {
      login(values.token);
    }}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <Input label="Token d'authentification" placeholder="Token" onChangeText={handleChange('token')} value={values.token}/>
          <Button title="Se connecter" onPress={handleSubmit}/>
          <Button title="S'enregistrer" onPress={() => navigation.navigate('Registery')}/>
        </View>
      </ScrollView>
    )}
    </Formik>
  )
};

const styles = StyleSheet.create({

});
