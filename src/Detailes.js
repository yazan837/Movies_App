import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Detailes({route}) {
  const {item} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item.Poster}}
          style={{width: 500, height: 500}}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.title}>{item.Year}</Text>
        <Text style={styles.title}>{item.Type}</Text>
        <Text style={styles.title}>{item.imdbID}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },

  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
  },
});
