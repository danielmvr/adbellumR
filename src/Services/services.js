import axios from 'axios';

const url = axios.create({
  baseURL: 'https://api.open5e.com/'
})

export default url;
