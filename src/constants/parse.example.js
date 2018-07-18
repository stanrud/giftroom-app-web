import { AsyncStorage } from 'react-native';

const Parse = require('parse/react-native');

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('API_ID', 'API_KEY');
Parse.serverURL = 'API_URL';

module.exports = {
  Parse,
};

