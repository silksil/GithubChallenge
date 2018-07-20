import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepos } from '../actions/action_repos';

import SelectLanguage from '../components/select_language';
import RepoGrid from '../components/repo_grid';

class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      loading: true,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.fetchRepos(this.state.selectedLanguage, () => {
      this.setState({ loading: false })
    });
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      loading: true,
    });
    this.props.fetchRepos(lang, () => {
      this.setState({ loading: false })
    });
  }

  render() {
    if (this.state.loading === true) {
      return <div className="loader" />
    }
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        <RepoGrid repos={this.props.repos} />
      </div>
    );
  }
}

function mapStateToProps({ repos }) {
  return { repos };
}

export default connect(mapStateToProps, { fetchRepos })(Popular);
