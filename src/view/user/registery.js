import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, Form } from 'react-native-elements'
import { Formik } from 'formik';

export const RegisteryView = ({ navigation }) => {
  
  const registery = (values) => {
    formData = new FormData()
    formData.append('lastname', values.lastname);
    formData.append('firstname', values.firstname);
    formData.append('phonenumber', values.phonenumber);
    fetch('http://192.168.25.1:80/api/user/apply', {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if(response.status == 200){
        navigation.navigate('Login');
      }
    })
    .catch((error) => console.error(error))
  };

  return (
    <Formik
      initialValues={{ 
        firstname: 'Joe',
        lastname: 'Dalton',
        phonenumber: '0799666666'
      }}
      onSubmit={values => {
        registery(values);
      }}
    >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
        <Input label="Prénom" placeholder="Prénom" onChangeText={handleChange('firstname')} value={values.firstname}/>
        <Input label="Nom" placeholder="Nom" onChangeText={handleChange('lastname')} value={values.lastname}/>
        <Input label="Numéro de téléphone" placeholder="Téléphone" onChangeText={handleChange('phonenumber')} value={values.phonenumber}/>
        <Button title="Créer" onPress={handleSubmit}/>
        </View>
      </ScrollView>
    )}
    </Formik> 
  );
};

const styles = StyleSheet.create({
  
});