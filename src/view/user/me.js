import React, { useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

export const MeView = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {token} = route.params;

  useEffect(() => {
    fetch('http://192.168.25.1:80/api/me', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((json) => setData(json.data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);
  
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : <Text>{data.firstname} {data.lastname}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  
});