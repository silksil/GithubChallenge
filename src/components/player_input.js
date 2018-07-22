import React from 'react';
import PropTypes from 'prop-types';

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState({ username: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit( // calling the function onSubmit in the battle component
      this.props.id,
      this.state.username
    );
  }

  render() {
    return (
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username'>
          {this.props.label}
				</label>
				<input
					id='username'
					placeholder='github username'
					type='text'
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<button
					className='button'
					type='submit'
					disabled={!this.state.username}
				> { /* if they have not typed in anything, it is disabled  */}
						Submit
				</button>
			</form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PlayerInput;
