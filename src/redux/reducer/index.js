import { combineReducers } from 'redux';
import reducer from './reducer';
import elementReducer from './elementReducer'

const reducers = combineReducers({
    pokemonList: reducer,
    elementTypesList: elementReducer
});

export default reducers;