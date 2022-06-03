import React, {useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import actions from '../redux/actions/index';
import reactotron from 'reactotron-react-native';

const {fetchFilms} = actions;

export default function Home() {
  const navigation = useNavigation();
  const Films = useSelector(state => state.home.movies);
  reactotron.log('Home', Films);
  const isFethingFilms = useSelector(state => state.home.isFethingFilms);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilms());
  }, []);
  if (isFethingFilms) {
    return (
      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity style={styles.search} onPress={() => null}>
        <Text style={styles.title}>Search</Text>
      </TouchableOpacity>
      <View style={{flex: 1, marginTop: 25}}>
        <View>
          <Text style={styles.seeMore}>Movies</Text>
        </View>
        <ScrollView>
          {Films?.Search?.map(item => {
            return (
              <TouchableOpacity
                key={item.imdbID}
                style={styles.container}
                onPress={() => null}>
                <Image
                  source={{uri: item.Poster}}
                  style={{width: 300, height: 200}}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.title}>{item.Year}</Text>
                <Text style={styles.title}>{item.Type}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
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
  containerList: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    margin: 20,
  },
  title: {color: 'black', fontSize: 14, fontWeight: 'bold'},
  seeMore: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  search: {
    borderWidth: 1,
    alignItems: 'center',
    height: 40,
    width: '70%',
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
  },
});
