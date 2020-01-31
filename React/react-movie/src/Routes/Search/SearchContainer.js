import React, { Component } from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from '../../api';

export default class extends Component {
  state = {
    movieResults: null,
    tvResults: null,
    error: null,
    searchTerm: '',
    isLoading: false
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchTerm !== '') {
      this.searchByTerm();
    }
  };

  updateTerm = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ isLoading: true });

    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults
      });
    } catch {
      this.setState({ error: "Can't find results" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <SearchPresenter
        {...this.state}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
