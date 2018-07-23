import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { emptyBattle } from '../actions/action_battle';

import PlayerPreview from '../components/player_preview';
import PlayerInput from '../components/player_input';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    this.props.emptyBattle()
  }

  handleSubmit(id, username) {
    this.setState( () =>  {
      const newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState( () => {
      const newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }

  render() {
    const match = this.props.match;
    const playerOneName = this.state.playerOneName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoName = this.state.playerTwoName;
    const playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className='row'>
          {!this.state.playerOneName &&  // if playerOneName is empty ( === false), then do this
            <PlayerInput
            	id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}
          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
           <button
              className='reset'
              onClick={this.handleReset.bind(this, 'playerOne')}>
              Reset
            </button>
            </PlayerPreview>}
          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}
          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
              <button
                className='reset'
                onClick={this.handleReset.bind(this, 'playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}
          {playerOneImage && playerTwoImage &&
            <Link
              className='button'
              to={{
                pathname: match.url + '/results',
                search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
              }}>
              Battle
            </Link>}
        </div>
      </div>
    );
  }
}

export default connect(null, { emptyBattle })(Battle);
