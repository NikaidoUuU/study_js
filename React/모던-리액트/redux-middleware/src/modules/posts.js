import * as postsAPI from '../api/posts';
import { createPromiseThunk, createPromiseThunkById } from '../lib/asyncUtils';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST, meta: id });

  try {
    const post = await postsAPI.getPostById(id);
    dispatch({ type: GET_POST_SUCCESS, post, meta: id });
  } catch (e) {
    dispatch({ type: GET_POST_FAILURE, error: true, payload: e, meta: id });
  }
};

export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS });

  try {
    const posts = await postsAPI.getPosts();
    dispatch({ type: GET_POSTS_SUCCESS, posts });
  } catch (e) {
    dispatch({ type: GET_POSTS_FAILURE, error: e });
  }
}

export const goToHome = () => (dispatch, getState, { history }) => {
  history.push("/");
};

// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

const initialState = {
  post: {},
  posts: {
    loading: false,
    data: null,
    error: null
  }
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          [ action.meta ]: {
            loading: true,
            data: null,
            error: null
          } 
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          [ action.meta ]: {
            loading: false,
            data: action.post,
            error: null
          }
        }
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          [ action.meta ]: {
            loading: false,
            data: null,
            error: action.error
          }
        }
      };
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null
        }
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: action.posts,
          error: null
        }
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    default:
      return state;
  }
}