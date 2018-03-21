import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';

import { AsyncStorage } from 'react-native';
var Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("myAppId", "QWERTY!@#$%^");
Parse.serverURL = "http://rudiko.com:1337/parse";

/**
  * Get this User's Favourite posts
  */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite posts in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites posts
  */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Get Meals
  */
export function getMeals() {

  return function action(dispatch) {
    dispatch({ type: 'MEALS_REPLACE' })

    const request = fetch('http://rudiko.com:1337/parse/classes/Posts', {
          method: "GET",
          headers: {
                        'Content-Type': ' application/json',
                        'X-Parse-Application-Id': 'myAppId',
                        'X-Parse-REST-API-Key': 'QWERTY!@#$%^'
                    },
        })
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson = responseJson.results.reverse();
      return responseJson;
    });
    
    return request.then(
      response => dispatch({
        type: 'MEALS_REPLACE',
        data: response,
      }),
      err => dispatch(fetchOffersError(err))
    );
  }
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'POSTS_ERROR',
    data: message,
  })));
}

/**
  * Get posts
  */
export function getPosts() {
  return function action(dispatch) {
    const request = fetch('http://rudiko.com:1337/parse/classes/Posts', {
          method: "GET",
          headers: {
                    'Content-Type': ' application/json',
                    'X-Parse-Application-Id': 'myAppId',
                    'X-Parse-REST-API-Key': 'QWERTY!@#$%^'
                    },
        })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
    
    return request.then(
      response => dispatch({
        type: 'POSTS_REPLACE',
        data: response.results,
      }),
      err => dispatch(fetchOffersError(err))
    );
  }
}

/**
  * Add post
  */
export function addPost(formData) {
  const {
    title,
    description,
    author,
    image,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    //Validations
    if (!title) return reject({ message: ErrorMessages.missingTitle });
    if (!image.base64) return reject({ message: ErrorMessages.missingImage });

    await statusMessage(dispatch, 'loading', true);

    //File uploading
    let parseFile = new Parse.File("gift.jpg", { base64: image.base64 });

    await parseFile.save().then(function() {
      // The file has been saved to Parse.
      console.log('File uploaded');
    }, function(error) {
      // The file either could not be read, or could not be saved to Parse.
      console.log(error.message);
    });
    // Validation checks
    var Post = Parse.Object.extend("Posts");
    var post = new Post();
    //Add post
    post.set("title", title);
    post.set("description", description);
    post.set("author", author);
    post.set("file", parseFile);

    post.save(null, {
      success: async (response) => {
        console.log("Post added");
        await statusMessage(dispatch, 'loading', false);
        return resolve();
      },
      error: (user, error) => {
        // Show the error message somewhere and let the user try again.
        console.log("Error: " + error.code + " " + error.message);
      }
    }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}