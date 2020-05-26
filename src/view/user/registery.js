import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, Form } from 'react-native-elements'
import { AsyncStorage } from 'react-native';
import { Formik } from 'formik';

export const RegisteryView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const login = (token) => {
    fetch('http://192.168.25.1:8000/api/me', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => {
      console.log(response);
      if(response.status == 200){
        AsyncStorage.setItem('@localmarket:token', token);
        navigation.navigate('Me')
      }
    })
    .catch((error) => console.error(error))
  };
  
  return (
    <Formik
    initialValues={{ token: '3QAqRIjWNX8XJa9Ra6wJAzEkN90I5NkmRVNUMyHbZ98fjUT07d2sxDRrg3bv' }}
    onSubmit={values => {
      console.log(values.token);
      login(values.token);
    }}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
        <Input label="Nom" placeholder="Nom"/>
        <Input label="Prénom" placeholder="Prénom"/>
        <Input label="Numéro de téléphone" placeholder="Téléphone"/>
        <Button title="Créer"/>
        
        <Input label="Token d'authentification" placeholder="Token" value={values.token}/>
        <Button title="Se connecter" onPress={handleSubmit}/>
        </View>
      </ScrollView>
    )}
    </Formik> 
  );
};

const styles = StyleSheet.create({
  
});