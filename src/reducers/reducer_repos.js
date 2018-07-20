import { FETCH_REPOS } from '../actions/action_repos';

export default function (state = [], action) {
  switch(action.type) {
    case FETCH_REPOS:
      return action.payload.data.items;
  default:
    return state;
  }
}
