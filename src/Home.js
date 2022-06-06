import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import actions from '../redux/actions/index';
import AsyncStorage from '@react-native-community/async-storage';

import reactotron from 'reactotron-react-native';

const {fetchFilms} = actions;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('Search');

  const navigation = useNavigation();

  const isFethingFilms = useSelector(state => state.home.isFethingFilms);

  const dispatch = useDispatch();

  const getMovieRequest = async searchValue => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=5a870659`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  useEffect(() => {
    const movieFavourites = AsyncStorage.getItem(
      'react-movie-app-favourites',
    ).then(res => {
      setFavourites(JSON.parse(res));
    });

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);
  useEffect(() => {
    dispatch(fetchFilms());
  }, []);
  const saveToLocalStorage = items => {
    AsyncStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };
  const addFavouriteMovie = movie => {
    console.log('favourite', favourites);
    const newFavouriteList =
      favourites !== null ? [...favourites, movie] : [movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = movie => {
    const newFavouriteList = favourites.filter(
      favourite => favourite.imdbID !== movie.imdbID,
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  if (isFethingFilms) {
    return (
      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <ScrollView>
      <TouchableOpacity style={styles.search} onPress={() => null}>
        <TextInput
          style={styles.title}
          placeholder={'Search'}
          value={searchValue}
          onChangeText={text => setSearchValue(text)}
        />
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        <View>
          <Text style={styles.seeMore}>Movies</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {movies.map((item, id) => {
            return (
              <View style={{alignItems: 'center'}} key={id}>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => navigation.navigate('Detailes', {item})}>
                  <Image
                    source={{uri: item.Poster}}
                    style={{width: 300, height: 200}}
                    resizeMode="contain"
                  />
                  <Text style={styles.title}>{item.Title}</Text>
                  <Text style={styles.title}>{item.Year}</Text>
                  <Text style={styles.title}>{item.Type}</Text>
                </TouchableOpacity>
                <Text
                  style={styles.title}
                  onPress={() => addFavouriteMovie(item)}>
                  add to favorites
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View>
          <Text style={styles.seeMore}>favorites </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {favourites?.map((item, i) => {
            return (
              <View style={{alignItems: 'center'}} key={i}>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => navigation.navigate('Detailes', {item})}>
                  <Image
                    source={{uri: item.Poster}}
                    style={{width: 300, height: 200}}
                    resizeMode="contain"
                  />
                  <Text style={styles.title}>{item.Title}</Text>
                  <Text style={styles.title}>{item.Year}</Text>
                  <Text style={styles.title}>{item.Type}</Text>
                </TouchableOpacity>
                <Text
                  style={styles.title}
                  onPress={() => removeFavouriteMovie(item)}>
                  remove from favorites
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
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
  title: {color: 'black', fontSize: 14, fontWeight: 'bold', margin: 5},
  seeMore: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-start',
    margin: 15,
  },
  search: {
    borderWidth: 1,
    alignItems: 'center',
    width: '70%',
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
  },
});
