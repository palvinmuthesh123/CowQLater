import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './src/redux/reducer/index';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox, StatusBar} from 'react-native';
import Navigation from './src/navigation';

const middleware = [thunkMiddleware];
const store = compose(applyMiddleware(...middleware))(createStore)(reducers);

let persistor = persistStore(store);

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Navigation />
            </PersistGate>
          </Provider>
      </SafeAreaProvider>
    );
  }
}
