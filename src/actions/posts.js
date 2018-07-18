import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';

const { Parse } = require('../constants/parse');

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
  * Get Meals // TODO
  */
export function getMeals() {
  return dispatch => new Promise(async (resolve, reject) => {
    // do stuff with your user
    const Posts = Parse.Object.extend('Posts');
    const query = new Parse.Query(Posts);
    query.find({
      success: async (data) => {
        // Do something with the returned Parse.Object values
        const results = JSON.parse(JSON.stringify(data));
        await dispatch({
          type: 'POSTS_REPLACE_ALL',
          data: results,
        });
        console.log('Fetched All!');
        return resolve();
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
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
  * Get personal posts
  */
export function getPosts() {
  return dispatch => new Promise(async (resolve, reject) => {
    Parse.User.currentAsync().then(((user) => {
      // do stuff with your user
      const author = user.toJSON().objectId;

      const Posts = Parse.Object.extend('Posts');
      const query = new Parse.Query(Posts);
      query.equalTo('author', author);
      query.find({
        success: async (data) => {
          // Do something with the returned Parse.Object values
          const results = JSON.parse(JSON.stringify(data));
          await dispatch({
            type: 'POSTS_REPLACE',
            data: results,
          });
          console.log('Fetched Personal!');
          return resolve();
        },
        error: (error) => {
          console.log(error.message);
        },
      });
    })).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Get ALL posts
  */
export function getAllPosts() {
  return dispatch => new Promise(async (resolve, reject) => {
  // do stuff with your user
    const Posts = Parse.Object.extend('Posts');
    const query = new Parse.Query(Posts);
    query.find({
      success: async (data) => {
        // Do something with the returned Parse.Object values
        const results = JSON.parse(JSON.stringify(data));
        await dispatch({
          type: 'POSTS_REPLACE_ALL',
          data: results,
        });
        console.log(results);
        return resolve();
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Add post
  */
export function addPost(formData) {
  const {
    title,
    description,
    category,
    image,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validations
    if (!title) return reject({ message: ErrorMessages.missingTitle });
    if (!image.base64) return reject({ message: ErrorMessages.missingImage });

    await statusMessage(dispatch, 'loading', true);

    // File uploading
    const parseFile = new Parse.File('gift.jpg', { base64: image.base64 });

    await parseFile.save().then(() => {
      // The file has been saved to Parse.
      console.log('File uploaded');
    }, (error) => {
      // The file either could not be read, or could not be saved to Parse.
      console.log(error.message);
    });
    // Validation checks
    const Post = Parse.Object.extend('Posts');
    const post = new Post();

    Parse.User.currentAsync().then((user) => {
      // do stuff with your user
      const author = user.toJSON().objectId;
      // Add post
      post.set('title', title);
      post.set('description', description);
      post.set('author', author);
      post.set('file', parseFile);

      post.save(null, {
        success: async (response) => {
          console.log('Post added');
          console.log(response);
          await statusMessage(dispatch, 'loading', false);
          return resolve();
        },
        error: (error) => {
          // Show the error message somewhere and let the user try again.
          console.log(error.message);
        },
      }).catch(reject);
    });
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
