import Store from '../store/posts';

export const initialState = Store;

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'POSTS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'POSTS_REPLACE': {
      let posts = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {

        posts = action.data.map(item => ({
          id: item.objectId,
          title: item.title,
          description: item.description,
          category: item.category,
          image: item.file.url,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        posts,
      };
    }
    case 'POSTS_REPLACE_ALL': {
      let postsAll = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {

        postsAll = action.data.map(item => ({
          id: item.objectId,
          title: item.title,
          description: item.description,
          category: item.category,
          image: item.file.url,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        postsAll,
      };
    }
    default:
      return state;
  }
}
