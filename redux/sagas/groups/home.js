import {put, takeLatest, call} from 'redux-saga/effects';
import {getFilms} from '../../network/General';
import actions from '../../actions';
import reactotron from 'reactotron-react-native';

const {completeFetchFilms, FETCH_FILMS, FETCH_ALL, completeFetchAll} = actions;

function* performFetchFilms() {
  try {
    const result = yield call(getFilms);

    if (result.networkSuccess) {
      yield put(completeFetchFilms({data: result.data}));
    } else yield put(completeFetchFilms({data: []}));
  } catch {
    yield put(completeFetchFilms({data: []}));
    return;
  }
}

export function* watchFetchFilms() {
  yield takeLatest(FETCH_FILMS, performFetchFilms);
}
