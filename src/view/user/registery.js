import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { Formik } from 'formik';

export const RegisteryView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  
  async function registery(values) {
    formData = new FormData()
    formData.append('lastname', values.lastname);
    formData.append('firstname', values.firstname);
    formData.append('phonenumber', values.phonenumber);
    const res = await axios.get(`${global.dbUrl}/api/user/apply`, {  
      method: 'POST',
      body: formData
    });
    if(res.status == 200){
      Alert.alert("Inscription acceptée");
      navigation.navigate('Login');
    }
    else {
      Alert.alert("Une erreur est survenue");
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{ 
        firstname: 'Joe',
        lastname: 'Dalton',
        phonenumber: '0799666666'
      }}
      onSubmit={values => {
        setLoading(true)
        registery(values);
      }}
    >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
        <Input label="Prénom" placeholder="Prénom" onChangeText={handleChange('firstname')} value={values.firstname}/>
        <Input label="Nom" placeholder="Nom" onChangeText={handleChange('lastname')} value={values.lastname}/>
        <Input label="Numéro de téléphone" placeholder="Téléphone" onChangeText={handleChange('phonenumber')} value={values.phonenumber}/>
        {isLoading ? <ActivityIndicator/> :
          <Button title="Créer" onPress={handleSubmit}/>
        }
        </View>
      </ScrollView>
    )}
    </Formik> 
  );
};

const styles = StyleSheet.create({
  
});