import {createAction} from '../creators';

export default {
  ...createAction('FETCH_FILMS'),
  ...createAction('COMPLETE_FETCH_FILMS', 'data'),
};
