/**
 * @format
 */
import 'react-native-gesture-handler';

import React from 'react'
import {combineReducers,createStore} from 'redux'
import {Provider} from 'react-redux'

import placeReducer from './src/redux/config/reducers/place'
import authReducer from './src/redux/config/reducers/auth';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const NewApp = () =>{
    const rootReducer = combineReducers({place : placeReducer, auth : authReducer});
    const store = createStore(rootReducer)
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => NewApp);
