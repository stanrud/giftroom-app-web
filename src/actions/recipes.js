import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get this User's Favourite Recipes
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
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
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
      return responseJson;
    });
    
    return request.then(
      response => dispatch({
        type: 'MEALS_REPLACE',
        data: response.results,
      }),
      err => dispatch(fetchOffersError(err))
    );
  }


  /*
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('meals').once('value')
    .then((snapshot) => {
      const meals = snapshot.val() || {};

      return resolve(dispatch({
        type: 'MEALS_REPLACE',
        data: meals,
      }));
    }).catch(reject)).catch(e => console.log(e));
  */
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}

/**
  * Get Recipes
  */
export function getRecipes() {
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
        type: 'RECIPES_REPLACE',
        data: response.results,
      }),
      err => dispatch(fetchOffersError(err))
    );
  }
}
