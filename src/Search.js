import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import SearchInput, {createFilter} from 'react-native-search-filter';

export default function Search() {
  const KEYS_TO_FILTERS = ['TotalDeaths', 'TotalConfirmed', 'Country', 'Slug'];
  const contries = useSelector(state => state.home.Countries);

  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const searchUpdated = term => {
    setSearchTerm(term);
  };

  const filteredResult = contries.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );

  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={term => {
          searchUpdated(term);
        }}
        caseSensitive={false}
        style={[styles.searchInput]}
        placeholder={'Search '}
      />
      <View
        style={{
          height: 'auto',
          flex: 1,
        }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: 'auto',
          }}
          showsVerticalScrollIndicator={false}>
          {filteredResult.map(item => {
            return (
              <TouchableOpacity
                key={item.ID}
                style={styles.content}
                onPress={() =>
                  navigation.navigate('CountriesDetaiels', {item})
                }>
                <Text style={styles.title}>{item.Country}</Text>
                <Text style={styles.title}>
                  Total Confirmed :{item.TotalConfirmed}
                </Text>
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
    flex: 1,
    height: 'auto',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  emailItem: {
    width: 350,
    alignSelf: 'center',
    backgroundColor: '#fff',
    fontSize: 12,

    borderBottomWidth: 0.5,
    marginTop: 20,
  },

  searchInput: {
    borderWidth: 0.5,
    width: 250,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    marginTop: 30,
    textAlignVertical: 'bottom',
    fontSize: 14,
    paddingStart: 40,
    textAlign: 'left',
    paddingTop: 10,
  },
  searchInputScroll: {
    position: 'absolute',
  },

  containerList: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    margin: 20,
  },
  title: {color: 'black', fontSize: 14, fontWeight: 'bold'},
  content: {
    borderWidth: 1,
    flex: 1,
    width: 300,
    alignItems: 'center',
    height: 75,
    justifyContent: 'center',
    borderRadius: 25,
    margin: 10,
  },
});
