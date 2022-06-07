import actions from '../../actions/index';
import {combineReducers} from 'redux';
import reactotron from 'reactotron-react-native';

const {FETCH_FILMS, COMPLETE_FETCH_FILMS} = actions;

const initState = false;

//for films
const isFethingFilms = (state = initState, action) => {
  switch (action.type) {
    case FETCH_FILMS: {
      return true;
    }
    case COMPLETE_FETCH_FILMS: {
      return false;
    }
    default: {
      return state;
    }
  }
};
const isFethingFilmsError = (state = initState, action) => {
  switch (action.type) {
    case COMPLETE_FETCH_FILMS: {
      return !action.data.Response;
    }
    default: {
      return state;
    }
  }
};

const movies = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_FILMS:
      return action.data;

    default:
      return state;
  }
};

export default combineReducers({
  isFethingFilms,
  isFethingFilmsError,
  movies,
});
