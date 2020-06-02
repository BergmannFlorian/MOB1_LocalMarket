import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, Form } from 'react-native-elements'
import { Formik } from 'formik';

export const RegisteryView = ({ navigation }) => {
  return (
    <Formik>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
        <Input label="Nom" placeholder="Nom"/>
        <Input label="Prénom" placeholder="Prénom"/>
        <Input label="Numéro de téléphone" placeholder="Téléphone"/>
        <Button title="Créer"/>
        </View>
      </ScrollView>
    )}
    </Formik> 
  );
};

const styles = StyleSheet.create({
  
});