import React, { useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, ScrollView, View, AsyncStorage, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { Formik } from 'formik';

export const LoginView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  
  async function login(token) {
    const res = await axios.get(`${global.dbUrl}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
    if(res.status == 200){
      AsyncStorage.setItem('@localmarket:token', token);
      navigation.navigate('Me');
    }else {
      Alert.alert("Token invalide");
    }
    setLoading(false)
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
            <Button title="Se connecter" onPress={handleSubmit}/>
            <Button title="S'enregistrer" onPress={() => navigation.navigate('Registery')}/>
          </View>
        }
      </ScrollView>
    )}
    </Formik>
  )
};

const styles = StyleSheet.create({

});
