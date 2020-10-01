/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName, dbUrl} from './app.json';
global.dbUrl = dbUrl;

AppRegistry.registerComponent(appName, () => App);
