import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchBattle } from '../actions/action_battle';

import Player from '../components/player';

class Results extends Component {
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);

    this.props.fetchBattle([
      players.playerOneName,
      players.playerTwoName
    ]);
  }
  ;
  render() {
    const result = this.props.battleResult;

    if (result === null) {
      return (
        <div>
          <p> Looks like there was an error. Check whether both users exist on Github. </p>
          <Link className='button' to='/battle'>Reset</Link>
        </div>
      );
    }

    if (result.length < 1) {
      return <div className="loader" />
    }

    const winner = this.props.battleResult[0]
    const loser = this.props.battleResult[1]

    return (
      <div>
        <div className="row">
          <Player
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
          <Player
            label="Loser"
            score={loser.score}
            profile={loser.profile}
          />
        </div>
        <Link className="button" to="/battle">
          Reset
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ battleResult }) {
  return { battleResult };
}

export default connect(mapStateToProps, { fetchBattle })(Results);
