import {fork} from 'redux-saga/effects';

import * as home from './groups/home';
const sagas = Object.values({
  ...home,
});

export default function* root() {
  for (let index = 0; index < sagas.length; index++) {
    yield fork(sagas[index]);
  }
}
