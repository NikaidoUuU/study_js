import React, { Component } from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from 'api';

class TVContainer extends Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    isLoading: true
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated }
      } = await tvApi.topRated();
      const {
        data: { results: popular }
      } = await tvApi.popular();
      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();

      this.setState({
        topRated,
        popular,
        airingToday
      });
    } catch {
      this.setState({
        error: "Can't find TV information."
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return <TVPresenter {...this.state} />;
  }
}

export default TVContainer;
