import axios from 'axios';

const id = 'cf3bc826a5e853eb88eb';
const sec = '6fd84f1836638568202eac76e8ac96eb82c7f3d4';
const params = `?client_id=${id}&client_secret=${sec}`;

export const FETCH_BATTLE = 'fetch_battle';

export function emptyBattle() {
  return {
    type: FETCH_BATTLE,
    payload: [],
  };
}

export function fetchBattle(players) {
  const request = axios.all(players.map(player => getUserData(player)))
    .then(playersWithData => sortPlayers(playersWithData))
    .catch(error => {
      return null
    });

  return {
    type: FETCH_BATTLE,
    payload: request,
  };
}

function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then(user => user.data);
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}
