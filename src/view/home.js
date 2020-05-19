import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    Text,
    Button
  } from 'react-native';

export const HomeView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home View</Text>
      <Button title="Help" onPress={() => navigation.navigate('Help')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  
});