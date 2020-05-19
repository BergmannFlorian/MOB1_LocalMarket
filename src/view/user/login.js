import React from 'react';
import { StyleSheet, Button, TextInput, View } from 'react-native';
import { Formik } from 'formik';

export const LoginView = ({ navigation }) => {
  return (
    <Formik
    initialValues={{ email: '' }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder={'email'}
        />
        <Button title="Login" onPress={() => navigation.navigate('Me')}/>
        <Button title="Help" onPress={() => navigation.navigate('Help')}/>
      </View>
    )}
  </Formik>
  )
};

const styles = StyleSheet.create({

});
