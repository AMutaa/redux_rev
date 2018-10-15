import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const initialState = {
  fetching: false,
  fetched: false,
  movies: [],
  error: null,
}


const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_MOVIES_START": {
      return {
        ...state,
        fetching: true
      }
      break;
    }
    case "RECEIVE_MOVIES": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      break;
    }
    case "RECEIVE_MOVIES": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: action.payload
      }
      break;
    }
  }
  return state
}

const middleware = applyMiddleware(thunk, logger())
const store = createStore(reducer, middleware)

store.subscribe(() => {
  console.log("store changed", store.getState())
})

store.dispatch((dispatch) => {
  dispatch({ type: "FETCH_USERS_START" })
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=131c87cb54773ae0f6c9b813ce9041b2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
    .then((response) => {
      dispatch({ type: "RECEIVE_MOVIES", payload: response.data })
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_MOVIES_ERROR', payload: err })
    })
})