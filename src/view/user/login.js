import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { Formik } from 'formik';

export const LoginView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const login = (token) => {
    fetch('http://192.168.25.1:80/api/me', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => {
      if(response.status == 200){
        AsyncStorage.setItem('@localmarket:token', token);
        navigation.navigate('Me', {token: token});
      }
    })
    .catch((error) => console.error(error))
  };

  _getToken = async () => {
    const token = await AsyncStorage.getItem('@localmarket:token');
    if (token !== null) {
      login(token);
    }
  };
  _getToken();

  return (
    <Formik
    initialValues={{ token: '3QAqRIjWNX8XJa9Ra6wJAzEkN90I5NkmRVNUMyHbZ98fjUT07d2sxDRrg3bv'}}
    onSubmit={values => {
      console.log(values.token);
      login(values.token);
    }}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <Input label="Token d'authentification" placeholder="Token" value={values.token}/>
          <Button title="Se connecter" onPress={handleSubmit}/>
        </View>
      </ScrollView>
    )}
    </Formik>
  )
};

const styles = StyleSheet.create({

});
