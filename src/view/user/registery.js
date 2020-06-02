import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, Form } from 'react-native-elements'
import { Formik } from 'formik';

export const RegisteryView = ({ navigation }) => {
  
  const registery = () => {
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

  return (
    <Formik
      initialValues={{ 
        firstname: '',
        lastname: '',
        phonenumber: ''
      }}
      onSubmit={values => {
        console.log(values);
      }}
    >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
        <Input label="Prénom" placeholder="Prénom" onChangeText={handleChange('firstname')}/>
        <Input label="Nom" placeholder="Nom" onChangeText={handleChange('lastname')}/>
        <Input label="Numéro de téléphone" placeholder="Téléphone" onChangeText={handleChange('phonenumber')}/>
        <Button title="Créer" onPress={handleSubmit}/>
        </View>
      </ScrollView>
    )}
    </Formik> 
  );
};

const styles = StyleSheet.create({
  
});