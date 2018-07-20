import { combineReducers } from 'redux';
import ReducerRepos from './reducer_repos';
import ReducerBattle from './reducer_battle';

const rootReducer = combineReducers({
  repos: ReducerRepos,
  battleResult: ReducerBattle,
});

export default rootReducer;
