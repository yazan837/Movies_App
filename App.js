import React from 'react';
import store from './redux/store';
import {Provider} from 'react-redux';
import MyStack from './navigation/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

export default App;
