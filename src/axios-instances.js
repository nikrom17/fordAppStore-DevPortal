import axios from 'axios';

export const instanceData = axios.create({
  baseURL: 'https://appstore-nroman.firebaseio.com/',
});

export const instanceFiles = axios.create({
  baseURL: 'gs://appstore-nroman.appspot.com',
  // baseURL: 'https://www.googleapis.com/upload/storage/v1/b/appstore-nroman/'
});
