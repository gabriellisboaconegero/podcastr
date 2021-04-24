// serve para deixar o framework do axios avisado que a baseUrl vai ser essa

import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3333/"
});