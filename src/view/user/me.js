import React, { useEffect, useState }  from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View, Text} from 'react-native';

export const MeView = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  console.info('me line:5');
  token = '3QAqRIjWNX8XJa9Ra6wJAzEkN90I5NkmRVNUMyHbZ98fjUT07d2sxDRrg3bv';
  useEffect(() => {
    fetch('http://192.168.25.1:8000/api/me', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((json) => {setData(json.data); console.log(json)})
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