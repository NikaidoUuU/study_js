import React, { Component } from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from 'api';

class DetailContainer extends Component {
  constructor(props) {
    super(props);
    const pathname = props.location.pathname;
    this.state = {
      result: null,
      error: null,
      isLoading: true,
      isMovie: pathname.includes('/movie/')
    };
  }

  async componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const push = this.props.history.push;
    const { isMovie } = this.state;
    let result = null;

    if (isNaN(id)) {
      return push('/');
    }

    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(id));
      } else {
        ({ data: result } = await tvApi.tvDetail(id));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ isLoading: false, result });
    }
  }

  render() {
    return <DetailPresenter {...this.state} />;
  }
}

export default DetailContainer;
