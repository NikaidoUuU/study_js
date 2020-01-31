import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'cab1764c1acbb63c0af236c64018ca1b',
    language: 'ko-KR'
  }
});

export const moviesApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos'
      }
    }),
  search: term =>
    api.get('search/movie', {
      params: {
        query: term
      }
    }),
  videos: id => api.get(`movie/${id}/videos`)
};

export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  airingToday: () => api.get('tv/airing_today'),
  popular: () => api.get('tv/popular'),
  tvDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos'
      }
    }),
  search: term =>
    api.get('search/tv', {
      params: {
        query: term
      }
    }),
  videos: id => api.get(`tv/${id}/videos`)
};
