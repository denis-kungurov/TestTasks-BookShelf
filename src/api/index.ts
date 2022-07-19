import axios, { AxiosInstance } from 'axios';

import { API_BASE_URL } from 'constants/api';

export let API: AxiosInstance;

export function initApi() {
	API = axios.create({
		baseURL: API_BASE_URL,
		timeout: 40000,
		headers: {},
	});
}
