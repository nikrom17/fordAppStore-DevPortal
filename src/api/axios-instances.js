import axios from 'axios';

export const instanceData = axios.create({
  baseURL: 'https://appstore-nroman.firebaseio.com/',
});

export const instanceFiles = axios.create({
  baseURL: 'gs://appstore-nroman.appspot.com',
});
